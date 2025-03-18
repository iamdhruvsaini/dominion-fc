import { sql } from "../../neon/connection.js";

// Fetch best forwards
export const getBestForwardsFromDB = async () => {
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
        return players;
    } catch (error) {
        console.error("Error in Player Repository (Best Forwards):", error);
        throw error;
    }
};

// Fetch best midfielders
export const getBestMidfieldersFromDB = async () => {
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
        return players;
    } catch (error) {
        console.error("Error in Player Repository (Best Midfielders):", error);
        throw error;
    }
};

// Fetch best defenders
export const getBestDefendersFromDB = async () => {
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
        return players;
    } catch (error) {
        console.error("Error in Player Repository (Best Defenders):", error);
        throw error;
    }
};

// Fetch best goalkeepers
export const getBestGoalkeepersFromDB = async () => {
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
        return players;
    } catch (error) {
        console.error("Error in Player Repository (Best Goalkeepers):", error);
        throw error;
    }
};