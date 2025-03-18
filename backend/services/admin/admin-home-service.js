import {
    getPortalHomeStatsFromDB,
    getTrendingPlayersFromDB,
    getSoldPlayersFromDB,
    getAllAdminsFromDB,
    removePlayerFromDB,
    markPlayerAsSoldInDB,
    addPlayerToDB,
} from "../../repositories/admin/admin-home-repository.js";

// Fetch portal stats
export const getPortalHomeStats = async () => {
    try {
        const stats = await getPortalHomeStatsFromDB();
        return stats;
    } catch (error) {
        console.error("Error in getPortalHomeStats service:", error);
        throw error;
    }
};

// Fetch trending players
export const getTrendingPlayers = async () => {
    try {
        const players = await getTrendingPlayersFromDB();
        return players;
    } catch (error) {
        console.error("Error in getTrendingPlayers service:", error);
        throw error;
    }
};

// Fetch recently sold players
export const getSoldPlayers = async () => {
    try {
        const players = await getSoldPlayersFromDB();
        return players;
    } catch (error) {
        console.error("Error in getSoldPlayers service:", error);
        throw error;
    }
};

// Fetch all admins
export const getAllAdmins = async () => {
    try {
        const admins = await getAllAdminsFromDB();
        return admins;
    } catch (error) {
        console.error("Error in getAllAdmins service:", error);
        throw error;
    }
};

// Remove a player
export const removePlayer = async (player_id) => {
    try {
        const deletedPlayer = await removePlayerFromDB(player_id);
        return deletedPlayer;
    } catch (error) {
        console.error("Error in removePlayer service:", error);
        throw error;
    }
};

// Mark player as sold
export const markPlayerAsSold = async (playerId, bought, wage) => {
    try {
        const updatedWage = await markPlayerAsSoldInDB(playerId, bought, wage);
        return updatedWage;
    } catch (error) {
        console.error("Error in markPlayerAsSold service:", error);
        throw error;
    }
};

// Add a new player
export const addPlayer = async (playerData) => {
    try {
        const playerId = await addPlayerToDB(playerData);
        return playerId;
    } catch (error) {
        console.error("Error in addPlayer service:", error);
        throw error;
    }
};