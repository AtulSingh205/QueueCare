const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Queue = require("../models/Queue");


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
        // Update Queue
        const queue = await Queue.findOne({
            doctor: doctor._id,
        });

        if (queue) {
            queue.totalTokens += 1;
            await queue.save();
        }

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


const getMyAppointments = async (req, res) => {
    try {

        // Find logged-in patient
        const patient = await Patient.findOne({
            user: req.user.user
        });

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient profile not found"
            });
        }

        // Get all appointments
        const appointments = await Appointment.find({
            patient: patient._id
        })
            .populate("doctor")
            .sort({ appointmentDate: -1 });

        return res.status(200).json({
            success: true,
            count: appointments.length,
            appointments
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const cancelAppointment = async (req, res) => {
    try {

        const { id } = req.params;

        // Find logged-in patient
        const patient = await Patient.findOne({
            user: req.user.user
        });

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient profile not found"
            });
        }

        // Find appointment
        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        // Check ownership
        if (appointment.patient.toString() !== patient._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to cancel this appointment"
            });
        }

        // Delete appointment
        await Appointment.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully"
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
    bookAppointment,
    getMyAppointments,
    cancelAppointment
};