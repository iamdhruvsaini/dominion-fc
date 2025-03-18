import { sql } from "../../neon/connection.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Verify admin credentials
export const verifyAdminFromDB = async (email, password) => {
    try {
        const adminUser = await sql`
            SELECT * FROM admin WHERE email = ${email};
        `;

        if (adminUser.length === 0) {
            throw new Error("Admin not found");
        }

        const admin = adminUser[0];
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        return admin;
    } catch (error) {
        console.error("Error in verifyAdminFromDB:", error);
        throw error;
    }
};

// Add a new admin
export const addAdminToDB = async (name, email, role) => {
    try {
        const existingAdmin = await sql`
            SELECT * FROM admin WHERE email = ${email};
        `;

        if (existingAdmin.length > 0) {
            throw new Error("Admin already exists");
        }

        const plainPassword = crypto.randomBytes(4).toString("hex");
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        const newAdmin = await sql`
            INSERT INTO admin (name, email, password, role) 
            VALUES (${name}, ${email}, ${hashedPassword}, ${role})
            RETURNING *;
        `;

        return { ...newAdmin[0], password: plainPassword };
    } catch (error) {
        console.error("Error in addAdminToDB:", error);
        throw error;
    }
};

// Remove an admin
export const removeAdminFromDB = async (email) => {
    try {
        const existingAdmin = await sql`
            SELECT * FROM admin WHERE email = ${email};
        `;

        if (existingAdmin.length === 0) {
            throw new Error("Admin not found");
        }

        if (existingAdmin[0].role === "superadmin") {
            throw new Error("Cannot remove a super admin");
        }

        await sql`
            DELETE FROM admin WHERE email = ${email};
        `;

        return existingAdmin[0];
    } catch (error) {
        console.error("Error in removeAdminFromDB:", error);
        throw error;
    }
};

// Update an admin
export const updateAdminInDB = async (employeeId, name, email, role) => {
    try {
        const existingEmployee = await sql`
            SELECT * FROM admin WHERE admin_id = ${employeeId};
        `;

        if (existingEmployee.length === 0) {
            throw new Error("Employee not found");
        }

        const updatedEmployee = await sql`
            UPDATE admin 
            SET name = ${name}, email = ${email}, role = ${role}
            WHERE admin_id = ${employeeId}
            RETURNING *;
        `;

        return updatedEmployee[0];
    } catch (error) {
        console.error("Error in updateAdminInDB:", error);
        throw error;
    }
};

// Mark user as subscribed
export const markUserSubscribedInDB = async (email) => {
    try {
        const existingUser = await sql`
            SELECT * FROM users WHERE email = ${email};
        `;

        if (existingUser.length === 0) {
            throw new Error("User not found");
        }

        if (existingUser[0].subscribed === true) {
            throw new Error("User already subscribed");
        }

        await sql`
            UPDATE users SET subscribed = true WHERE email = ${email};
        `;

        return { message: "User marked as subscribed successfully" };
    } catch (error) {
        console.error("Error in markUserSubscribedInDB:", error);
        throw error;
    }
};

// Add a customer
export const addCustomerToDB = async (userId, email) => {
    try {
        await sql`
            INSERT INTO users (user_id, email, subscribed)
            VALUES (${userId}, ${email}, false)
            ON CONFLICT (user_id) DO NOTHING;
        `;

        return { message: "User processed successfully" };
    } catch (error) {
        console.error("Error in addCustomerToDB:", error);
        throw error;
    }
};