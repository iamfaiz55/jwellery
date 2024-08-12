const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/checkEmpty")
const Product = require("../models/Product")
const Order = require("../models/Order")
const upload = require("../utils/upload")
const cloudinary = require("../utils/uploadCloud.config")
const User = require("../models/User")
exports.addProduct = asyncHandler(async (req, res) => {
    console.log(req.body);
    
    upload(req, res, async err => {
        if (err) {
            return res.status(400).json({ message: "File upload failed", error: err.message });
        }

        // Ensure you're accessing the correct field
        const file = req.files[0]; // Use req.files if you are using array or req.file if single file upload

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { secure_url } = await cloudinary.uploader.upload(file.path);
        
        // Process other form data
        const { name, mrp, price, discount, height, width, prductWeight, material, productType, desc, purity } = req.body;

       
            
        
        await Product.create({
            name,
            mrp,
            image: secure_url,
            price,
            discount,
            height,
            width,
            prductWeight,
            material,
            productType,
            desc,
            purity,
        });

        res.json({ message: "Product Add Success" });
    });
});




exports.updateProduct = asyncHandler(async (req, res) => {
    const { pUId } = req.params;

    // Find the product by ID
    const product = await Product.findById(pUId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Handle file upload if a new image is provided
    upload(req, res, async err => {
        if (err) {
            return res.status(400).json({ message: "File upload failed", error: err.message });
        }

        let secure_url = product.image; 
        let public_id = product.cloudinary_id;

        if (req.files && req.files[0]) {
            const file = req.files[0];

            // Delete the old image from Cloudinary
            if (product.cloudinary_id) {
                await cloudinary.uploader.destroy(product.cloudinary_id);
            }

            // Upload the new image to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(file.path);
            secure_url = uploadResult.secure_url;
            public_id = uploadResult.public_id; // Store the new public_id
        }

        // Extract the product details from the request body
        const {
            name, mrp, price, discount, height, width, prductWeight, material,
            productType, desc, purity
        } = req.body;

        // Update the product in the database
        const updatedProduct = await Product.findByIdAndUpdate(
            pUId,
            {
                name,
                mrp,
                image: secure_url,
                cloudinary_id: public_id,
                price,
                discount,
                height,
                width,
                prductWeight,
                material,
                productType,
                desc,
                purity,
            },
            { new: true } // Return the updated document
        );

        res.json({ message: "Product updated successfully", updatedProduct });
    });
});


exports.deleteProduct = asyncHandler(async(req, res)=> {
    const {pDId}= req.params
    await Product.findByIdAndUpdate(pDId, {isDelete:true})
    res.json({message:"Product Delete Success"})
})


exports.getAllOrders = asyncHandler(async(req, res)=> {
    const result = await Order.find().populate("orderItems.productId").populate("userId")
    res.json({message:"All Orders Fetch Success", result})
})

exports.updateOrderStatus =asyncHandler(async(req, res)=> {
    const {status, orderId}= req.body
    const {isError, error}= checkEmpty({status, orderId})

    if(isError){
        return res.status(400).json({message:"All Fields Required", error})
    }

    await Order.findByIdAndUpdate(orderId, {status})
    res.json({message:"Order Update Success"})
})

exports.addEvenOffers = asyncHandler(async(req, res)=> {
    const {image, offPercents} = req.body

})

exports.getAllUsers = asyncHandler(async(req, res)=> {
    const result = await User.find()
    res.json({message:"All Users Fetch Success"})
})
