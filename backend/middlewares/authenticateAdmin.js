import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; 

export const authenticateAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) return res.status(401).json({ message: "Access denied" });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.role !== 'maintainer' || decoded.role !== 'super-admin') {
        return res.status(403).json({ message: "Forbidden: Admins only" });
      }
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid token" });
    }
  };
  