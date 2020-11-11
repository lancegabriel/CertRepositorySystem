const mongoose = require("mongoose")

const User = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    department: {
        type: String
    },
    fullname: {
        type: String
    }
});

module.exports = mongoose.model("User", User)