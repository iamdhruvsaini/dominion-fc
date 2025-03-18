import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Add this import
import { sql } from '../../neon/connection.js';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const predict_best_teams = async (req, res) => {
    try {
        const { userId } = req.body;

        let players = await sql`
        SELECT 
        p.player_face_url AS image,
        p.player_id AS id,
        p.short_name AS name,
        p.potential,
        p.age,
        w.value_eur AS price,
        CASE 
            WHEN p.club_position IN ('LW', 'ST', 'RW') THEN 'Forward'
            WHEN p.club_position IN ('CDM', 'CAM', 'CM') THEN 'Midfield'
            WHEN p.club_position IN ('RB', 'CB', 'LB') THEN 'Defence'
            WHEN p.club_position = 'GK' THEN 'Goal Keeper'
            ELSE 'Other'
        END AS position
        FROM players p
        JOIN user_selections us ON p.player_id = us.player_id
        JOIN wages w ON p.wage_id = w.wage_id
        WHERE us.user_id = ${userId}
        `;

        if (!players || players.length === 0) {
            return res.status(200).json({
                success: false,
                message: "No players selected for this user"
            });
        }

        const playerNames = players.map(player => player.name);

        function calculateAgeFactor(age) {
            if (age < 25) {
                return 1.2 - 0.02 * (age - 18);
            } else {
                return 1.0 - 0.02 * (age - 25);
            }
        }

        function calculatePlayerScore(player) {
            const ageFactor = calculateAgeFactor(player.age);
            const injuryWeight = 0.5;

            const playerScore = (player.potential * ageFactor) - (player.injury_risk * injuryWeight);
            return Math.round(playerScore * 100) / 100;
        }

        async function Injury() {
            try {
                const chatCompletion = await groq.chat.completions.create({
                    messages: [
                        {
                            role: "system",
                            content: `You are an AI sports analyst specializing in injury risk assessment.
                    Use **real-world injury data** from reputable sources like **Transfermarkt, ESPN, and WhoScored**.
                    Do **not** generate speculative injury ratings or make assumptions.

                    Assign an **injury risk rating (0-100)** based on:
                    - **Injury history** (severity, recurrence)
                    - **Age** (older players = higher risk)
                    - **Playing style** (dribblers & tacklers = higher risk)
                    - **Position** (defenders & midfielders = more physical contact)
                    - **Match load** (high workload = increased risk)
                    - **Recovery speed** (some players heal faster)
                    - **Medical history** (chronic issues increase risk)
                    - **Recent fitness reports** (fatigue raises risk)
                    - **Body type & endurance** (stronger athletes endure more impact)

                    ### **Rating Scale:**
                    - **0-20:** Very Low Risk (rare injuries, excellent fitness)
                    - **21-40:** Low Risk (some past injuries but good recovery)
                    - **41-60:** Moderate Risk (injury-prone but competitive)
                    - **61-80:** High Risk (frequent injuries, slow recovery)
                    - **81-100:** Very High Risk (severe history, declining fitness)

                    **Output Format:**  
                    Do not give any comments in JSON  
                    Return structured JSON like this:
                    [
                        { "player": "Lionel Messi", "injury_risk": 12 },
                        { "player": "Cristiano Ronaldo", "injury_risk": 8 }
                    ]`
                        },
                        {
                            role: "user",
                            content: `Provide an **injury risk rating (0-100)** for each of the following players: ${playerNames.join(", ")}.`
                        }
                    ],
                    model: "llama-3.3-70b-versatile",
                    temperature: 0.0,
                    top_p: 0.3,
                    frequency_penalty: 0.5,
                    presence_penalty: 0.0,
                    max_completion_tokens: 1500,
                    stream: false
                });

                const responseText = chatCompletion.choices[0]?.message?.content;

                const jsonStart = responseText.indexOf('[');
                const jsonEnd = responseText.lastIndexOf(']') + 1;
                const jsonArrayString = responseText.slice(jsonStart, jsonEnd);

                const injuryData = JSON.parse(jsonArrayString);

                players = players.map(player => ({
                    ...player,
                    injury_risk: injuryData.find(risk => risk.player === player.name)?.injury_risk || 100
                }));

                players.forEach(player => {
                    player.score = calculatePlayerScore(player);
                });

            } catch (error) {
                console.error("Error in Injury function:", error);
            }
        }

        await Injury();

        // ✅ Flask deployment URL only (no local development)
        const baseUrl = process.env.FLASK_URL // Replace with actual Flask URL

        try {
            const response = await fetch(`${baseUrl}/api/optimize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(players)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`API error (${response.status}): ${errorText}`);
                throw new Error(`API responded with status ${response.status}`);
            }

            const responseText = await response.text();
            console.log("Raw response:", responseText);

            let teams;
            try {
                teams = JSON.parse(responseText);
            } catch (parseError) {
                console.error("JSON parse error:", parseError);
                throw new Error("Failed to parse response as JSON");
            }

            res.status(200).json({ success: true, data: teams });
        } catch (apiError) {
            console.error("Error calling optimization API:", apiError);
            res.status(500).json({ success: false, message: "Optimization service failed." });
        }
    } catch (error) {
        console.error("Controller error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong in Prediction Controller."
        });
    }
};
