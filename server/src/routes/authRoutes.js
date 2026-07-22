const express = require("express");

const router = express.Router();

const {register, loginUser, getProfile} = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register",register);

router.post("/login",loginUser);


router.get("/profile",authMiddleware,getProfile)

module.exports = router;