// controllers/playerController.js

import {
    getMostValuablePlayers,
    getHighestPaidPlayers,
    getBestValueForMoneyPlayers,
} from "../../../services/stats/financial-ranking-service.js";

export const getMostValuablePlayersHandler = async (req, res) => {
    try {
        const players = await getMostValuablePlayers();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch most valuable players" });
    }
};

export const getHighestPaidPlayersHandler = async (req, res) => {
    try {
        const players = await getHighestPaidPlayers();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch highest-paid players" });
    }
};

export const getBestValueForMoneyPlayersHandler = async (req, res) => {
    try {
        const players = await getBestValueForMoneyPlayers();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch best value-for-money players" });
    }
};