const mongoose = require('mongoose');


    const connectDB = async ()=>{
        try{
            await mongoose.connect(process.env.MONGO_URI);

            console.log("Mongodb connected sucessfully");
        }catch(error){
            console.error("Mongodb not connected ");
            console.error(error.message);

            process.exit(1);
        }
    }


module.exports = connectDB;
