const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/checkEmpty")
const Order = require("../models/Order")
const UserAddress = require("../models/UserAddress")
const Product = require("../models/Product")
const Cart = require("../models/Cart")
// const Ordre = require("../models/Ordre")

exports.getOrders = asyncHandler(async(req, res)=> {
const {userId}=req.params
    const result = await Order.find({userId}).populate("orderItems.productId")
    // console.log(result, userId);
    
    res.json({message:"All Orders Fetch Success", result})
}) 

exports.createOrder = asyncHandler(async (req, res) => {
    const { cardDetails, deliveryAddressId, paymentMethod, orderItems, subtotal, userId } = req.body;
    
    // console.log(req.body);
    
    const orderItems1 = orderItems.map(item => ({
        productId: item._id, 
        quantity: item.quantity || 1
    }));
    
    const order = await Order.create({
        userId,
        deliveryAddressId,
        paymentMethod,
        orderItems: orderItems1,
        total: subtotal,
        cardDetails: paymentMethod === 'card' ? cardDetails : undefined,
    });

    res.status(201).json({ message: "Order created successfully" });
});


exports.addAddress = asyncHandler(async(req, res)=> {
    const {
        pincode,
        city,
        state,
        // pincode,
        country,
        addressType,
        mobile,
        userId
    }=req.body

    const {isError, error}= checkEmpty({pincode,
        city,
        state,
        country,
        pincode,
        addressType,
        mobile,  userId})

        if(isError){
            return res.status(400).json({message :"All Fields Required"})
        }

        await UserAddress.create({ city,
            state,
            pincode,
            country,
            addressType,
            mobile,
            userId})
        // console.log(req.loggedInUser);
        

            res.json({message:"Address Create Success"})
})

exports.getAddresses = asyncHandler(async(req, res)=> {
    const {id} = req.params
    const result = await UserAddress.find({userId:id})
    // if(!result){
    //     return res.json({message : "No Address"})
    // }
    // console.log(result, id);
    
    res.json({message:"All Addresses Fetch Success", result})
})
exports.getDetails = asyncHandler(async(req, res)=>{
    const {pId}= req.params
    const result = await Product.findOne({_id:pId})
    res.json({message:"Details Fetch Success", result})
})




exports.addCart = asyncHandler(async (req, res) => {
    const { pId, uId } = req.body;
// console.log(req.body);

    let result = await Cart.findOne({ userId: uId, productId: pId });

    if (result) {
       await Cart.findByIdAndUpdate(
            result._id,
            { $inc: { quantity: 1 } }
        );
    } else {
       await Cart.create({userId:uId, productId:pId, quantity:1})
    }

    res.json({ message: 'Cart updated successfully' });
});

exports.getAllCartItems = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    const result = await Cart.find({ userId: uid }).populate("productId")
    res.json({ message: 'Cart Items Get Success', result });
});

 
exports.deleteItemFromCart = asyncHandler(async(req, res)=> {
    const {id}=req.params
    await Cart.findByIdAndDelete(id)
    res.json({message:"Cart Iterm Delete Success"})
})


exports.deleteAllCart = asyncHandler(async(req, res)=> {
    const {userId}= req.body
     await Cart.deleteMany({ userId} );


    res.status(200).json({ message: "All cart items deleted successfully" });
})
exports.getAllProduct = asyncHandler(async(req, res)=> {
    const result = await Product.find()

    res.json({message:"All Products Fetch Success", result})
})

exports.cancelOrder = asyncHandler(async(req, res)=> {
    const {id}= req.params
    await Order.findByIdAndUpdate(id, {status:"cancelled"})
    res.json({message:"Order Cancel Success"})
})

exports.getFilteredProducts = asyncHandler(async (req, res) => {
    const { productType } = req.query;

 
    const validProductTypes = [
        "rings", "earings", "necklace", "mangalsutra", "chain", "pendant", 
        "nose-pin", "bangles", "forehead-ornament", "anklet", "coins"
    ];
    if (!validProductTypes.includes(productType)) {
        return res.status(400).json({ message: "Invalid product type" });
    }

   
        const products = await Product.find({ productType });

        res.status(200).json({message:"filter Success", result:products});
 
});