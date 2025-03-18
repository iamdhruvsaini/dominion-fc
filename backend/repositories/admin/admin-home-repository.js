import { sql } from "../../neon/connection.js";

// Fetch portal stats
export const getPortalHomeStatsFromDB = async () => {
    try {
        const response = await sql`
            SELECT 
                COUNT(p.player_id) AS total_players, 
                COUNT(CASE WHEN p.trending = 'YES' THEN 1 END) AS trending_players, 
                COUNT(DISTINCT p.nationality_name) AS total_countries,
                COUNT(DISTINCT p.club_name) AS total_clubs,
                COUNT(CASE WHEN w.bought = 1 THEN 1 END) AS total_players_sold
            FROM players p
            LEFT JOIN wages w ON p.wage_id = w.wage_id;
        `;
        return response[0];
    } catch (error) {
        console.error("Error in getPortalHomeStatsFromDB:", error);
        throw error;
    }
};

// Fetch trending players
export const getTrendingPlayersFromDB = async () => {
    try {
        const trendingPlayers = await sql`
            SELECT 
                player_id, 
                short_name, 
                nationality_name, 
                age
            FROM players
            WHERE trending = 'YES'
            ORDER BY timestamp DESC; 
        `;
        return trendingPlayers;
    } catch (error) {
        console.error("Error in getTrendingPlayersFromDB:", error);
        throw error;
    }
};

// Fetch recently sold players
export const getSoldPlayersFromDB = async () => {
    try {
        const boughtPlayers = await sql`
            SELECT 
                p.player_face_url,
                p.player_id, 
                p.short_name, 
                p.nationality_name, 
                p.age,
                w.wage_eur
            FROM players p
            JOIN wages w ON p.wage_id = w.wage_id
            WHERE w.bought = 1
            ORDER BY w.timestamp DESC; 
        `;
        return boughtPlayers;
    } catch (error) {
        console.error("Error in getSoldPlayersFromDB:", error);
        throw error;
    }
};

// Fetch all admins
export const getAllAdminsFromDB = async () => {
    try {
        const admins = await sql`
            SELECT admin_id, name, email, role, timestamp 
            FROM admin
            ORDER BY timestamp DESC; 
        `;
        return admins;
    } catch (error) {
        console.error("Error in getAllAdminsFromDB:", error);
        throw error;
    }
};

// Remove a player
export const removePlayerFromDB = async (player_id) => {
    try {
        const deletedPlayer = await sql`
            DELETE FROM players
            WHERE player_id = ${player_id}
            RETURNING *;
        `;
        return deletedPlayer;
    } catch (error) {
        console.error("Error in removePlayerFromDB:", error);
        throw error;
    }
};

// Mark player as sold
export const markPlayerAsSoldInDB = async (playerId, bought, wage) => {
    try {
        const [player] = await sql`
            SELECT wage_id FROM players WHERE player_id = ${playerId}
        `;
        if (!player) {
            throw new Error("Player not found");
        }

        const updatedWage = await sql`
            UPDATE wages
            SET bought = ${bought}, wage_eur = ${wage}, timestamp = NOW()
            WHERE wage_id = ${player.wage_id}
            RETURNING *;
        `;
        return updatedWage;
    } catch (error) {
        console.error("Error in markPlayerAsSoldInDB:", error);
        throw error;
    }
};

// Add a new player
export const addPlayerToDB = async (playerData) => {
    try {
        const {
            shortName, longName, age, nationality, leagueName, clubName, overall,
            potential, clubPosition, clubJerseyNumber, trending, playerFaceUrl,
            wageEur, valueEur, bought, heightCm, weightKg, skillMoves, pace,
            shooting, passing, dribbling, defending, physic, attackingSkills,
            skillAttributes, movementSkills, powerAttributes, mentalAttributes,
            defendingSkills, goalkeepingAbility
        } = playerData;

        // Insert wage data
        const wageInsert = await sql`
            INSERT INTO wages (wage_eur, value_eur, bought)
            VALUES (${wageEur}, ${valueEur}, ${bought})
            RETURNING wage_id;
        `;
        const wage_id = wageInsert[0].wage_id;

        // Insert player data
        const playerInsert = await sql`
            INSERT INTO players (
                short_name, long_name, league_name, club_name, overall, potential, age, wage_id,
                nationality_name, player_face_url, club_position, formation, club_jersey_number, trending
            )
            VALUES (
                ${shortName}, ${longName || ""}, ${leagueName || ""}, ${clubName || ""}, ${overall}, ${potential},
                ${age}, ${wage_id}, ${nationality}, ${playerFaceUrl}, ${clubPosition}, ${"Midfielder"},
                ${clubJerseyNumber}, ${trending}
            )
            RETURNING player_id;
        `;
        const player_id = playerInsert[0].player_id;

        // Insert physical attributes
        const heightM = heightCm / 100;
        const bmi = weightKg / (heightM * heightM);
        await sql`
            INSERT INTO physical (player_id, height_cm, weight_kg, bmi)
            VALUES (${player_id}, ${heightCm}, ${weightKg}, ${bmi});
        `;

        // Insert player skills
        await sql`
            INSERT INTO player_skills (
                player_id, skill_moves, pace, shooting, passing, dribbling, defending,
                physic, attacking_skills, skill_attributes, movement_skills, power_attributes,
                mental_attributes, defending_skills, goalkeeping_ability
            )
            VALUES (
                ${player_id}, ${skillMoves}, ${pace}, ${shooting}, ${passing}, ${dribbling}, ${defending},
                ${physic}, ${attackingSkills}, ${skillAttributes}, ${movementSkills}, ${powerAttributes},
                ${mentalAttributes || null}, ${defendingSkills || null}, ${goalkeepingAbility || null}
            );
        `;

        return player_id;
    } catch (error) {
        console.error("Error in addPlayerToDB:", error);
        throw error;
    }
};