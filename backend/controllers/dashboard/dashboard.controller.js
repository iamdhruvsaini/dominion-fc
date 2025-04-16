import { sql } from "../../neon/connection.js"

export const getPlayerPositionCount = async (req, res) => {
    try {
        const response = await sql`
       SELECT 
       CASE 
            WHEN club_position = 'GK' THEN 'Goalkeepers'
            WHEN club_position IN ('CB','RB','LB') THEN 'Defenders'
            WHEN club_position IN ('CDM','CM', 'CAM') THEN 'Midfielders'
            WHEN club_position IN ('LW','ST','RW') THEN 'Forwards'
            ELSE 'Unknown'
            END AS position_bucket,
            COUNT(*) AS player_count
        FROM players
        GROUP BY position_bucket;
    `;
        return res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const getRecentSoldPlayer = async (req, res) => {
    try {
        const response = await sql`
        SELECT 
            p.club_position AS position,
            p.nationality_name AS country,
            p.short_name AS name,
            w.value_eur AS wage
        FROM players p
        LEFT JOIN wages w ON p.wage_id = w.wage_id
        WHERE w.bought = 1
        ORDER BY p.timestamp DESC
        LIMIT 7
        ;
    `;
        return res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const getPlayerDetailsByID = async (req, res) => {

    try {
        const { playerId } = req.params;
        

        // Fetch player details with joins to related tables
        const result = await sql`
                SELECT 
                    p.player_id,
                    p.short_name,
                    p.long_name,
                    p.league_name,
                    p.club_name,
                    p.overall,
                    p.potential,
                    p.age,
                    p.nationality_name,
                    p.player_face_url,
                    p.club_position,
                    p.club_jersey_number,
                    p.trending,
                    w.wage_eur,
                    w.value_eur,
                    ph.height_cm,
                    ph.weight_kg,
                    ph.bmi,
                    ps.skill_moves,
                    ps.pace,
                    ps.shooting,
                    ps.passing,
                    ps.dribbling,
                    ps.defending,
                    ps.physic,
                    ps.attacking_skills,
                    ps.skill_attributes,
                    ps.movement_skills,
                    ps.power_attributes,
                    ps.mental_attributes,
                    ps.defending_skills,
                    ps.goalkeeping_ability
                FROM players AS p
                LEFT JOIN wages AS w ON p.wage_id = w.wage_id
                LEFT JOIN physical AS ph ON p.player_id = ph.player_id
                LEFT JOIN player_skills AS ps ON p.player_id = ps.player_id
                WHERE p.player_id = ${playerId};
            `;

        if (result.length === 0) {
            return res.status(404).json({ error: "Player not found" });
        }

        res.status(200).json(result[0]);
    } catch (error) {
        console.error("Error fetching player details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
