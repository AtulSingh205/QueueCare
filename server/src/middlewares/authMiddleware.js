// const jwt = require('jsonwebtoken');

// const authMiddleware = async (req, res, next) => {

//     try {
//         console.log("Middleware Running");

//         console.log(req.headers.authorization)

//         const token = req.headers.authorization?.split(" ")[1];

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Access denied. Token missing.",
//             })
//         }
//         console.log(token);

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;

//         next();
//     } catch (error) {

//         return res.status(401).json({
//             success: false,
//             message: "Invalid or Expired Token "
//         });
//     }




// }

// module.exports = authMiddleware;



const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        console.log("Middleware Running");

        console.log("Authorization Header:", req.headers.authorization);

        const token = req.headers.authorization?.split(" ")[1];

        console.log("Extracted Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded:", decoded);

        req.user = decoded;

        next();
    } catch (error) {
        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        });
    }
};

module.exports = authMiddleware;