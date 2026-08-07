import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const isAdmin = async (req, res, next) => {
    const { id, username, role } = req.user
    try {
        if (role !== "admin") {
            return res.status(403).json({ message: "Access Denied, admin only" })
        }
        next()
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", Error: error.message });
    }
}

export default isAdmin;