const mongoose = require("mongoose")

const Appointment = mongoose.Schema({
    userId: {
        type: String
    },
    dateOfAppointment: {
        type: Date
    },
    remark: {
        type: String
    },
    status: {
        type: String
    }
    
});

module.exports = mongoose.model("Appointment", Appointment)