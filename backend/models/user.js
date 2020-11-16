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
    },
    /* 1 -- Subscriber
       2 -- Web Admin
       3 -- HR
    */
    userPermission: {
        type: Number
    },
    
    certificates: [{
        pdfUrl: {
            type: String
                },
        name: {
            type: String
                },
        description: {
            type: String
        },
        status: {
            type: String
        }
        }]
});

module.exports = mongoose.model("User", User)