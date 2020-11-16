const mongoose = require("mongoose")

const Appointment = mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    dateOfAppointment: {
        type: Date
    },
    location: {

    },
    remark: {
        type: String
    },
    status: {
        type: String
    }
    
});

module.exports = mongoose.model("Appointment", Appointment)