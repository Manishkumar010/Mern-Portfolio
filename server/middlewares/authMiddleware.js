const jwt = require("jsonwebtoken");
const User = require("../models/user-models");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
    }

    const jwtToken = token.replace("Bearer", "").trim();
    console.log("✅ Token from auth middleware:", jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        const userData = await User.findOne({ email: isVerified.email }).select({
            password: 0,
        });

        if (!userData) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        console.log("✅ Authenticated user:", userData.email);

        req.user = userData;
        req.token = token;
        req.userId = userData._id;

        next();
    } catch (error) {
        console.log("❌ Auth middleware error:", error);
        return res.status(401).json({ message: "Unauthorized. Invalid token" });
    }
};

module.exports = authMiddleware;
