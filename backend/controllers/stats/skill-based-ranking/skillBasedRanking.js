import { sql } from "../../../neon/connection.js";

// Best Dribblers
export const getBestDribbersHandler = async (req, res) => {
    try {
        const limit = 10; // Limit to top 10 players
        
        const players = await sql`
            SELECT p.player_id,
                   p.player_face_url,
                   p.short_name,
                   w.bought,
                   p.club_name,
                   p.league_name,
                   p.overall,
                   ps.dribbling
            FROM players p
            JOIN player_skills ps ON p.player_id = ps.player_id
            LEFT JOIN wages w ON p.wage_id = w.wage_id
            ORDER BY ps.dribbling DESC
            LIMIT ${limit}
        `;
        
        res.status(200).json({ 
            success: true, 
            category: "Best Dribblers",
            count: players.length,
            data: players 
        });
    } catch (error) {
        console.error("Error fetching best dribblers:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch best dribblers", 
            error: error.message 
        });
    }
};

// Best Passers
export const getBestPassersHandler = async (req, res) => {
    try {
        const limit = 10; // Limit to top 10 players
        
        const players = await sql`
            SELECT p.player_id,
                   p.player_face_url,
                   p.short_name,
                   w.bought,
                   p.club_name,
                   p.league_name,
                   p.overall,
                   ps.passing
            FROM players p
            JOIN player_skills ps ON p.player_id = ps.player_id
            LEFT JOIN wages w ON p.wage_id = w.wage_id
            ORDER BY ps.passing DESC
            LIMIT ${limit}
        `;
        
        res.status(200).json({ 
            success: true, 
            category: "Best Passers",
            count: players.length,
            data: players 
        });
    } catch (error) {
        console.error("Error fetching best passers:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch best passers", 
            error: error.message 
        });
    }
};

// Fastest Players
export const getFastestPlayersHandler = async (req, res) => {
    try {
        const limit = 10; // Limit to top 10 players
        
        const players = await sql`
            SELECT p.player_id,
                   p.player_face_url,
                   p.short_name,
                   w.bought,
                   p.club_name,
                   p.league_name,
                   p.overall,
                   ps.pace
            FROM players p
            JOIN player_skills ps ON p.player_id = ps.player_id
            LEFT JOIN wages w ON p.wage_id = w.wage_id
            ORDER BY ps.pace DESC
            LIMIT ${limit}
        `;
        
        res.status(200).json({ 
            success: true, 
            category: "Fastest Players",
            count: players.length,
            data: players 
        });
    } catch (error) {
        console.error("Error fetching fastest players:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch fastest players", 
            error: error.message 
        });
    }
};

// Most Physical Players
export const getMostPhysicalPlayersHandler = async (req, res) => {
    try {
        const limit = 10; // Limit to top 10 players
        
        const players = await sql`
            SELECT p.player_id,
                   p.player_face_url,
                   p.short_name,
                   w.bought,
                   p.club_name,
                   p.league_name,
                   p.overall,
                   ps.physic
            FROM players p
            JOIN player_skills ps ON p.player_id = ps.player_id
            LEFT JOIN wages w ON p.wage_id = w.wage_id
            ORDER BY ps.physic DESC
            LIMIT ${limit}
        `;
        
        res.status(200).json({ 
            success: true, 
            category: "Most Physical Players",
            count: players.length,
            data: players 
        });
    } catch (error) {
        console.error("Error fetching most physical players:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch most physical players", 
            error: error.message 
        });
    }
};

// Additional helper function to get all skill categories at once for dashboard overview
export const getAllSkillCategoriesHandler = async (req, res) => {
    try {
        // Number of players to return per category
        const limit = 5;
        
        // Get best dribblers
        const bestDribblers = await sql`
            SELECT p.player_id,
                   p.player_face_url,
                   p.short_name,
                   w.bought,
                   p.club_name,
                   p.league_name,
                   p.overall,
                   ps.dribbling
            FROM players p
            JOIN player_skills ps ON p.player_id = ps.player_id
            LEFT JOIN wages w ON p.wage_id = w.wage_id
            ORDER BY ps.dribbling DESC
            LIMIT ${limit}
        `;
        
        // Get best passers
        const bestPassers = await sql`
            SELECT p.player_id,
                   p.player_face_url,
                   p.short_name,
                   w.bought,
                   p.club_name,
                   p.league_name,
                   p.overall,
                   ps.passing
            FROM players p
            JOIN player_skills ps ON p.player_id = ps.player_id
            LEFT JOIN wages w ON p.wage_id = w.wage_id
            ORDER BY ps.passing DESC
            LIMIT ${limit}
        `;
        
        // Get fastest players
        const fastestPlayers = await sql`
            SELECT p.player_id,
                   p.player_face_url,
                   p.short_name,
                   w.bought,
                   p.club_name,
                   p.league_name,
                   p.overall,
                   ps.pace
            FROM players p
            JOIN player_skills ps ON p.player_id = ps.player_id
            LEFT JOIN wages w ON p.wage_id = w.wage_id
            ORDER BY ps.pace DESC
            LIMIT ${limit}
        `;
        
        // Get most physical players
        const mostPhysicalPlayers = await sql`
            SELECT p.player_id,
                   p.player_face_url,
                   p.short_name,
                   w.bought,
                   p.club_name,
                   p.league_name,
                   p.overall,
                   ps.physic
            FROM players p
            JOIN player_skills ps ON p.player_id = ps.player_id
            LEFT JOIN wages w ON p.wage_id = w.wage_id
            ORDER BY ps.physic DESC
            LIMIT ${limit}
        `;
        
        res.status(200).json({
            success: true,
            data: {
                "Best Dribblers": bestDribblers,
                "Best Passers": bestPassers,
                "Fastest Players": fastestPlayers,
                "Most Physical Players": mostPhysicalPlayers
            }
        });
    } catch (error) {
        console.error("Error fetching all skill categories:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch skill categories",
            error: error.message
        });
    }
};