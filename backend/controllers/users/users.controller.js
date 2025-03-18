
//admin controller
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { sql } from "../../neon/connection.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; 

export const verifyAdmin = async (req, res) => {
    
    const { email, password } = req.body; // Plain text password comes from request

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {

        const adminUser = await sql`
            SELECT * FROM admin WHERE email = ${email};
        `;

        if (adminUser.length === 0) {
            return res.status(401).json({ message: "Admin not found" });
        }

        const admin = adminUser[0]; 

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { adminId: admin.admin_id, email: admin.email, role: admin.role },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.status(200).json({ message: "Admin verified successfully", token ,role:admin.role});

    } catch (error) {
        console.error("Error verifying admin:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

//add new employee
export const addAdmin = async (req, res) => {
    const { email, name, role } = req.body; 

    if (!email || !name || !role) {
        return res.status(400).json({ message: "Email, name, and role are required" });
    }

    try {

        const existingAdmin = await sql`
            SELECT * FROM admin WHERE email = ${email};
        `;

        if (existingAdmin.length > 0) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const plainPassword = crypto.randomBytes(4).toString("hex"); 

        const hashedPassword = await bcrypt.hash(plainPassword, 10);

      
        const newAdmin = await sql`
            INSERT INTO admin (name, email, password, role) 
            VALUES (${name}, ${email}, ${hashedPassword}, ${role})
            RETURNING *;
        `;

        res.status(201).json({
            message: "Admin created successfully",
            admin: {
                admin_id: newAdmin[0].admin_id,
                name: newAdmin[0].name,
                email: newAdmin[0].email,
                role: newAdmin[0].role,
                password: plainPassword, // Return the plain text password for admin to note down
            },
        });

    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const removeAdmin = async (req, res) => {
    const { email } = req.body; // Admin email to remove

    if (!email) {
        return res.status(400).json({ message: "Email is required to remove an admin" });
    }

    try {
        const existingAdmin = await sql`
            SELECT * FROM admin WHERE email = ${email};
        `;

        if (existingAdmin.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Optional: Prevent deletion of a super admin
        if (existingAdmin[0].role === "superadmin") {
            return res.status(403).json({ message: "Cannot remove a super admin" });
        }

        await sql`
            DELETE FROM admin WHERE email = ${email};
        `;

        res.status(200).json({
            message: "Admin removed successfully",
            removedAdmin: {
                admin_id: existingAdmin[0].admin_id,
                name: existingAdmin[0].name,
                email: existingAdmin[0].email,
                role: existingAdmin[0].role,
            },
        });

    } catch (error) {
        console.error("Error removing admin:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const updateAdmin = async (req, res) => {
    const { employeeId, name, email, role } = req.body;

    if (!employeeId || !name || !email || !role) {
        return res.status(400).json({ message: "All fields (employeeId, name, email, role) are required" });
    }

    try {
        const existingEmployee = await sql`
            SELECT * FROM admin WHERE admin_id = ${employeeId};
        `;

        if (existingEmployee.length === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const updatedEmployee = await sql`
            UPDATE admin 
            SET name = ${name}, email = ${email}, role = ${role}
            WHERE admin_id = ${employeeId}
            RETURNING *;
        `;

        res.status(200).json({ 
            message: "Employee updated successfully", 
            updatedEmployee: updatedEmployee[0] 
        });

    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const markUserSubscribed = async (req, res) => {
    const { email } = req.body; 

    if (!email) {
        return res.status(400).json({ message: "Email is required to mark user as subscribed" });
    }

    try {
        const existingUser = await sql`
            SELECT * FROM users WHERE email = ${email};
        `;

        if (existingUser.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        if (existingUser.length !== 0 && existingUser[0].subscribed === true) {
            return res.status(400).json({ message: "User already subscribed" });
        }

        await sql`
            UPDATE users SET subscribed = true WHERE email = ${email};
        `;

        res.status(200).json({ message: "User marked as subscribed successfully" });

    } catch (error) {
        console.error("Error marking user as subscribed:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const addCustomer = async (req, res) => {
    try {
        const { userId, email } = req.body;
        console.log(userId, email);
      
        if (!userId || !email) {
          return res.status(400).json({ error: "userId and email are required" });
        }
      
        // Attempt to insert the user, ignoring duplicates
        await sql`
          INSERT INTO users (user_id, email, subscribed)
          VALUES (${userId}, ${email}, false)
          ON CONFLICT (user_id) DO NOTHING;
        `;
        
        return res.status(200).json({
          message: "User processed successfully",
        });
      } catch (error) {
        console.error("Error inserting user:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      
  };
  