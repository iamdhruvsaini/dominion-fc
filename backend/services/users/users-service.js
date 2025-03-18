import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
    verifyAdminFromDB,
    addAdminToDB,
    removeAdminFromDB,
    updateAdminInDB,
    markUserSubscribedInDB,
    addCustomerToDB,
} from "../../repositories/users/users-repository.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// Verify admin credentials
export const verifyAdmin = async (email, password) => {
    try {
        const admin = await verifyAdminFromDB(email, password);
        const token = jwt.sign(
            { adminId: admin.admin_id, email: admin.email, role: admin.role },
            JWT_SECRET,
            { expiresIn: "2h" }
        );
        return { token, role: admin.role };
    } catch (error) {
        console.error("Error in verifyAdmin service:", error);
        throw error;
    }
};

// Add a new admin
export const addAdmin = async (name, email, role) => {
    try {
        const newAdmin = await addAdminToDB(name, email, role);
        return newAdmin;
    } catch (error) {
        console.error("Error in addAdmin service:", error);
        throw error;
    }
};

// Remove an admin
export const removeAdmin = async (email) => {
    try {
        const removedAdmin = await removeAdminFromDB(email);
        return removedAdmin;
    } catch (error) {
        console.error("Error in removeAdmin service:", error);
        throw error;
    }
};

// Update an admin
export const updateAdmin = async (employeeId, name, email, role) => {
    try {
        const updatedEmployee = await updateAdminInDB(employeeId, name, email, role);
        return updatedEmployee;
    } catch (error) {
        console.error("Error in updateAdmin service:", error);
        throw error;
    }
};

// Mark user as subscribed
export const markUserSubscribed = async (email) => {
    try {
        const result = await markUserSubscribedInDB(email);
        return result;
    } catch (error) {
        console.error("Error in markUserSubscribed service:", error);
        throw error;
    }
};

// Add a customer
export const addCustomer = async (userId, email) => {
    try {
        const result = await addCustomerToDB(userId, email);
        return result;
    } catch (error) {
        console.error("Error in addCustomer service:", error);
        throw error;
    }
};