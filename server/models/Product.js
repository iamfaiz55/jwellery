const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
      name:{ type:String,required:true},
      mrp:{type:String,required:true},
      images: { type: [String], required: true },
      price:{type:String,required:true},
      discount:{type:String,required:true},
      height:{type:String,required:true},
      width:{type:String,required:true},
      prductWeight:{type:String,required:true},
      material:{type:String,enum:["gold", "diamond", "bronz", "white-gold", "rose-gold", "platinum"],required:true},
      productType:{
         type:String,
         enum:["rings", "earings", "necklace", "mangalsutra", "chain", "pendent", "nose-pin", "bangles","forehead-ornament","anklet","coins" ],
         required:true
      },
      desc:{type:String,},
      purity:{type:String},
      rating:{type:Number, default:1},
      isDelete:{
            type:Boolean,
            default: false
      },
      cloudinary_id: {
            type: [String]
      }, 
      productDetails: {
            type:String
      }, 
      specification: {
            type:String
      }, 
      freeShippingpolicy: {
            type:String
      }, 
      ratingReviews: {
            type:String
      }, 
}, {timestamps:true})

module.exports = mongoose.model("product", productSchema)