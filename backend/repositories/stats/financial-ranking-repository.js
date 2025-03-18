
import { sql } from "../../neon/connection.js";

export const getMostValuablePlayersFromDB = async () => {
    try {
        const mostValuablePlayers = await sql`
        SELECT 
            p.player_id,
            p.player_face_url, 
            p.short_name, 
            w.bought, 
            w.value_eur, 
            p.age, 
            p.nationality_name 
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        ORDER BY w.value_eur DESC
        LIMIT 10;
    `;

        return mostValuablePlayers;
    } catch (error) {
        console.log("Something went wrong while in Financial ranking Repository")
        throw error
    }
};

export const getHighestPaidPlayersFromDB = async () => {
    try {
        const highestPaidPlayers = await sql`
                SELECT 
                    p.player_id,
                    p.player_face_url, 
                    p.short_name, 
                    w.bought, 
                    w.wage_eur, 
                    p.age, 
                    p.nationality_name 
                FROM players p
                JOIN wages w ON p.wage_id = w.wage_id
                ORDER BY w.wage_eur DESC
                LIMIT 10;
                `;

        return highestPaidPlayers;
    } catch (error) {
        console.log("Something went wrong while in Financial ranking Repository")
        throw error
    }
};

export const getBestValueForMoneyPlayersFromDB = async () => {
    try {
        const bestValueForMoneyPlayers = await sql`
                SELECT 
                    p.player_id,
                    p.player_face_url, 
                    p.short_name, 
                    w.bought, 
                    w.value_eur, 
                    (w.value_eur / NULLIF(w.wage_eur, 0)) AS value_for_money, 
                    p.age, 
                    p.nationality_name 
                FROM players p
                JOIN wages w ON p.wage_id = w.wage_id
                WHERE w.wage_eur > 0
                ORDER BY value_for_money DESC
                LIMIT 10;
                `;

        return bestValueForMoneyPlayers;
    } catch (error) {
        console.log("Something went wrong while in Financial ranking Repository")
        throw error
    }
};