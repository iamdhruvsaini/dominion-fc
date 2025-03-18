import {
    verifyAdmin,
    addAdmin,
    removeAdmin,
    updateAdmin,
    markUserSubscribed,
    addCustomer,
} from "../../services/users/users-service.js";

// Verify admin credentials
export const verifyAdminHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const { token, role } = await verifyAdmin(email, password);
        res.status(200).json({ message: "Admin verified successfully", token, role });
    } catch (error) {
        if (error.message === "Admin not found" || error.message === "Invalid credentials") {
            return res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Add a new admin
export const addAdminHandler = async (req, res) => {
    try {
        const { email, name, role } = req.body;

        if (!email || !name || !role) {
            return res.status(400).json({ message: "Email, name, and role are required" });
        }

        const newAdmin = await addAdmin(name, email, role);
        res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
    } catch (error) {
        if (error.message === "Admin already exists") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Remove an admin
export const removeAdminHandler = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required to remove an admin" });
        }

        const removedAdmin = await removeAdmin(email);
        res.status(200).json({ message: "Admin removed successfully", removedAdmin });
    } catch (error) {
        if (error.message === "Admin not found" || error.message === "Cannot remove a super admin") {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Update an admin
export const updateAdminHandler = async (req, res) => {
    try {
        const { employeeId, name, email, role } = req.body;

        if (!employeeId || !name || !email || !role) {
            return res.status(400).json({ message: "All fields (employeeId, name, email, role) are required" });
        }

        const updatedEmployee = await updateAdmin(employeeId, name, email, role);
        res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
    } catch (error) {
        if (error.message === "Employee not found") {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Mark user as subscribed
export const markUserSubscribedHandler = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required to mark user as subscribed" });
        }

        const result = await markUserSubscribed(email);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === "User not found" || error.message === "User already subscribed") {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Add a customer
export const addCustomerHandler = async (req, res) => {
    try {
        const { userId, email } = req.body;

        if (!userId || !email) {
            return res.status(400).json({ error: "userId and email are required" });
        }

        const result = await addCustomer(userId, email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};