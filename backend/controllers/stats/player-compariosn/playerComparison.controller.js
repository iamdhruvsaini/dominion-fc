import { fetchSimilarPlayers } from "../../../services/stats/player-comparison-service.js";

// Fetch similar players handler
export const fetchSimilarPlayerHandler = async (req, res) => {
    try {
        const { overall, position } = req.params;

        const similarPlayers = await fetchSimilarPlayers(overall, position);

        console.log("Similar players fetched:", similarPlayers);

        return res.status(200).json({
            success: true,
            data: similarPlayers,
        });
    } catch (error) {
        console.error("Error in Player Controller (Fetch Similar Players):", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch similar players",
            error: error.message,
        });
    }
};