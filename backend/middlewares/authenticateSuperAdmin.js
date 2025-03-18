
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateSuperAdmin = (req, res, next) => {

  const token = req.headers.authorization?.split(' ')[1]?.trim();

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded vaule ",decoded);
    if (decoded.role !== 'super-admin') {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
  } catch (error) {
    console.log("SOME ERROR OCCURRED");
    res.status(403).json({ message: "Invalid token" });
  }
};
