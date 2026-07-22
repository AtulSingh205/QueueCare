require('dotenv').config();



const app = require("./app")

const connectDb = require('./config/db');

// console.log(process.env.MONGO_URI);


const PORT = process.env.PORT || 5000;

connectDb();

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})

