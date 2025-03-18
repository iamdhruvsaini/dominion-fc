import { sql } from "../../../neon/connection.js";


export const getPlayersWithHighestSkillMoves = async (req, res) => {
    try {
        const players = await sql`
        SELECT 
            p.player_id,
            p.player_face_url, 
            p.short_name, 
            w.bought, 
            ps.skill_moves, 
            p.overall, 
            p.age
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        JOIN player_skills ps ON p.player_id = ps.player_id
        ORDER BY ps.skill_moves DESC, p.overall DESC
        LIMIT 10;
        `;

        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch players with highest skill moves" });
    }
};

export const getBestAttackingPlayers = async (req, res) => {
    try {
        const players = await sql`
        SELECT 
            p.player_id,
            p.player_face_url, 
            p.short_name, 
            w.bought, 
            ps.attacking_skills, 
            p.overall, 
            p.age
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        JOIN player_skills ps ON p.player_id = ps.player_id
        ORDER BY ps.attacking_skills DESC, p.overall DESC
        LIMIT 10;
        `;

        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch best attacking players" });
    }
};

export const getBestDefensivePlayers = async (req, res) => {
    try {
        const players = await sql`
        SELECT 
            p.player_id,
            p.player_face_url, 
            p.short_name, 
            w.bought, 
            ps.defending_skills, 
            p.overall, 
            p.age
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        JOIN player_skills ps ON p.player_id = ps.player_id
        ORDER BY ps.defending_skills DESC, p.overall DESC
        LIMIT 10;
        `;

        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch best defensive players" });
    }
};

export const getBestAllRoundPlayers = async (req, res) => {
    try {
        const players = await sql`
        SELECT 
            p.player_id,
            p.player_face_url, 
            p.short_name, 
            w.bought, 
            (ps.attacking_skills + ps.defending_skills + ps.skill_attributes + ps.movement_skills + ps.power_attributes + ps.mental_attributes) / 6 AS all_round_score,
            p.overall, 
            p.age
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        JOIN player_skills ps ON p.player_id = ps.player_id
        ORDER BY all_round_score DESC, p.overall DESC
        LIMIT 10;
        `;

        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch best all-round players" });
    }
};

export const getPlayersWithBestFitnessLevel = async (req, res) => {
    try {
        const players = await sql`
        SELECT 
            p.player_id,
            p.player_face_url, 
            p.short_name, 
            w.bought, 
            ph.bmi, 
            ps.physic, 
            p.overall, 
            p.age
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        JOIN physical ph ON p.player_id = ph.player_id
        JOIN player_skills ps ON p.player_id = ps.player_id
        ORDER BY ps.physic DESC, ph.bmi ASC, p.overall DESC
        LIMIT 10;
        `;

        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch players with best fitness level" });
    }
};


