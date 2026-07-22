const express = require("express");
const router = express.Router();

const { createDoctorProfile } = require("../controllers/doctorController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");


// Create Doctor Profile
router.post(
    "/profile",
    authMiddleware,
    roleMiddleware("doctor"),
    createDoctorProfile
);

module.exports = router;