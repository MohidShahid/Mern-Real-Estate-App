const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URI);
       console.log("Database Connected Successfully")
    } catch (error) {
        console.log('DB Connection failed' , error)
    }
}

module.exports = connectDB;