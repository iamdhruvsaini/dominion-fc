import { sql } from "../../neon/connection.js";

// Get player position count
export const getPlayerPositionCountFromDB = async () => {
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
        return response;
    } catch (error) {
        console.error("Error in getPlayerPositionCountFromDB:", error);
        throw error;
    }
};

// Get recently sold players
export const getRecentSoldPlayersFromDB = async () => {
    try {
        const response = await sql`
            SELECT 
                p.club_position AS position,
                p.nationality_name AS country,
                p.short_name AS name,
                w.wage_eur AS wage
            FROM players p
            LEFT JOIN wages w ON p.wage_id = w.wage_id
            WHERE w.bought = 1
            ORDER BY p.timestamp DESC
            LIMIT 7;
        `;
        return response;
    } catch (error) {
        console.error("Error in getRecentSoldPlayersFromDB:", error);
        throw error;
    }
};

// Get player details by ID
export const getPlayerDetailsByIDFromDB = async (playerId) => {
    try {
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
        return result;
    } catch (error) {
        console.error("Error in getPlayerDetailsByIDFromDB:", error);
        throw error;
    }
};