const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")
const crypto = require("crypto")

const { checkEmpty } = require("../utils/checkEmpty")
const Admin = require("../models/Admin")
const sendEmail = require("../utils/email")
const sendSms = require("../utils/sendSms")







exports.registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password , mobile} = req.body
    const { isError, error } = checkEmpty({ name, email, password, mobile })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" })
    }
    const isFound = await Admin.findOne({ email })
    if (isFound) {
        return res.status(400).json({ message: "email already registered with us" })
    }
    const hash = await bcrypt.hash(password, 10)
    await Admin.create({ name, email, password: hash , mobile})

    res.json({ message: "Register Success" })
})

exports.loginAdmin = asyncHandler(async (req, res) => {
    const { mobile } = req.body;

    const result = await Admin.findOne({ mobile });

    if (!result) {
        return res.status(401).json({ message: "Invalid number" });
    }

    const otp = crypto.randomInt(100000, 1000000);
    const message = `Your OTP is ${otp}`;

     await sendSms(message, [mobile]);

    await Admin.findByIdAndUpdate(result._id, { otp });


console.log("result data", result);

    res.json({
        message: "Credentials Verify Success. OTP sent to your registered email.",
        result: result.mobile
    });
});

exports.verifyOTP = asyncHandler(async (req, res) => {
    const { otp, mobile } = req.body
    console.log("from verify",req.body);
    const { isError, error } = checkEmpty({ mobile, otp })
    if (isError) {
        return res.status(401).json({ message: "All Fields required", error })
    }
   


    const result = await Admin.findOne({ mobile })
// console.log(result);

    if (!result) {
        return res.status(401).json({ message: "Invalid Credentials" })
    }

    if (otp != result.otp) {
        return res.status(401).json({ message: "Invalid OTP" })
    }
    const token = jwt.sign(
        { userId: result._id }, 
        process.env.JWT_KEY,
         { expiresIn: "1d" }
        )

    res.cookie("admin", token, {
        maxAge: 86400000,
        // maxAge: 60000,
        httpOnly: true,
        // sameSite: 'Lax', 
        secure: false,   

    });
 
    res.json({
        message: "OTP Verify Success.", result: {
            _id: result._id,
            name: result.name,
            email: result.email
        }
    })
})



exports.logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("admin")
    res.json({ message: "Admin Logout Success" })
})



exports.loginSocket = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const {isError, error}= checkEmpty({email, password})
    if(isError){
        return res.status(408).json({message:"all Fields required", error})
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    const isVerify = await bcrypt.compare(password, admin.password);
    if (!isVerify) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const adminSocketId = req.adminId
    console.log("socket id in coontroller",adminSocketId);
    
    // console.log(getSocketIdByAdminId);

    if (adminSocketId) {
        console.log("socket Called", adminSocketId);
        
        req.io.to(adminSocketId).emit("mobileLoginConfirmation", {
            email,
        });

        return res.json({
            message: "Waiting for mobile confirmation",
            result: { email },
        });
    }

    return res.status(401).json({ message: "Admin is not connect on mobile" });
});
