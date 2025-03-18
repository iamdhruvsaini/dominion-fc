import { sql } from "../../../neon/connection.js";

// forwrds[3]='LW','ST','RW'
// Midfielders[3]='CDM','CAM','CM'
// Defenders[3]='RB','CB','LB'
// goalkeeper[3]='GK'

export const getBestForwards = async (req, res) => {
    try {
        const players = await sql`
        SELECT 
            p.player_id,
            p.player_face_url, 
            p.short_name, 
            w.bought, 
            p.overall, 
            p.age, 
            p.nationality_name
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        WHERE p.club_position IN ('LW','ST','RW')
        ORDER BY p.overall DESC
        LIMIT 10;
        `;

        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch best forwards" });
    }
};

export const getBestMidfielders = async (req, res) => {
    try {
        const players = await sql`
        SELECT 
            p.player_id,
            p.player_face_url, 
            p.short_name, 
            w.bought, 
            p.overall, 
            p.age, 
            p.nationality_name
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        WHERE p.club_position IN ('CDM','CAM','CM')
        ORDER BY p.overall DESC
        LIMIT 10;
        `;

        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch best midfielders" });
    }
};

export const getBestDefenders = async (req, res) => {
    try {
        const players = await sql`
        SELECT 
            p.player_id,
            p.player_face_url, 
            p.short_name, 
            w.bought, 
            p.overall, 
            p.age, 
            p.nationality_name
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        WHERE p.club_position IN ('RB','CB','LB')
        ORDER BY p.overall DESC
        LIMIT 10;
        `;

        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch best defenders" });
    }
};

export const getBestGoalkeepers = async (req, res) => {
    try {
        const players = await sql`
        SELECT 
            p.player_id,
            p.player_face_url, 
            p.short_name, 
            w.bought, 
            p.overall, 
            p.age, 
            p.nationality_name
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        WHERE p.club_position = 'GK'
        ORDER BY p.overall DESC
        LIMIT 10;
        `;

        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch best goalkeepers" });
    }
};
