import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    // Get token from request headers
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
    }
};

export default authMiddleware;
