const authorizer = (requiredRole) => {
    return (req, res, next) => {
        try {
            const userRole = req.user.role; 
            
            if (userRole !== requiredRole) {
                return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
            }
            next();
        } catch (err) {
            console.error("Error in authorizer middleware:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
};

module.exports = authorizer;