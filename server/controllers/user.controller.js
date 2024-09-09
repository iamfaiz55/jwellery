const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/checkEmpty")
const Order = require("../models/Order")
const UserAddress = require("../models/UserAddress")
const Product = require("../models/Product")
const Cart = require("../models/Cart")
const User = require("../models/User")
const upload = require("../utils/upload")
const cloudinary = require("../utils/uploadCloud.config")
const Liked = require("../models/Liked")
const Categories = require("../models/Categories")
const Contact = require("../models/Contact")
require("dotenv").config({path:""})
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { v4: uuid } = require("uuid");
const sendEmail = require("../utils/email")
const PDFDocument = require('pdfkit-table');
// require('pdfkit-table');
const fs = require('fs');
const path = require('path');
const mongoose= require("mongoose")
const CompanyAddress = require("../models/CompanyAddress")
const Tax = require("../models/Tax")

// const { payment } = require("..")
// const Liked = require("../models/Liked")

// const Ordre = require("../models/Ordre")

exports.getOrders = asyncHandler(async(req, res)=> {
const {userId}=req.params
    const result = await Order.find({userId}).populate("orderItems.productId")
    // console.log(result, userId);
    
    res.json({message:"All Orders Fetch Success", result})
}) 


exports.createOrder = asyncHandler(async (req, res) => {
    const { deliveryAddressId, paymentMethod, orderItems, subtotal, userId } = req.body;

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
    });

    const userData = await User.findById(userId);
    const deliveryAddressData = await UserAddress.findById(deliveryAddressId);
    const companyAddressData = await CompanyAddress.findOne(); // Fetch company address
// console.log(companyAddressData);

    const productDetails = await getProductDetails(orderItems);
// console.log(productDetails);

    const pdfPath = path.join(__dirname, '../pdfs', `OrderDetails-${uuid()}.pdf`);
    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(20).text('Order Invoice', { align: 'center' });
    doc.moveDown(1.5);

    doc.fontSize(14).text('Delivery Address:', { align: 'left', underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`${userData.name}`);
    doc.text(`${deliveryAddressData.addressType}, ${deliveryAddressData.city}`);
    doc.text(`${deliveryAddressData.state}, ${deliveryAddressData.country}, ${deliveryAddressData.pincode}`);
    doc.text(`Mobile: ${deliveryAddressData.mobile}`);
    doc.moveDown(1.5);

    doc.fontSize(14).text('Company Address:', { align: 'left', underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`${companyAddressData.buildingNo}`);
    doc.text(`${companyAddressData.city}`);
    doc.text(`${companyAddressData.state}, ${companyAddressData.country}, ${companyAddressData.pincode}`);
    doc.text(`GST No: ${companyAddressData.gst}`);
    doc.moveDown(1.5);

    doc.fontSize(14).text('Order Information:', { align: 'left', underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Payment Method: ${order.paymentMethod}`);
    doc.text(`Order Status: ${order.status}`);
    doc.moveDown(2);

    doc.fontSize(14).text('Product Details:', { align: 'left', underline: true });
    doc.moveDown(0.5);

    const tableData = {
        headers: ['Product Name', 'Quantity', 'Material', 'Dimensions', 'Weight', 'Purity', 'Description', 'Price', 'Total'],
        rows: productDetails.map(item => {
            const product = item.product;
            return [
                product.name,
                item.quantity,
                product.material,
                `${product.height} x ${product.width}`,
                product.prductWeight,
                product.purity,
                product.desc,
                product.price,
                product.price * item.quantity,
            ];
        }),
    };

    doc.table(tableData, {
        prepareHeader: () => doc.fontSize(12).font('Helvetica-Bold').fillColor('black'),
        prepareRow: (row, i) => doc.fontSize(10).font('Helvetica').fillColor(i % 2 === 0 ? 'black' : 'gray'),
    });

    doc.moveDown(1.5);

    // Total Items and Price
    doc.fontSize(14).text(`Total Items: ${orderItems.length}`, { align: 'right' });
    doc.text(`Total Price: ₹${subtotal}`, { align: 'right' });
    doc.moveDown(2);

    // Thank You Message
    doc.fontSize(16).text('Thank you for shopping with us!', { align: 'center' });
    doc.fontSize(14).text('We hope to see you again soon!', { align: 'center' });

    doc.end();

    doc.on('end', async () => {
        const emailSent = await sendEmail({
            to: userData.email,
            subject: 'Your Order Receipt',
            message: '<p>Thank you for your order. Please find the attached receipt for your records.</p>',
            attachments: [
                {
                    filename: path.basename(pdfPath),
                    path: pdfPath,
                },
            ],
        });

        if (emailSent) {
            console.log('Email sent successfully.');
        } else {
            console.log('Failed to send email.');
        }
    });

    res.status(201).json({ message: "Order created successfully and PDF sent to email." });
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

    res.json({ message: 'Cart Add successfully' });
});
exports.like = asyncHandler(async (req, res) => {
    const { pId, uId } = req.body;
console.log(req.body);

    let result = await Liked.findOne({ userId: uId, productId: pId });

    if (result) {
     return res.status(400).json({message:" This Product is AlReady In Liked "})
    } else {
       await Liked.create({userId:uId, productId:pId})
    }

    res.json({ message: 'Liked successfully' });
});
exports.deleteLiked = asyncHandler(async (req, res) => {
    const {id} = req.params;
// console.log(req.body);

  await Liked.findByIdAndDelete(id)

    res.json({ message: 'product Deleted From Liked  ' });
});
exports.getAllLiked = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    console.log(uid);
    
    const result = await Liked.find({ userId: uid }).populate("productId")
    // console.log();
    
    res.json({ message: 'Liked Items Get Success', result });
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

 

    const result = await Categories.find()
//    console.log(result);
      const types = result.map(item => {
          return item.category
      })
    //   console.log(types);
        if (!types.includes(productType)) {
        return res.status(400).json({ message: "Invalid product type" });
    }
   
        const products = await Product.find({ productType });

        res.status(200).json({message:"filter Success", result:products});
 
});



exports.updateProfile = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error uploading file' });
        }
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
            if (user.image) {
                const existing = user.image.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(existing);
            }  
        const {secure_url} = await cloudinary.uploader.upload(req.files[0].path);
        // console.log(req.body.userId);
        
       const updated = await User.findByIdAndUpdate(req.body.userId, {image:secure_url})
    //    console.log(updated);
       
        res.json({ message: "Profile image upload successfully", result:{
            name:updated.name,
            email:updated.email,
            _id:updated._id,
            image:secure_url,
            isBlock:updated.isBlock
        } });
    });
});

exports.getAllCategory = asyncHandler(async(req, res)=> {
    //   const {cId}= req.params  
      const result = await Categories.find()
      res.json({message:"Categories Get Success", result })
    })



exports.contact = asyncHandler(async(req, res)=> {
    const {name, email, subject, message} = req.body
    const {isError, error}= checkEmpty({name, email, subject, message})
    
    if(isError){
        return res.status(400).json({message :"All Fields Required"})
    }
    await Contact.create({name, email, message, subject})

    res.json({message:"Message Sent Success"})
})

exports.getContacts = asyncHandler(async(req, res)=> {
    // const {name, email, subject, message} = req.body
  
    const result = await Contact.find()

    res.json({message:"Messages Get Success", result})
})

const razorpay = new Razorpay({
    key_id:"rzp_test_8g7frJOzzN5wml",
    key_secret:"TmMcFsowpC7bQCKy5wedym1W"
})
exports.razorpay = asyncHandler(async (req, res) => {

       if(!req.body){
           return res.status(400).json({message:"body me nhi aaya"})
        }
    const options = {amount:req.body.subtotal *100, receipt:req.body.receipt, currency:req.body.currency}
    const order = await razorpay.orders.create(options)
    res.json({message:"initiate ", result:order})
});


const getProductDetails = async (orderItems) => {
    // Use Promise.all to fetch details concurrently
    const productDetails = await Promise.all(orderItems.map(async (item) => {
      try {
        const product = await Product.findById(new mongoose.Types.ObjectId(item._id)); // Correctly instantiate ObjectId
        if (!product) {
          console.error(`Product not found for productId: ${item._id}`);
          return null; // Or handle missing products as needed
        }
        return {
          ...item,
          product
        };
      } catch (error) {
        console.error(`Error fetching product for productId: ${item._id}`, error);
        return null; // Handle errors gracefully
      }
    }));
  
    return productDetails.filter(detail => detail !== null); // Filter out any null results
  };
  exports.verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, deliveryAddressId, paymentMethod, orderItems, userId } = req.body;

    const productDetails = await getProductDetails(orderItems);
    const userData = await User.findById(userId);
    const deliveryAddressData = await UserAddress.findById(deliveryAddressId);
    const companyAddressData = await CompanyAddress.findOne();
    const taxes = await Tax.find();

    // Calculate subtotal
    const subtotal = productDetails.reduce((tot, item) => {
        return tot + (item.product.price * item.quantity);
    }, 0);

    // Calculate taxes and discount
    const salesTax = taxes.find(tax => tax.taxName === "Sales Tax")?.percent || 0;
    const makingCharges = taxes.find(tax => tax.taxName === "Making Charges")?.percent || 0;
    const discount = taxes.find(tax => tax.taxName === "Discount")?.percent || 0;

    // Apply taxes and discount
    const salesTaxAmount = (salesTax / 100) * subtotal;
    const makingChargesAmount = (makingCharges / 100) * subtotal;
    const discountAmount = (discount / 100) * subtotal;
    const total = subtotal + salesTaxAmount + makingChargesAmount - discountAmount;

    const OrderItems2 = orderItems.map(item => ({
        productId: item._id,
        quantity: item.quantity || 1,
    }));

    const newOrder = await Order.create({
        userId,
        deliveryAddressId,
        paymentMethod,
        orderItems: OrderItems2,
        total,
        razorpay_payment_id,
        razorpay_order_id,
    });

    await razorpay.orders.create({
        amount: total * 100,
        currency: "INR",
        receipt: uuid(),
    });

    const pdfPath = path.join(__dirname, '../pdfs', `OrderDetails-${uuid()}.pdf`);
    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(fs.createWriteStream(pdfPath));
    
    // Title
    doc.fontSize(20).text('Order Invoice', { align: 'center' });
    doc.moveDown(1.5);
    
    // Define initial X and Y positions for three-column layout
    const startY = doc.y;  // Start Y position for all columns
    const columnWidth = 180;  // Width for each column
    const gap = 20;  // Gap between columns
    
    // Company Address Column
    const companyAddressX = 50;  // X position for Company Address
    doc.fontSize(14).text('Company Address:', companyAddressX, startY, { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`${companyAddressData.buildingNo}`, companyAddressX, doc.y);
    doc.text(`${companyAddressData.city}`, companyAddressX, doc.y);
    doc.text(`${companyAddressData.state}, ${companyAddressData.country}, ${companyAddressData.pincode}`, companyAddressX, doc.y);
    doc.text(`GST No: ${companyAddressData.gst}`, companyAddressX, doc.y);
    
    // Delivery Address Column
    const deliveryAddressX = companyAddressX + columnWidth + gap;  // X position for Delivery Address
    doc.fontSize(14).text('Delivery Address:', deliveryAddressX, startY, { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`${userData.name}`, deliveryAddressX, doc.y);
    doc.text(`${deliveryAddressData.addressType}, ${deliveryAddressData.city}`, deliveryAddressX, doc.y);
    doc.text(`${deliveryAddressData.state}, ${deliveryAddressData.country}, ${deliveryAddressData.pincode}`, deliveryAddressX, doc.y);
    doc.text(`Mobile: ${deliveryAddressData.mobile}`, deliveryAddressX, doc.y);
    
    // Order Information Column
    const orderInfoX = deliveryAddressX + columnWidth + gap;  // X position for Order Information
    doc.fontSize(14).text('Order Information:', orderInfoX, startY, { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Order ID: ${newOrder.razorpay_order_id}`, orderInfoX, doc.y);
    doc.text(`Payment ID: ${newOrder.razorpay_payment_id}`, orderInfoX, doc.y);
    doc.text(`Payment Method: ${newOrder.paymentMethod}`, orderInfoX, doc.y);
    doc.text(`Order Status: ${newOrder.status}`, orderInfoX, doc.y);
    
    // Reset the X position and move down to start the table on a new line
    doc.moveDown(2);
    doc.text('', 50, doc.y);  // Ensure to reset X position before drawing the table
    
    // Product Table - Start after moving to a new line
    doc.fontSize(14).text('Product Details:', { align: 'left', underline: true });
    doc.moveDown(0.5);
    
    const tableData = {
        headers: ['Name', 'Qty', 'Material', 'Dimensions', 'Weight', 'Purity', 'Desc', 'Price', 'Total'],
        rows: productDetails.map(item => {
            const product = item.product;
            return [
                product.name,
                item.quantity,
                product.material,
                `${product.height} x ${product.width}`,
                product.productWeight,
                product.purity,
                product.desc,
                product.price,
                product.price * item.quantity,
            ];
        }),
    };
    
    doc.table(tableData, {
        prepareHeader: () => doc.fontSize(12).font('Helvetica-Bold').fillColor('black'),
        prepareRow: (row, i) => doc.fontSize(10).font('Helvetica').fillColor(i % 2 === 0 ? 'black' : 'gray'),
    });
    
    doc.moveDown(1.5);
    
    // Display Taxes, Discounts, and Totals
    doc.fontSize(14).text(`Subtotal: ₹${subtotal.toFixed(2)}`, { align: 'right' });
    doc.text(`Sales Tax (${salesTax}%): ₹${salesTaxAmount.toFixed(2)}`, { align: 'right' });
    doc.text(`Making Charges (${makingCharges}%): ₹${makingChargesAmount.toFixed(2)}`, { align: 'right' });
    doc.text(`Discount (${discount}%): -₹${discountAmount.toFixed(2)}`, { align: 'right' });
    doc.text(`Total Items: ${orderItems.length}`, { align: 'right' });
    doc.text(`Total Price: ₹${total.toFixed(2)}`, { align: 'right' });
    doc.moveDown(2); // Move down for some spacing before the thank you note
    
    // Center "Thank you for shopping with us!" text
    doc.fontSize(16).text('Thank you for shopping with us!', {
        align: 'center',  // Center align
        continued: false,  // End the current text block
    });
    
    // Center "We hope to see you again soon!" text
    doc.fontSize(14).text('We hope to see you again soon!', {
        align: 'center',  // Center align
        continued: false,  // End the current text block
    });
    
    doc.end();
    
    // Email Sending and Response
    doc.on('end', async () => {
        const emailSent = await sendEmail({
            to: userData.email,
            subject: 'Your Order Receipt',
            message: '<p>Thank you for your order. Please find the attached receipt for your records.</p>',
            attachments: [
                {
                    filename: path.basename(pdfPath),
                    path: pdfPath,
                },
            ],
        });
    
        if (emailSent) {
            console.log('Email sent successfully.');
        } else {
            console.log('Failed to send email.');
        }
    });
    
    res.json({ message: "Payment verified, order successful, and receipt sent on email." });
});



//   exports.verifyPayment = asyncHandler(async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, deliveryAddressId, paymentMethod, orderItems, userId } = req.body;

//     const productDetails = await getProductDetails(orderItems);
//     const userData = await User.findById(userId);
//     const deliveryAddressData = await UserAddress.findById(deliveryAddressId);
//     const companyAddressData = await CompanyAddress.findOne();
//     const taxes = await Tax.find();

//     // Calculate subtotal
//     const subtotal = productDetails.reduce((tot, item) => {
//         return tot + (item.product.price * item.quantity);
//     }, 0);

//     // Calculate taxes and discount
//     const salesTax = taxes.find(tax => tax.taxName === "Sales Tax")?.percent || 0;
//     const makingCharges = taxes.find(tax => tax.taxName === "Making Charges")?.percent || 0;
//     const discount = taxes.find(tax => tax.taxName === "Discount")?.percent || 0;

//     // Apply taxes and discount
//     const salesTaxAmount = (salesTax / 100) * subtotal;
//     const makingChargesAmount = (makingCharges / 100) * subtotal;
//     const discountAmount = (discount / 100) * subtotal;
//     const total = subtotal + salesTaxAmount + makingChargesAmount - discountAmount;

//     const OrderItems2 = orderItems.map(item => ({
//         productId: item._id,
//         quantity: item.quantity || 1,
//     }));

//     const newOrder = await Order.create({
//         userId,
//         deliveryAddressId,
//         paymentMethod,
//         orderItems: OrderItems2,
//         total,
//         razorpay_payment_id,
//         razorpay_order_id,
//     });

//     await razorpay.orders.create({
//         amount: total * 100,
//         currency: "INR",
//         receipt: uuid(),
//     });

//     const pdfPath = path.join(__dirname, '../pdfs', `OrderDetails-${uuid()}.pdf`);
//     const doc = new PDFDocument({ margin: 50 });
//     doc.pipe(fs.createWriteStream(pdfPath));

//     // Company Address
//     doc.fontSize(20).text('Order Invoice', { align: 'center' });
//     doc.moveDown(1.5);
//     doc.fontSize(14).text('Company Address:', { align: 'left', underline: true });
//     doc.moveDown(0.5);
//     doc.fontSize(12).text(`${companyAddressData.buildingNo}`);
//     doc.text(`${companyAddressData.city}`);
//     doc.text(`${companyAddressData.state}, ${companyAddressData.country}, ${companyAddressData.pincode}`);
//     doc.text(`GST No: ${companyAddressData.gst}`);
//     doc.moveDown(1.5);

//     doc.fontSize(14).text('Delivery Address:', { align: 'left', underline: true });
//     doc.moveDown(0.5);
//     doc.fontSize(12).text(`${userData.name}`);
//     doc.text(`${deliveryAddressData.addressType}, ${deliveryAddressData.city}`);
//     doc.text(`${deliveryAddressData.state}, ${deliveryAddressData.country}, ${deliveryAddressData.pincode}`);
//     doc.text(`Mobile: ${deliveryAddressData.mobile}`);
//     doc.moveDown(1.5);

//     doc.fontSize(14).text('Order Information:', { align: 'left', underline: true });
//     doc.moveDown(0.5);
//     doc.fontSize(12).text(`Order ID: ${newOrder.razorpay_order_id}`);
//     doc.text(`Payment ID: ${newOrder.razorpay_payment_id}`);
//     doc.text(`Payment Method: ${newOrder.paymentMethod}`);
//     doc.text(`Order Status: ${newOrder.status}`);
//     doc.moveDown(2);

 
//     // //////////////////
// //   //////////////////
//     doc.moveDown(2);

//     doc.fontSize(16).text('Thank you for shopping with us!', { align: 'center' });
//     doc.fontSize(14).text('We hope to see you again soon!', { align: 'center' });

//     doc.end();

//     doc.on('end', async () => {
//         const emailSent = await sendEmail({
//             to: userData.email,
//             subject: 'Your Order Receipt',
//             message: '<p>Thank you for your order. Please find the attached receipt for your records.</p>',
//             attachments: [
//                 {
//                     filename: path.basename(pdfPath),
//                     path: pdfPath,
//                 },
//             ],
//         });

//         if (emailSent) {
//             console.log('Email sent successfully.');
//         } else {
//             console.log('Failed to send email.');
//         }
//     });

//     res.json({ message: "Payment verified, order successful, and receipt sent on email." });
// });


  // doc.fontSize(14).text('Product Details:', { align: 'left', underline: true });
    // doc.moveDown(0.5);

    // const tableData = {
    //     headers: ['Name', 'Qty', 'Material', 'Dimensions', 'Weight', 'Purity', 'Desc', 'Price', 'Total'],
    //     rows: productDetails.map(item => {
    //         const product = item.product;
    //         return [
    //             product.name,
    //             item.quantity,
    //             product.material,
    //             `${product.height} x ${product.width}`,
    //             product.productWeight,
    //             product.purity,
    //             product.desc,
    //             product.price,
    //             product.price * item.quantity,
    //         ];
    //     }),
    // };

    // doc.table(tableData, {
    //     prepareHeader: () => doc.fontSize(12).font('Helvetica-Bold').fillColor('black'),
    //     prepareRow: (row, i) => doc.fontSize(10).font('Helvetica').fillColor(i % 2 === 0 ? 'black' : 'gray'),
    // });

    // doc.moveDown(1.5);

    // // Display Taxes, Discounts, and Totals
    // doc.fontSize(14).text(`Subtotal: ₹${subtotal.toFixed(2)}`, { align: 'right' });
    // doc.text(`Sales Tax (${salesTax}%): ₹${salesTaxAmount.toFixed(2)}`, { align: 'right' });
    // doc.text(`Making Charges (${makingCharges}%): ₹${makingChargesAmount.toFixed(2)}`, { align: 'right' });
    // doc.text(`Discount (${discount}%): -₹${discountAmount.toFixed(2)}`, { align: 'right' });
    // doc.text(`Total Items: ${orderItems.length}`, { align: 'right' });
    // doc.text(`Total Price: ₹${total.toFixed(2)}`, { align: 'right' });