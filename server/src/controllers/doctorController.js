const Doctor = require("../models/Doctor");

const createDoctorProfile = async (req, res) => {
    try {

        const {
            specialization,
            qualification,
            experience,
            consultationFee,
            hospital,
            availableDays,
            availableTime
        } = req.body;

        // Validation
        if (
            !specialization ||
            !qualification ||
            !experience ||
            !consultationFee ||
            !hospital ||
            !availableDays ||
            !availableTime
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if doctor profile already exists
        const existingDoctor = await Doctor.findOne({
            user: req.user.user
        });

        if (existingDoctor) {
            return res.status(400).json({
                success: false,
                message: "Doctor profile already exists"
            });
        }

        // Create doctor profile
        const doctor = await Doctor.create({
            user: req.user.user,
            specialization,
            qualification,
            experience,
            consultationFee,
            hospital,
            availableDays,
            availableTime
        });

        return res.status(201).json({
            success: true,
            message: "Doctor profile created successfully",
            doctor
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const getAllDoctors = async (req, res) => {
    try {

        const doctors = await Doctor.find().populate(
            "user",
            "name email role"
        );

        return res.status(200).json({
            success: true,
            count: doctors.length,
            doctors,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const getDoctorById = async (req, res) => {
    try {

        const { id } = req.params;

        const doctor = await Doctor.findById(id).populate(
            "user",
            "name email role"
        );

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        return res.status(200).json({
            success: true,
            doctor
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
    createDoctorProfile , getAllDoctors ,getDoctorById
};