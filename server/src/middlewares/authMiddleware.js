const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {

    try {
        console.log("Middleware Running");

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Token missing.",
            })
        }
        console.log(token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token "
        });
    }




}

module.exports = authMiddleware;