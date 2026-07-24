const express = require("express");
const router = express.Router();

const {
    getCurrentQueue,
    nextToken,
    getQueue
} = require("../controllers/queueController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Get Current Queue
router.get(
    "/current/:doctorId",
    authMiddleware,
    getCurrentQueue
);

// Next Token (Doctor Only)
router.put(
    "/next/:doctorId",
    authMiddleware,
    roleMiddleware("doctor"),
    nextToken
);

router.get("/:doctorId",getQueue);

module.exports = router;