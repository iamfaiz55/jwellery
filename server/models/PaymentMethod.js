const mongoose = require("mongoose")

const paymentMethodSchema = new mongoose.Schema({
    method: {
        type:String,

    },
    active: {
        type:Boolean,
        default:true
    },


}, { timestamps: true })


module.exports = mongoose.model("paymentMethod", paymentMethodSchema)