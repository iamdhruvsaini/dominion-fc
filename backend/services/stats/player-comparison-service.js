import { fetchSimilarPlayersFromDB } from "../../repositories/stats/player-comparison-repository.js";

// Fetch similar players
export const fetchSimilarPlayers = async (overall, position) => {
    try {
        if (!overall) {
            throw new Error("Overall parameter is required");
        }

        const similarPlayers = await fetchSimilarPlayersFromDB(overall, position);
        return similarPlayers;
    } catch (error) {
        console.error("Error in Player Service (Fetch Similar Players):", error);
        throw error;
    }
};