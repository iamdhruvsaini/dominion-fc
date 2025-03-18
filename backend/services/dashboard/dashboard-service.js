import {
    getPlayerPositionCountFromDB,
    getRecentSoldPlayersFromDB,
    getPlayerDetailsByIDFromDB,
} from "../../repositories/dashboard/dashboard-repository.js";

// Get player position count
export const getPlayerPositionCount = async () => {
    try {
        const positionCount = await getPlayerPositionCountFromDB();
        return positionCount;
    } catch (error) {
        console.error("Error in getPlayerPositionCount service:", error);
        throw error;
    }
};

// Get recently sold players
export const getRecentSoldPlayers = async () => {
    try {
        const soldPlayers = await getRecentSoldPlayersFromDB();
        return soldPlayers;
    } catch (error) {
        console.error("Error in getRecentSoldPlayers service:", error);
        throw error;
    }
};

// Get player details by ID
export const getPlayerDetailsByID = async (playerId) => {
    try {
        const playerDetails = await getPlayerDetailsByIDFromDB(playerId);
        if (playerDetails.length === 0) {
            throw new Error("Player not found");
        }
        return playerDetails[0];
    } catch (error) {
        console.error("Error in getPlayerDetailsByID service:", error);
        throw error;
    }
};