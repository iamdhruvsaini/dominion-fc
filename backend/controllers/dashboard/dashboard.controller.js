import {
    getPlayerPositionCount,
    getRecentSoldPlayers,
    getPlayerDetailsByID,
} from "../../services/dashboard/dashboard-service.js";

// Get player position count
export const getPlayerPositionCountHandler = async (req, res) => {
    try {
        const positionCount = await getPlayerPositionCount();
        res.status(200).json({ success: true, data: positionCount });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// Get recently sold players
export const getRecentSoldPlayerHandler = async (req, res) => {
    try {
        const soldPlayers = await getRecentSoldPlayers();
        res.status(200).json({ success: true, data: soldPlayers });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// Get player details by ID
export const getPlayerDetailsByIDHandler = async (req, res) => {
    try {
        const { playerId } = req.params;
        const playerDetails = await getPlayerDetailsByID(playerId);
        res.status(200).json(playerDetails);
    } catch (error) {
        if (error.message === "Player not found") {
            res.status(404).json({ error: "Player not found" });
        } else {
            res.status(500).json({ error: "Internal server error", details: error.message });
        }
    }
};