const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieparser = require("cookie-parser")
const { adminProtected } = require("./middlewares/admin.protected")
require("dotenv").config()

// Admin.find().then()

mongoose.connect(process.env.MONGO_URL)
const app = express()
app.use(express.json())
app.use(express.static("dist"))


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieparser())


app.use("/api/adminAuth" ,require("./routers/admin.auth.routes"))
app.use("/api/userAuth" ,require("./routers/user.auth.routes"))
app.use("/api/admin",adminProtected ,require("./routers/admin.routes"))
app.use("/api/user", require("./routers/user.routes"))

app.use("*", (req, res)=> {
    // res.sendFile(path.join(__dirname,"dist","index.html"))

    res.status(404).json({message:"Resoure Not Found"})
})

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(500).json({message:"Something went wrong"})
})

mongoose.connection.once("open", ()=>{
    console.log("MONGO CONNECTED");
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})