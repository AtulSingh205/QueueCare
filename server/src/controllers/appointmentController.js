const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

const bookAppointment = async (req, res) => {
    try {

        const { doctorId, appointmentDate, appointmentTime, reason } = req.body;

        if (!doctorId || !appointmentDate || !appointmentTime || !reason) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const logggedInPatient = await Patient.findOne({ user: req.user.user });

        if (!logggedInPatient) {
            return res.status(404).json({
                success: false,
                message: "Patient Profile not found"
            })
        }

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        const lastAppointment = await Appointment.findOne({
            doctor: doctorId,
            appointmentDate,
        }).sort({ tokenNumber: -1 });

        
        const tokenNumber = lastAppointment
            ? lastAppointment.tokenNumber + 1
            : 1;


        const appointment = await Appointment.create({
            patient: logggedInPatient._id,
            doctor: doctor._id,
            appointmentDate,
            appointmentTime,
            reason,
            tokenNumber,
        })

        return res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointement,
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    bookAppointment
};