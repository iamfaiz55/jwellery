const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    code: {
        type:String,
        required: true
    },
    expiry: {
        type:String,
        required: true
    },
    message: {
        type:String,
        required: true
    },
    message: {
        type:String,
        required: true
    },
    

}, { timestamps: true })


module.exports = mongoose.model("contact", contactSchema)