const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
      default:"user.png"
    },
    isBlock:{
        type:Boolean,
        defaul:false
    }

},{timestamps:true})


module.exports = mongoose.model("user", userSchema)