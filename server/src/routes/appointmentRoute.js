const express = require("express");
const router = express.Router();

const {bookAppointment} = require("../controllers/appointmentController");
const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware")

router.post("/book", authMiddleware,roleMiddleware('patient'),bookAppointment);

module.exports = router