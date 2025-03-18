import {
    getPlayersWithHighestSkillMoves,
    getBestAttackingPlayers,
    getBestDefensivePlayers,
    getBestAllRoundPlayers,
    getPlayersWithBestFitnessLevel,
} from "../../../services/stats/players-skill-comparison-service.js";

// Fetch players with the highest skill moves
export const getPlayersWithHighestSkillMovesHandler = async (req, res) => {
    try {
        const players = await getPlayersWithHighestSkillMoves();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch players with highest skill moves", error: error.message });
    }
};

// Fetch best attacking players
export const getBestAttackingPlayersHandler = async (req, res) => {
    try {
        const players = await getBestAttackingPlayers();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch best attacking players", error: error.message });
    }
};

// Fetch best defensive players
export const getBestDefensivePlayersHandler = async (req, res) => {
    try {
        const players = await getBestDefensivePlayers();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch best defensive players", error: error.message });
    }
};

// Fetch best all-round players
export const getBestAllRoundPlayersHandler = async (req, res) => {
    try {
        const players = await getBestAllRoundPlayers();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch best all-round players", error: error.message });
    }
};

// Fetch players with the best fitness level
export const getPlayersWithBestFitnessLevelHandler = async (req, res) => {
    try {
        const players = await getPlayersWithBestFitnessLevel();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch players with best fitness level", error: error.message });
    }
};