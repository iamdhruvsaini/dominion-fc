// controllers/playerController.js

import {
    getTopRatedPlayers,
    getHighPotentialPlayers,
    getBiggestRatingDifferences,
} from "../../../services/stats/potential-ranking-service.js";

// Get Top-Rated Players
export const getTopRatedPlayersHandler = async (req, res) => {
    try {
        const players = await getTopRatedPlayers();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch top-rated players", error: error.message });
    }
};

// Get High Potential Players
export const getHighPotentialPlayersHandler = async (req, res) => {
    try {
        const players = await getHighPotentialPlayers();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch high-potential players", error: error.message });
    }
};

// Get Players with Biggest Rating Differences
export const getBiggestRatingDifferencesHandler = async (req, res) => {
    try {
        const players = await getBiggestRatingDifferences();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch players with biggest rating differences", error: error.message });
    }
};