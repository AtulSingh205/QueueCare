const express = require("express");
const router = express.Router();

const { createPatientProfile } = require("../controllers/patientController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Create Patient Profile
router.post(
    "/profile",
    authMiddleware,
    roleMiddleware("patient"),
    createPatientProfile
);

module.exports = router;