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

module.exports = {
    createDoctorProfile
};