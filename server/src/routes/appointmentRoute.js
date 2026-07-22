const express = require("express");
const router = express.Router();

const {bookAppointment , getMyAppointments} = require("../controllers/appointmentController");
const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware")

router.post("/book", authMiddleware,roleMiddleware('patient'),bookAppointment);

router.get(
    "/my",
    authMiddleware,
    roleMiddleware("patient"),
    getMyAppointments
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("patient"),
    cancelAppointment
);


module.exports = router