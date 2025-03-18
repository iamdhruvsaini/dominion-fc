import { sql } from "../../neon/connection.js";

// forwrds[3]='LW','ST','RW'
// Midfielders[3]='CDM','CAM','CM'
// Defenders[3]='RB','CB','LB'
// goalkeeper[3]='GK'


export const fetchDefenderPlayers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const { player, country, position, age } = req.query;

        // Base query with dynamic conditions
        let query = `
            SELECT p.player_id, p.player_face_url, p.short_name, p.nationality_name, 
                   p.overall, p.age, p.club_position, w.bought
            FROM players p
            LEFT JOIN wages w ON p.wage_id = w.wage_id
            WHERE p.club_position IN ('RB','CB','LB')
        `;
        let values = [];
        let count = 1;

        if (player) {
            query += ` AND short_name ILIKE $${count}`;
            values.push(`%${player}%`);
            count++;
        }
        if (country) {
            query += ` AND nationality_name ILIKE $${count}`;
            values.push(`%${country}%`);
            count++;
        }
        if (position) {
            query += ` AND club_position = $${count}`;
            values.push(position);
            count++;
        }
        if (age) {
            query += ` AND age >= $${count}`;
            values.push(parseInt(age));
            count++;
        }

        // Add pagination
        query += ` LIMIT $${count} OFFSET $${count + 1}`;
        values.push(limit, offset);

        // Execute the query
        const players = await sql(query, values);

        res.status(200).json({
            success: true,
            data: players
        });

    } catch (error) {
        console.error("Error fetching defender players:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch defender players",
            error: error.message
        });
    }
};

export const fetchMidfieldersPlayers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const { player, country, position, age } = req.query;

        // Base query with dynamic conditions
        let query = `
            SELECT p.player_id, p.player_face_url, p.short_name, p.nationality_name, 
                   p.overall, p.age, p.club_position, w.bought
            FROM players p
            LEFT JOIN wages w ON p.wage_id = w.wage_id
            WHERE p.club_position IN ('CDM','CAM','CM')
        `;
        let values = [];
        let count = 1;

        if (player) {
            query += ` AND short_name ILIKE $${count}`;
            values.push(`%${player}%`);
            count++;
        }
        if (country) {
            query += ` AND nationality_name ILIKE $${count}`;
            values.push(`%${country}%`);
            count++;
        }
        if (position) {
            query += ` AND club_position = $${count}`;
            values.push(position);
            count++;
        }
        if (age) {
            query += ` AND age >= $${count}`;
            values.push(parseInt(age));
            count++;
        }

        // Add pagination
        query += ` LIMIT $${count} OFFSET $${count + 1}`;
        values.push(limit, offset);

        // Execute the query
        const players = await sql(query, values);

        res.status(200).json({
            success: true,
            data: players
        });

    } catch (error) {
        console.error("Error fetching defender players:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch defender players",
            error: error.message
        });
    }
};

export const fetchForwardsPlayers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const { player, country, position, age } = req.query;

        // Base query with dynamic conditions
        let query = `
            SELECT p.player_id, p.player_face_url, p.short_name, p.nationality_name, 
                   p.overall, p.age, p.club_position, w.bought
            FROM players p
            LEFT JOIN wages w ON p.wage_id = w.wage_id
            WHERE p.club_position IN ('LW','ST','RW')
        `;
        let values = [];
        let count = 1;

        if (player) {
            query += ` AND short_name ILIKE $${count}`;
            values.push(`%${player}%`);
            count++;
        }
        if (country) {
            query += ` AND nationality_name ILIKE $${count}`;
            values.push(`%${country}%`);
            count++;
        }
        if (position) {
            query += ` AND club_position = $${count}`;
            values.push(position);
            count++;
        }
        if (age) {
            query += ` AND age >= $${count}`;
            values.push(parseInt(age));
            count++;
        }

        // Add pagination
        query += ` LIMIT $${count} OFFSET $${count + 1}`;
        values.push(limit, offset);

        // Execute the query
        const players = await sql(query, values);

        res.status(200).json({
            success: true,
            data: players
        });

    } catch (error) {
        console.error("Error fetching defender players:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch defender players",
            error: error.message
        });
    }
};

export const fetchGoalKeeperPlayers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const { player, country, position, age } = req.query;

        // Base query with dynamic conditions
        let query = `
            SELECT p.player_id, p.player_face_url, p.short_name, p.nationality_name, 
                   p.overall, p.age, p.club_position, w.bought
            FROM players p
            LEFT JOIN wages w ON p.wage_id = w.wage_id
            WHERE p.club_position = 'GK'
        `;
        let values = [];
        let count = 1;

        if (player) {
            query += ` AND short_name ILIKE $${count}`;
            values.push(`%${player}%`);
            count++;
        }
        if (country) {
            query += ` AND nationality_name ILIKE $${count}`;
            values.push(`%${country}%`);
            count++;
        }
        if (position) {
            query += ` AND club_position = $${count}`;
            values.push(position);
            count++;
        }
        if (age) {
            query += ` AND age >= $${count}`;
            values.push(parseInt(age));
            count++;
        }

        // Add pagination
        query += ` LIMIT $${count} OFFSET $${count + 1}`;
        values.push(limit, offset);

        // Execute the query
        const players = await sql(query, values);

        res.status(200).json({
            success: true,
            data: players
        });

    } catch (error) {
        console.error("Error fetching defender players:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch defender players",
            error: error.message
        });
    }
};

export const fetchTrendingPlayers = async (req, res) => {
    try {

        // Base query with dynamic conditions
        let query = `
            SELECT p.player_id, p.player_face_url, p.short_name, p.nationality_name, 
                   p.overall, p.age, p.club_position, w.bought,w.value_eur
            FROM players p
            LEFT JOIN wages w ON p.wage_id = w.wage_id
            WHERE p.trending ='YES'
            `;


        // Execute the query
        const players = await sql(query);

        res.status(200).json({
            success: true,
            data: players
        });

    } catch (error) {
        console.error("Error fetching trending players:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch trending players",
            error: error.message
        });
    }
};

export const fetchAllPlayers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const { player, country, age } = req.query;

        // Base query
        let query = `
    SELECT 
        p.player_id,
        p.player_face_url,
        p.short_name,
        p.club_position,
        p.nationality_name,
        p.overall,
        p.age,
        w.bought,
        ps.skill_moves,
        ps.pace,
        ps.shooting,
        ps.passing,
        ps.dribbling,
        ps.defending,
        ps.physic
    FROM 
        players p
    JOIN 
        wages w ON p.wage_id = w.wage_id
    LEFT JOIN 
        player_skills ps ON p.player_id = ps.player_id
`;


        let values = [];
        let conditions = [];

        // Dynamic conditions
        if (player) {
            conditions.push(`short_name ILIKE $${values.length + 1}`);
            values.push(`%${player}%`);
        }
        if (country) {
            conditions.push(`nationality_name ILIKE $${values.length + 1}`);
            values.push(`%${country}%`);
        }
        if (age) {
            conditions.push(`age >= $${values.length + 1}`);
            values.push(parseInt(age));
        }

        // Append WHERE clause if any filters exist
        if (conditions.length > 0) {
            query += ` WHERE ` + conditions.join(" AND ");
        }

        // Add pagination
        query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
        values.push(limit, offset);

        // Execute the query
        const players = await sql(query, values);

        res.status(200).json({
            success: true,
            data: players
        });

    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch players",
            error: error.message
        });
    }
};








