const mongoose = require("mongoose")

const Link = mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    HrDepartment: {
        type: String
    },
    comment: {
        type: String
    }    
});

module.exports = mongoose.model("Link", Link)