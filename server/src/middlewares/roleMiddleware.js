const roleMiddleware = (...roles) => {
    return (req, res, next) => {
        try {
            // Check if user's role is allowed
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Access Denied"
                });
            }

            // Allow access
            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong"
            });
        }
    };
};

module.exports = roleMiddleware;