const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },

    specialization:{
        type:String,
        required:true, 
    },

    qualification:{
        type:String,
        required:true,
    },

    experience:{
       type:Number,
       required:true,
    },

    consultationFee:{
        type:Number,
        required:true
    },

    hospital:{
        type:String,
        required:true
    },

    availableDays:[{
        type:String,
        enum:[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "friday",
            "Saturday",
            "Sunday"
        ]
    }],
    
    availableTime:{
        start:{
            type:String,
            required:true
        },
        end:{
            type:String,
            required:true
        }
    },

    isAvailable:{
        type:Boolean,
        default:true
    }

},{timestamps:true});

module.exports  = mongoose.model("Doctor",doctorSchema)