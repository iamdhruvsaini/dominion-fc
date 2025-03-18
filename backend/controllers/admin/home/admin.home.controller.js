import { sql } from "../../../neon/connection.js"

//fetch portal stats
export const portalHomeStats = async (req, res) => {
    try {
        const response = await sql`
            SELECT 
                COUNT(p.player_id) AS total_players, 
                COUNT(CASE WHEN p.trending = 'YES' THEN 1 END) AS trending_players, 
                COUNT(DISTINCT p.nationality_name) AS total_countries,
                COUNT(DISTINCT p.club_name) AS total_clubs,
                COUNT(CASE WHEN w.bought = 1 THEN 1 END) AS total_players_sold
            FROM players p
            LEFT JOIN wages w ON p.wage_id = w.wage_id;
        `;

        res.status(200).json({
            success: true,
            data: response[0], 
        });
    } catch (error) {
        console.error("Error fetching portal home stats:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

//fetch trending players
export const getTrendingPlayers = async (req, res) => {
    try {
        const trendingPlayers = await sql`
            SELECT 
                player_id, 
                short_name, 
                nationality_name, 
                age
            FROM players
            WHERE trending = 'YES'
            ORDER BY timestamp DESC; 
        `;

        // Send response
        res.status(200).json({
            success: true,
            data: trendingPlayers,
        });
    } catch (error) {
        console.error("Error fetching trending players:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

//fetch recently sold players
export const getSoldPlayers = async (req, res) => {
    try {
        const boughtPlayers = await sql`
            SELECT 
                p.player_face_url,
                p.player_id, 
                p.short_name, 
                p.nationality_name, 
                p.age,
                w.wage_eur
            FROM players p
            JOIN wages w ON p.wage_id = w.wage_id
            WHERE w.bought = 1
            ORDER BY w.timestamp DESC; 
        `;

        // Send response
        res.status(200).json({
            success: true,
            data: boughtPlayers,
        });
    } catch (error) {
        console.error("Error fetching bought players:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await sql`
            SELECT admin_id, name, email, role, timestamp 
            FROM admin
            ORDER BY timestamp DESC;  -- Newest first
        `;

        res.status(200).json({
            message: "Admins fetched successfully",
            data:admins
        });
    } catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const removePlayers = async (req, res) => {
    try {
        const { player_id } = req.body;

        if (!player_id) {
            return res.status(400).json({
                success: false,
                message: "Player ID is required",
            });
        }

        const deletedPlayer = await sql`
            DELETE FROM players
            WHERE player_id = ${player_id}
            RETURNING *;
        `;

        if (deletedPlayer.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Player not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Player removed successfully",
            data: deletedPlayer[0],
        });
    } catch (error) {
        console.error("Error removing player:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// mark player as sold and used by the websocket 
export const markPlayerAsSold = async (playerId, bought, wage) => {
    // Get the wage_id for the given player
    const [player] = await sql`
      SELECT wage_id FROM players WHERE player_id = ${playerId}
    `;
    if (!player) {
      throw new Error("Player not found");
    }
  
    // Update the wages table: set bought to 0 or 1.
    const updatedWage = await sql`
      UPDATE wages
      SET bought = ${bought}, wage_eur = ${wage},timestamp = NOW()
      WHERE wage_id = ${player.wage_id}
      RETURNING *;
    `;
    return updatedWage;
};




//ADD A new Player
export const addPlayer = async (req, res) => {
  try {
    // Destructure the incoming fields from req.body
    const {
      // Player Basic Info
      shortName,
      longName,
      age,
      nationality,
      leagueName,
      clubName,
      overall,
      potential,
      clubPosition,
      clubJerseyNumber,
      trending,
      playerFaceUrl,
      // Wage Info
      wageEur,
      valueEur,
      bought,
      // Physical Attributes
      heightCm,
      weightKg,
      // Player Skills
      skillMoves,
      pace,
      shooting,
      passing,
      dribbling,
      defending,
      physic,
      attackingSkills,
      skillAttributes,
      movementSkills,
      powerAttributes,
      mentalAttributes,
      defendingSkills,
      goalkeepingAbility,


    } = req.body;

    // 1. Insert wage data first and get wage_id.
    const wageInsert = await sql`
      INSERT INTO wages (wage_eur, value_eur, bought)
      VALUES (${wageEur}, ${valueEur}, ${bought})
      RETURNING wage_id;
    `;
    const wage_id = wageInsert[0].wage_id;

    // 2. Insert player data with the wage_id reference.
    const playerInsert = await sql`
      INSERT INTO players (
        short_name, long_name, league_name, club_name, overall, potential, age, wage_id,
        nationality_name, player_face_url, club_position, formation, club_jersey_number, trending
      )
      VALUES (
        ${shortName}, ${longName?longName:""}, ${leagueName?leagueName:""}, ${clubName?clubName:""}, ${overall}, ${potential},
        ${age}, ${wage_id}, ${nationality}, ${playerFaceUrl}, ${clubPosition}, ${"Midfielder"},
        ${clubJerseyNumber}, ${trending}
      )
      RETURNING player_id;
    `;
    const player_id = playerInsert[0].player_id;

    // 3. Compute BMI from height and weight.
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    // 4. Insert physical attributes.
    await sql`
      INSERT INTO physical (player_id, height_cm, weight_kg, bmi)
      VALUES (${player_id}, ${heightCm}, ${weightKg}, ${bmi});
    `;

    // 5. Insert player skills.
    await sql`
      INSERT INTO player_skills (
        player_id, skill_moves, pace, shooting, passing, dribbling, defending,
        physic, attacking_skills, skill_attributes, movement_skills, power_attributes,
        mental_attributes, defending_skills, goalkeeping_ability
      )
      VALUES (
        ${player_id}, ${skillMoves}, ${pace}, ${shooting}, ${passing}, ${dribbling}, ${defending},
        ${physic}, ${attackingSkills}, ${skillAttributes}, ${movementSkills}, ${powerAttributes},
        ${mentalAttributes || null}, ${defendingSkills || null}, ${goalkeepingAbility || null}
      );
    `;

    console.log("Player Added ✅");

    res.status(201).json({ message: "Player added successfully" });
  } catch (error) {
    console.error("Error adding player:", error);
    res.status(500).json({ error: "Error adding player" });
  }
};



  