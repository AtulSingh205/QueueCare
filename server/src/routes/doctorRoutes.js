const express = require("express");
const router = express.Router();

const { createDoctorProfile , getAllDoctors, getDoctorById } = require("../controllers/doctorController");

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

router.get('/:id',getDoctorById)

module.exports = router;