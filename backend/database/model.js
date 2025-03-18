import { sql } from "../neon/connection.js";

export const DominionFcModel = async () => {
    // Users Table
    await sql`
    CREATE TABLE IF NOT EXISTS users (
        user_id TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        subscribed BOOLEAN DEFAULT FALSE
    );
    `;

    // Wages Table
    await sql`
    CREATE TABLE IF NOT EXISTS wages (
        wage_id SERIAL PRIMARY KEY,
        bought SMALLINT DEFAULT 0,
        wage_eur DOUBLE PRECISION,
        value_eur DOUBLE PRECISION,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

    // Players Table 
    await sql`
    CREATE TABLE IF NOT EXISTS players (
        player_id SERIAL PRIMARY KEY,
        short_name TEXT NOT NULL,
        long_name TEXT,
        league_name TEXT,
        club_name TEXT,
        overall INT,
        potential INT,
        age INT,
        wage_id INT,
        nationality_name TEXT,  
        player_face_url TEXT NOT NULL,
        club_position VARCHAR(50),
        formation TEXT,
        club_jersey_number INT,
        trending VARCHAR(5) DEFAULT 'NO',
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (wage_id) REFERENCES wages(wage_id) ON DELETE SET NULL
    );
    `;

    // Physical Attributes Table
    await sql`
    CREATE TABLE IF NOT EXISTS physical (
        physical_id SERIAL PRIMARY KEY,
        player_id INT NOT NULL,
        height_cm INT,
        weight_kg DECIMAL(10,2),
        bmi DECIMAL(10,2),
        FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE
    );
    `;

    // Player Skills Table
    await sql`
    CREATE TABLE IF NOT EXISTS player_skills (
        skill_id SERIAL PRIMARY KEY,
        player_id INT NOT NULL,
        skill_moves INT,
        pace FLOAT,
        shooting FLOAT,
        passing FLOAT,
        dribbling FLOAT,
        defending FLOAT,
        physic FLOAT,
        attacking_skills FLOAT,
        skill_attributes FLOAT,
        movement_skills FLOAT,
        power_attributes FLOAT,
        mental_attributes FLOAT,
        defending_skills FLOAT,
        goalkeeping_ability FLOAT,
        FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE
    );
    `;

    // User Selections Table
    await sql`
    CREATE TABLE IF NOT EXISTS user_selections (
        user_id TEXT NOT NULL,
        player_id INT NOT NULL,
        PRIMARY KEY (user_id, player_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE
    );
    `;

    // Admin Table
    await sql`
    CREATE TABLE IF NOT EXISTS admin (
        admin_id SERIAL NOT NULL PRIMARY KEY, 
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(255),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
};
