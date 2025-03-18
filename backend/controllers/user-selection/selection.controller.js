import { sql } from "../../neon/connection.js";


export const addPlayerToUserSelection = async (req, res) => {
  const { user_id, player_id } = req.body;

  if (!user_id || !player_id) {
    return res.status(400).json({ message: "User ID and Player ID are required" });
  }

  try {
    const existingUser = await sql`SELECT user_id FROM users WHERE user_id = ${user_id}`;

    if (existingUser.length === 0) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    await sql`
      INSERT INTO user_selections (user_id, player_id) 
      VALUES (${user_id}, ${player_id})
      ON CONFLICT (user_id, player_id) DO NOTHING;
    `;
    res.status(200).json({ message: `Player with ID ${player_id} successfully added to user ${user_id}'s selection.` });

  } catch (error) {
    console.error("Error adding player to user selection:", error);
    res.status(500).json({ message: "An error occurred while adding the player to selection." });
  }
};

export const getUserSelectedPlayers = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Check if the user exists
    const existingUser = await sql`SELECT user_id FROM users WHERE user_id = ${userId}`;

    if (existingUser.length === 0) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    // Fetch selected players with 'bought' status
    const selectedPlayers = await sql`
      SELECT p.player_id, p.short_name, p.long_name, p.club_name, p.overall, 
             p.potential, p.age, p.player_face_url, p.club_position, w.bought, w.value_eur
      FROM user_selections us
      JOIN players p ON us.player_id = p.player_id
      LEFT JOIN wages w ON p.wage_id = w.wage_id
      WHERE us.user_id = ${userId};
    `;

    if (selectedPlayers.length === 0) {
      return res.status(200).json({ message: "No players selected.", data: [] });
    }

    res.status(200).json({ message: "Selected players retrieved successfully.", data: selectedPlayers });
  } catch (error) {
    console.error("Error fetching selected players:", error);
    res.status(500).json({ message: "An error occurred while fetching selected players." });
  }
};

export const removePlayerFromUserSelection = async (req, res) => {
  const { user_id, player_id } = req.body;
  console.log(user_id, player_id);
  if (!user_id || !player_id) {
    return res.status(400).json({ message: "User ID and Player ID are required" });
  }

  try {
    const existingEntry = await sql`
      SELECT * FROM user_selections WHERE user_id = ${user_id} AND player_id = ${player_id}
    `;

    if (existingEntry.length === 0) {
      return res.status(404).json({ message: "Player not found in user's selection." });
    }

    await sql`
      DELETE FROM user_selections WHERE user_id = ${user_id} AND player_id = ${player_id}
    `;

    res.status(200).json({ message: `Player with ID ${player_id} successfully removed from user ${user_id}'s selection.` });

  } catch (error) {
    console.error("Error removing player from user selection:", error);
    res.status(500).json({ message: "An error occurred while removing the player from selection." });
  }
};
