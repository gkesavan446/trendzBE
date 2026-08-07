import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()


const protectedRoute = async (req, res, next) => {
    const authHeader = req.headers.authorization || ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null
    // console.log("URL:", req.originalUrl);
    // console.log("AUTH HEADER:", req.headers.authorization);
    try {
        if (!token) {
            return res.status(401).json({ message: "No Token Provided" })
        }
        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
        // console.log(payload)
        if (!payload) {
            return res.status(400).json({ message: "Invalid Token" })
        }
        req.user = { id: payload.userId, username: payload.username, role: payload.role }
        // console.log("req.user", req.user)
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired" });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }
        res.status(500).json({ message: "Internal Server Error", Error: error.message });
    }

}

export default protectedRoute;

