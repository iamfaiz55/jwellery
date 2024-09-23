const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const { checkEmpty } = require("../utils/checkEmpty")
const User = require("../models/User")

exports.loginUser = asyncHandler(async (req, res) => {
    const { mobile } = req.body;

    const { isError, error } = checkEmpty({ mobile});
    if (isError) {
        return res.status(400).json({ message: "All Fields required", error });
    }
    let user = await User.findOne({ mobile });
    if (!user) {
      
           const otp = Math.floor(10000 + Math.random() * 900000)
        //    send otp to userr

         await User.create({mobile, otp})
           
          return res.json({ message: "OTP sent for User registration", result:  mobile  });
    } else {
        const otp = Math.floor(10000 + Math.random() * 900000)
        //    send otp to userr

        const updateUserOtp = await User.findByIdAndUpdate(user._id, {otp})

        return res.status(200).json({message: "OTP sent Success Fir Login" ,result:mobile });
    }
});

exports.verifyOTPUser = asyncHandler(async (req, res) => {
    const { otp, mobile } = req.body

    const { isError, error } = checkEmpty({ mobile, otp })
    if (isError) {
        return res.status(401).json({ message: "All Fields required", error })
    }
    const result = await User.findOne({mobile })
    if (!result) {
        return res.status(401).json({ message: "User Not Found" })
    }

    if (otp != result.otp) {
        return res.status(401).json({ message: "Invalid OTP" })
    }
    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })

    res.cookie("user", token, {
        maxAge: 86400000,
        httpOnly: true,
    });
 
    res.json({ message: "OTP Verify Success.", result:{
        mobile:result.mobile,
        _id:result._id,
        name:result && result.name &&result.name ,
        email:result && result.email &&result.email ,
        image:result && result.image&&result.image,

    }})
})


exports.logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("user")
    res.json({ message: "User Logout Success" })
})

