const jwt = require("jsonwebtoken")


exports.userProtected = (req, res, next) => {
    const { user } = req.cookies
    if (!user) {
        return res.status(401).json({ message: "NO Cookie Found" })
    }
    jwt.verify(user, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: "JWT Error", error: err.message });
        }
        console.log(decode); // Check what decode contains
        req.loggedInUser = decode.userId;
        next();
    });
}