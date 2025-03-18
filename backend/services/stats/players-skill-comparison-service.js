import {
    getPlayersWithHighestSkillMovesFromDB,
    getBestAttackingPlayersFromDB,
    getBestDefensivePlayersFromDB,
    getBestAllRoundPlayersFromDB,
    getPlayersWithBestFitnessLevelFromDB,
} from "../../repositories/stats/players-skill-comparison-repository.js";

// Fetch players with the highest skill moves
export const getPlayersWithHighestSkillMoves = async () => {
    try {
        const players = await getPlayersWithHighestSkillMovesFromDB();
        return players;
    } catch (error) {
        console.error("Error in Player Service (Highest Skill Moves):", error);
        throw error;
    }
};

// Fetch best attacking players
export const getBestAttackingPlayers = async () => {
    try {
        const players = await getBestAttackingPlayersFromDB();
        return players;
    } catch (error) {
        console.error("Error in Player Service (Best Attacking Players):", error);
        throw error;
    }
};

// Fetch best defensive players
export const getBestDefensivePlayers = async () => {
    try {
        const players = await getBestDefensivePlayersFromDB();
        return players;
    } catch (error) {
        console.error("Error in Player Service (Best Defensive Players):", error);
        throw error;
    }
};

// Fetch best all-round players
export const getBestAllRoundPlayers = async () => {
    try {
        const players = await getBestAllRoundPlayersFromDB();
        return players;
    } catch (error) {
        console.error("Error in Player Service (Best All-Round Players):", error);
        throw error;
    }
};

// Fetch players with the best fitness level
export const getPlayersWithBestFitnessLevel = async () => {
    try {
        const players = await getPlayersWithBestFitnessLevelFromDB();
        return players;
    } catch (error) {
        console.error("Error in Player Service (Best Fitness Level):", error);
        throw error;
    }
};