// const Queue = require("../models/Queue");

// // Get Current Queue
// const getCurrentQueue = async (req, res) => {
//     try {

//         const { doctorId } = req.params;

//         const queue = await Queue.findOne({ doctor: doctorId });

//         if (!queue) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Queue not found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             queue
//         });

//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         });
//     }
// };

// const getQueue = async (req, res) => {
//     try {
//         const { doctorId } = req.params;

//         const queue = await Queue.findOne({
//             doctor: doctorId
//         });

//         if (!queue) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Queue not found"
//             });
//         }
//         return res.status(200).json({
//             success: true,
//             queue
//         });
//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         });
//     }
// };

// // Next Token
// const nextToken = async (req, res) => {
//     try {

//         const { doctorId } = req.params;

//         const queue = await Queue.findOne({ doctor: doctorId });

//         if (!queue) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Queue not found"
//             });
//         }

//         queue.currentToken += 1;

//         await queue.save();

//         return res.status(200).json({
//             success: true,
//             message: "Next patient called successfully",
//             queue
//         });

//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         });
//     }
// };

// module.exports = {
//     getCurrentQueue,
//     nextToken,
//     getQueue
// };


const Queue = require("../models/Queue");

// Get Queue
const getQueue = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const queue = await Queue.findOne({
            doctor: doctorId
        });

        if (!queue) {
            return res.status(404).json({
                success: false,
                message: "Queue not found"
            });
        }

        return res.status(200).json({
            success: true,
            queue
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Call Next Patient
const nextToken = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const queue = await Queue.findOne({
            doctor: doctorId
        });

        if (!queue) {
            return res.status(404).json({
                success: false,
                message: "Queue not found"
            });
        }

        // Check if all patients are completed
        if (queue.currentToken >= queue.totalTokens) {
            return res.status(400).json({
                success: false,
                message: "No more patients in queue"
            });
        }

        queue.currentToken += 1;

        await queue.save();

        return res.status(200).json({
            success: true,
            message: "Next patient called successfully",
            queue
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    getQueue,
    nextToken,
};