const express = require("express");
const router = express.Router();

const { createDoctorProfile , getAllDoctors } = require("../controllers/doctorController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");


// Create Doctor Profile
router.post(
    "/profile",
    authMiddleware,
    roleMiddleware("doctor"),
    createDoctorProfile
);

router.get("/", getAllDoctors);

module.exports = router;