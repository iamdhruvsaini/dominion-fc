// repository/playerRepository.js

import { sql } from "../../neon/connection.js";

// Get Top-Rated Players
export const getTopRatedPlayersFromDB = async () => {
    try {
        const topRatedPlayers = await sql`
            SELECT 
                p.player_id,
                p.player_face_url, 
                p.short_name, 
                w.bought, 
                p.club_name, 
                p.league_name, 
                p.overall
            FROM players p
            JOIN wages w ON p.wage_id = w.wage_id
            ORDER BY p.overall DESC
            LIMIT 10;
        `;
        return topRatedPlayers;
    } catch (error) {
        console.log("Something went wrong in Player Repository (Top-Rated Players)");
        throw error;
    }
};

// Get High Potential Players
export const getHighPotentialPlayersFromDB = async () => {
    try {
        const highPotentialPlayers = await sql`
            SELECT 
                p.player_id,
                p.player_face_url, 
                p.short_name, 
                w.bought, 
                p.club_name, 
                p.league_name, 
                p.potential
            FROM players p
            JOIN wages w ON p.wage_id = w.wage_id
            ORDER BY p.potential DESC
            LIMIT 10;
        `;
        return highPotentialPlayers;
    } catch (error) {
        console.log("Something went wrong in Player Repository (High Potential Players)");
        throw error;
    }
};

// Get Players with Biggest Rating Differences
export const getBiggestRatingDifferencesFromDB = async () => {
    try {
        const ratingDifferences = await sql`
            SELECT 
                p.player_id,
                p.player_face_url, 
                p.short_name, 
                w.bought, 
                p.club_name, 
                p.league_name, 
                (p.potential - p.overall) AS rating_difference
            FROM players p
            JOIN wages w ON p.wage_id = w.wage_id
            ORDER BY rating_difference DESC
            LIMIT 10;
        `;
        return ratingDifferences;
    } catch (error) {
        console.log("Something went wrong in Player Repository (Rating Differences)");
        throw error;
    }
};