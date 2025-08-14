const adminMiddleware = async (req, res, next) => {
    try {
        console.log("👑 Admin Middleware:", req.user?.email);

        const adminRole = req.user?.isAdmin;

        if (!adminRole) {
            return res.status(403).json({ message: "Access denied. User is not an admin" });
        }

        // ✅ Admin verified — go to next middleware or controller
        next();
    } catch (error) {
        console.log("❌ Admin middleware error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = adminMiddleware;
