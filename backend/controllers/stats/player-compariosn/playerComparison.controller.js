import { sql } from "../../../neon/connection.js";

export const fetchSimilarPlayer = async (req, res) => {
    try {
        const { overall, position } = req.params;
        if (!overall) return res.status(400).json({ error: "Overall parameter is required" });

        const overallValue = parseInt(overall);

        // Base query for players with overall value between -5 and +5 of the given overall
        let querySimilar = `
            SELECT 
                p.player_id,
                p.short_name,
                p.long_name,
                p.club_name,
                p.overall,
                p.club_position,
                p.nationality_name,
                p.player_face_url,
                ps.skill_moves,
                ps.pace,
                ps.shooting,
                ps.passing,
                ps.dribbling,
                ps.defending,
                ps.physic
            FROM 
                players p
            LEFT JOIN 
                player_skills ps ON p.player_id = ps.player_id
            WHERE 
                p.overall BETWEEN $1 AND $2
        `;

        let queryParams = [overallValue + 1, overallValue - 1];

        if (position) {
            querySimilar += ` AND p.club_position = $3`;
            queryParams.push(position);
        }

        querySimilar += ` ORDER BY p.overall ASC LIMIT 10`; // Adjust limit if needed

        const similarPlayers = await sql(querySimilar, queryParams);

        console.log("Similar players fetched:", similarPlayers);

        return res.status(200).json({
            similarPlayers
        });
    } catch (error) {
        console.error("Error fetching similar players:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
