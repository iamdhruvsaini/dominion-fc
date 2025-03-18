import { sql } from "../../neon/connection.js";

// Fetch players with the highest skill moves
export const getPlayersWithHighestSkillMovesFromDB = async () => {
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
        return players;
    } catch (error) {
        console.error("Error in Player Repository (Highest Skill Moves):", error);
        throw error;
    }
};

// Fetch best attacking players
export const getBestAttackingPlayersFromDB = async () => {
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
        return players;
    } catch (error) {
        console.error("Error in Player Repository (Best Attacking Players):", error);
        throw error;
    }
};

// Fetch best defensive players
export const getBestDefensivePlayersFromDB = async () => {
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
        return players;
    } catch (error) {
        console.error("Error in Player Repository (Best Defensive Players):", error);
        throw error;
    }
};

// Fetch best all-round players
export const getBestAllRoundPlayersFromDB = async () => {
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
        return players;
    } catch (error) {
        console.error("Error in Player Repository (Best All-Round Players):", error);
        throw error;
    }
};

// Fetch players with the best fitness level
export const getPlayersWithBestFitnessLevelFromDB = async () => {
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
        return players;
    } catch (error) {
        console.error("Error in Player Repository (Best Fitness Level):", error);
        throw error;
    }
};