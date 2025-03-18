// services/playerService.js

import {
    getTopRatedPlayersFromDB,
    getHighPotentialPlayersFromDB,
    getBiggestRatingDifferencesFromDB,
} from "../../repositories/stats/potential-ranking-repository.js";

// Get Top-Rated Players
export const getTopRatedPlayers = async () => {
    try {
        const topRatedPlayers = await getTopRatedPlayersFromDB();
        return topRatedPlayers;
    } catch (error) {
        console.log("Something went wrong in Player Service (Top-Rated Players)");
        throw error;
    }
};

// Get High Potential Players
export const getHighPotentialPlayers = async () => {
    try {
        const highPotentialPlayers = await getHighPotentialPlayersFromDB();
        return highPotentialPlayers;
    } catch (error) {
        console.log("Something went wrong in Player Service (High Potential Players)");
        throw error;
    }
};

// Get Players with Biggest Rating Differences
export const getBiggestRatingDifferences = async () => {
    try {
        const ratingDifferences = await getBiggestRatingDifferencesFromDB();
        return ratingDifferences;
    } catch (error) {
        console.log("Something went wrong in Player Service (Rating Differences)");
        throw error;
    }
};