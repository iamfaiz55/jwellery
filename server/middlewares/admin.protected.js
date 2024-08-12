const jwt = require("jsonwebtoken")


exports.adminProtected = (req, res, next) => {
    const { admin } = req.cookies
    if (!admin) {
        return res.status(401).json({ message: "NO Cookie Found" })
    }
    jwt.verify(admin, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: "JWT Error", error: err.message })
        }
        req.loggedInadmin = decode.adminId
        next()
   })
}
