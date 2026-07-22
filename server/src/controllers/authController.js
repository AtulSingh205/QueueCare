const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {

    // require data
    try {
        const { name, email, password , role } = req.body;
        console.log(name, email, password);

        // validate

        if (!name || !email || !password ||!role) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            })
        }
        //    check user exist or not 
        const checkexistence = await User.findOne({ email: email });

        if (checkexistence) {
            return res.status(400).json({
                success: false,
                message: "A user alredy register"
            })
        }
        // hash password
        const hashPassword = await bcrypt.hash(password, 10);
        // create user
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role : role || "patient",
        })
        // response 
        return res.status(201).json({
            success: true,
            message: "User registerd successfuly",
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            message: "Internal server error",
        })
    }
}

const loginUser = async (req, res) => {

    console.log(req.body)

    try {
        // require email,password
        const { email, password } = req.body;
        // validate 
        if (!email || !password) {
           return res.status(400).json({
                success: false,
                message: "Please enter required inputs"
            })
        }
        // check existense
        const checkexist = await User.findOne({ email });

        if (!checkexist) {
           return  res.status(400).json({
                success: false,
                message: "Invalid user or password ",
            })
        }
        //    ---------------- compare password-------------
        const comparepassword = await bcrypt.compare(password, checkexist.password);

        if (!comparepassword) {
            return res.status(400).json({
                sucess: false,
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign(
            {
                user: checkexist._id,
                role: checkexist.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )
        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message: "Internal server error"
        })
    }

}

// -----------------profile controler-------------

const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.user).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = { register , loginUser , getProfile}
