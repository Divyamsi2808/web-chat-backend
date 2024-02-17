const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required:[true, "please enter your username"],
    },
    name: {
        firstname: { 
            type: String,
            required: [true, "Please provide the first name"],
        },
        lastname: { 
            type: String,
            required: [true, "Please provide the last name"],
        },
    },
    email: {
        type: String,
        required: [true, "Please provide the email"],
    },
    phone: {
        type: String,
        required: [true, "Please provide the mobile number"],
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
