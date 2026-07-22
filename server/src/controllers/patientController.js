const Patient = require("../models/Patient");

const createPatientProfile = async (req, res) => {
    try {

        const {
            age,
            gender,
            phone,
            address,
            bloodGroup,
            emergencyContact,
            medicalHistory
        } = req.body;

        // Validation
        if (!age || !gender || !phone || !address) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });
        }

        // Check existing profile
        const existingPatient = await Patient.findOne({
            user: req.user.user
        });

        if (existingPatient) {
            return res.status(400).json({
                success: false,
                message: "Patient profile already exists"
            });
        }

        // Create profile
        const patient = await Patient.create({
            user: req.user.user,
            age,
            gender,
            phone,
            address,
            bloodGroup,
            emergencyContact,
            medicalHistory
        });

        return res.status(201).json({
            success: true,
            message: "Patient profile created successfully",
            patient
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
    createPatientProfile
};