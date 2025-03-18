import {
    getBestForwards,
    getBestMidfielders,
    getBestDefenders,
    getBestGoalkeepers,
} from "../../../services/stats/position-ranking-service.js";

// Fetch best forwards
export const getBestForwardsHandler = async (req, res) => {
    try {
        const players = await getBestForwards();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch best forwards", error: error.message });
    }
};

// Fetch best midfielders
export const getBestMidfieldersHandler = async (req, res) => {
    try {
        const players = await getBestMidfielders();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch best midfielders", error: error.message });
    }
};

// Fetch best defenders
export const getBestDefendersHandler = async (req, res) => {
    try {
        const players = await getBestDefenders();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch best defenders", error: error.message });
    }
};

// Fetch best goalkeepers
export const getBestGoalkeepersHandler = async (req, res) => {
    try {
        const players = await getBestGoalkeepers();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch best goalkeepers", error: error.message });
    }
};