import { sql } from "../../neon/connection.js";

// Fetch similar players based on overall and position
export const fetchSimilarPlayersFromDB = async (overall, position) => {
    try {
        const overallValue = parseInt(overall);

        let querySimilar = `
            SELECT 
                p.player_id,
                p.short_name,
                p.long_name,
                p.club_name,
                p.overall,
                p.club_position,
                p.nationality_name,
                p.player_face_url,
                ps.skill_moves,
                ps.pace,
                ps.shooting,
                ps.passing,
                ps.dribbling,
                ps.defending,
                ps.physic
            FROM 
                players p
            LEFT JOIN 
                player_skills ps ON p.player_id = ps.player_id
            WHERE 
                p.overall BETWEEN $1 AND $2
        `;

        let queryParams = [overallValue - 1, overallValue + 1]; // Adjusted to include players within ±1 overall

        if (position) {
            querySimilar += ` AND p.club_position = $3`;
            queryParams.push(position);
        }

        querySimilar += ` ORDER BY p.overall ASC LIMIT 10`; // Adjust limit if needed

        const similarPlayers = await sql(querySimilar, queryParams);
        return similarPlayers;
    } catch (error) {
        console.error("Error in Player Repository (Fetch Similar Players):", error);
        throw error;
    }
};