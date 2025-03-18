import fs from "fs";
import csvParser from "csv-parser";
import { sql } from "../neon/connection.js";

export function InsertData() {
    return new Promise((resolve, reject) => {
        const rows = [];

        // Step 1: Read CSV into an array
        fs.createReadStream("C:/Users/iamdhruvsaini/Desktop/deloitte/football-optimization/football/backend/data/final_DB.csv")
            .pipe(csvParser())
            .on("data", (row) => rows.push(row))
            .on("end", async () => {
                console.log(`✅ Successfully Read ${rows.length} Rows from CSV`);

                try {
                    for (const row of rows) {
                        let wageId = null;
                        if (row.wage_eur && row.value_eur) {
                            const wageResult = await sql`
                                INSERT INTO wages (bought, wage_eur, value_eur)
                                VALUES (
                                    ${row.bought ? parseInt(row.bought) : 0},
                                    ${row.wage_eur ? parseFloat(row.wage_eur) : null},
                                    ${row.value_eur ? parseFloat(row.value_eur) : null}
                                )
                                RETURNING wage_id;
                            `;
                            wageId = wageResult[0].wage_id;
                        }

                        // ✅ Insert into players table
                        const playerResult = await sql`
                            INSERT INTO players (
                                short_name, long_name, league_name, club_name, 
                                overall, potential, age, wage_id, nationality_name, 
                                player_face_url, club_position, club_jersey_number, 
                                trending, formation
                            ) VALUES (
                                ${row.short_name || null},
                                ${row.long_name || null},
                                ${row.league_name || null},
                                ${row.club_name || null},
                                ${row.overall ? parseInt(row.overall) : null},
                                ${row.potential ? parseInt(row.potential) : null},
                                ${row.age ? parseInt(row.age) : null},
                                ${wageId},
                                ${row.nationality_name || null},
                                ${row.player_face_url || null},
                                ${row.club_position || null},
                                ${row.club_jersey_number ? parseInt(row.club_jersey_number) : null},
                                ${row.trending || "NO"},
                                ${row.formation || null}
                            ) RETURNING player_id;
                        `;
                        const playerId = playerResult[0].player_id;

                        // ✅ Insert into physical table
                        await sql`
                            INSERT INTO physical (player_id, height_cm, weight_kg, bmi)
                            VALUES (
                                ${playerId},
                                ${row.height_cm ? parseInt(row.height_cm) : null},
                                ${row.weight_kg ? parseFloat(row.weight_kg) : null},
                                ${row.height_cm && row.weight_kg 
                                    ? parseFloat((row.weight_kg / ((row.height_cm / 100) ** 2)).toFixed(2)) 
                                    : null}
                            );
                        `;

                        // ✅ Insert into player_skills table
                        await sql`
                            INSERT INTO player_skills (
                                player_id, skill_moves, pace, shooting, passing, dribbling, 
                                defending, physic, attacking_skills, skill_attributes, 
                                movement_skills, power_attributes, mental_attributes, 
                                defending_skills, goalkeeping_ability
                            ) VALUES (
                                ${playerId},
                                ${row.skill_moves ? parseInt(row.skill_moves) : null},
                                ${row.pace ? parseFloat(row.pace) : null},
                                ${row.shooting ? parseFloat(row.shooting) : null},
                                ${row.passing ? parseFloat(row.passing) : null},
                                ${row.dribbling ? parseFloat(row.dribbling) : null},
                                ${row.defending ? parseFloat(row.defending) : null},
                                ${row.physic ? parseFloat(row.physic) : null},
                                ${row.attacking_skills ? parseFloat(row.attacking_skills) : null},
                                ${row.skill_attributes ? parseFloat(row.skill_attributes) : null},
                                ${row.movement_skills ? parseFloat(row.movement_skills) : null},
                                ${row.power_attributes ? parseFloat(row.power_attributes) : null},
                                ${row.mental_attributes ? parseFloat(row.mental_attributes) : null},
                                ${row.defending_skills ? parseFloat(row.defending_skills) : null},
                                ${row.goalkeeping_ability ? parseFloat(row.goalkeeping_ability) : null}
                            );
                        `;

                        console.log(`✅ Inserted: ${row.short_name}`);
                    }

                    console.log("✅ All Data Imported Successfully!");
                    resolve();
                } catch (error) {
                    console.error("❌ Error inserting data:", error);
                    reject(error);
                }
            })
            .on("error", (error) => reject(error));
            
    });
}
