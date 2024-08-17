const asyncHandler = require("express-async-handler")
const multer = require("multer")
const { checkEmpty } = require("../utils/checkEmpty")
const Product = require("../models/Product")
const Order = require("../models/Order")
const upload = require("../utils/upload")
const cloudinary = require("../utils/uploadCloud.config")
const User = require("../models/User")
const Carousel = require("../models/Carousel")
const Categories = require("../models/Categories")


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


    const product = await Product.findById(pUId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    upload(req, res, async err => {
        if (err) {
            return res.status(400).json({ message: "File upload failed", error: err.message });
        }

        let secure_url = product.image; 
        let public_id = product.cloudinary_id;

        if (req.files && req.files[0]) {
            const file = req.files[0];

            if (product.cloudinary_id) {
                await cloudinary.uploader.destroy(product.cloudinary_id);
            }

            const uploadResult = await cloudinary.uploader.upload(file.path);
            secure_url = uploadResult.secure_url;
            public_id = uploadResult.public_id; 
        }

        const {
            name, mrp, price, discount, height, width, prductWeight, material,
            productType, desc, purity
        } = req.body;

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
    const result = await Order.find().populate("orderItems.productId").populate("userId").populate("deliveryAddressId")
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
    res.json({message:"All Users Fetch Success", result})
})



exports.addCarousel = asyncHandler(async (req, res) => {

   
    upload(req, res, async err => {
        if (err) {
            return res.status(400).json({ message: "File upload failed", error: err.message });
        }
        const file = req.files[0]; 
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const { secure_url } = await cloudinary.uploader.upload(file.path);
        const { mainHeading, paragraph } = req.body;
        await Carousel.create({mainHeading, paragraph, image:secure_url});
        res.json({ message: "Product Carousel Success" });
    });
  
});

exports.getAllCarousels = asyncHandler(async(req, res)=> {
        const result = await Carousel.find().exec();
        const cleanResult = result.map(item => ({
            _id: item._id,
            image: item.image,
            mainHeading: item.mainHeading,
            paragraph: item.paragraph
        }));

        res.json({ message: "All Carousel Items Get Success", result: cleanResult });
})

exports.deleteCarousel = asyncHandler(async (req, res) => {
    const { id } = req.params;
        const carouselItem = await Carousel.findById(id);
        if (carouselItem.image) {
            const publicId = carouselItem.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }
        await Carousel.findByIdAndDelete(id);
        res.json({ message: 'Carousel deleted successfully' });
});

exports.updateCarousel = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        const { carouselId, mainHeading, paragraph } = req.body;

        const carouselItem = await Carousel.findById(carouselId);
        if (!carouselItem) {
            return res.status(404).json({ message: 'Carousel item not found' });
        }

        let imageUrl = carouselItem.image;

        if (req.files && req.files.length > 0) {
            const file = req.files[0];

            try {
                const publicId = carouselItem.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);

                const result = await cloudinary.uploader.upload(file.path);

                imageUrl = result.secure_url;
            } catch (error) {
                return res.status(500).json({ message: 'Failed to upload new image', error: error.message });
            }
        }

        await Carousel.findByIdAndUpdate(
            carouselId,
            { mainHeading, paragraph, image: imageUrl },
        );

        res.status(200).json({ message: 'Carousel item updated successfully', image: imageUrl });
    });
})
exports.blockUser = asyncHandler(async(req, res)=> {
  const {uId}= req.params



 const updated= await User.findByIdAndUpdate(uId, {isBlock:true})
  
  res.json({message:"User Blocked Success", result:{
    isBlock:true,
    name:updated.name,
    email:updated.email,
    _id:updated._id,
    image:updated.image,
  }})
})
exports.unblockUser = asyncHandler(async(req, res)=> {
  const {uId}= req.params  

  const updated = await User.findByIdAndUpdate(uId, {isBlock:false})
  res.json({message:"User Unblocked Success", result:{
    isBlock:false,
    name:updated.name,
    email:updated.email,
    _id:updated._id,
    image:updated.image,
  }})
})
exports.addCategory = asyncHandler(async(req, res)=> {
  await Categories.create(req.body)
  res.json({message:"Category Added Success"})
})
exports.deleteCategory = asyncHandler(async(req, res)=> {
  const {cId}= req.params  
  await Categories.findByIdAndDelete(cId)
  res.json({message:"Category Delete Success"})
})

