import {
    getPortalHomeStats,
    getTrendingPlayers,
    getSoldPlayers,
    getAllAdmins,
    removePlayer,
    markPlayerAsSold, // Add this import
    addPlayer,
} from "../../../services/admin/admin-home-service.js";

// Fetch portal stats
export const portalHomeStatsHandler = async (req, res) => {
    try {
        const stats = await getPortalHomeStats();
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// Fetch trending players
export const getTrendingPlayersHandler = async (req, res) => {
    try {
        const players = await getTrendingPlayers();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// Fetch recently sold players
export const getSoldPlayersHandler = async (req, res) => {
    try {
        const players = await getSoldPlayers();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// Fetch all admins
export const getAllAdminsHandler = async (req, res) => {
    try {
        const admins = await getAllAdmins();
        res.status(200).json({ message: "Admins fetched successfully", data: admins });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Remove a player
export const removePlayersHandler = async (req, res) => {
    try {
        const { player_id } = req.body;
        if (!player_id) {
            return res.status(400).json({ success: false, message: "Player ID is required" });
        }

        const deletedPlayer = await removePlayer(player_id);
        if (!deletedPlayer.length) {
            return res.status(404).json({ success: false, message: "Player not found" });
        }

        res.status(200).json({ success: true, message: "Player removed successfully", data: deletedPlayer[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// Mark player as sold
export const markPlayerAsSoldHandler = async (req, res) => {
    try {
        const { playerId, bought, wage } = req.body;

        if (!playerId || bought === undefined || !wage) {
            return res.status(400).json({ success: false, message: "Player ID, bought status, and wage are required" });
        }

        const updatedWage = await markPlayerAsSold(playerId, bought, wage);
        res.status(200).json({ success: true, message: "Player marked as sold", data: updatedWage });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// Add a new player
export const addPlayerHandler = async (req, res) => {
    try {
        const playerId = await addPlayer(req.body);
        res.status(201).json({ message: "Player added successfully", playerId });
    } catch (error) {
        res.status(500).json({ error: "Error adding player", details: error.message });
    }
};