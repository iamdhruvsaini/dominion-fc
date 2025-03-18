import {
    getBestForwardsFromDB,
    getBestMidfieldersFromDB,
    getBestDefendersFromDB,
    getBestGoalkeepersFromDB,
} from "../../repositories/stats/position-ranking-repository.js";

// Fetch best forwards
export const getBestForwards = async () => {
    try {
        const players = await getBestForwardsFromDB();
        return players;
    } catch (error) {
        console.error("Error in Player Service (Best Forwards):", error);
        throw error;
    }
};

// Fetch best midfielders
export const getBestMidfielders = async () => {
    try {
        const players = await getBestMidfieldersFromDB();
        return players;
    } catch (error) {
        console.error("Error in Player Service (Best Midfielders):", error);
        throw error;
    }
};

// Fetch best defenders
export const getBestDefenders = async () => {
    try {
        const players = await getBestDefendersFromDB();
        return players;
    } catch (error) {
        console.error("Error in Player Service (Best Defenders):", error);
        throw error;
    }
};

// Fetch best goalkeepers
export const getBestGoalkeepers = async () => {
    try {
        const players = await getBestGoalkeepersFromDB();
        return players;
    } catch (error) {
        console.error("Error in Player Service (Best Goalkeepers):", error);
        throw error;
    }
};