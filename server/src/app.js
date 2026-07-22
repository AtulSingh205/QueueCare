const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const appointementRoutes = require("./routes/appointmentRoute")
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes")
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth",authRoutes)
app.use("/api/appointments",appointementRoutes)
app.use("/api/doctors", doctorRoutes);
app.use("/app/patients",patientRoutes);


app.get('/',(req,res)=>{
    res.send("QueueCare API running")
})

app.get('/api/v1/health',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"QueueCare API is running"
    })
})

module.exports = app;