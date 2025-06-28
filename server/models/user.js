const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
        unique: true
    },

    fname: String,
    lname: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    phoneNo: Number,
    profileImg: String,
    Image : String

})

const User = mongoose.model('User', userSchema);
module.exports = User;