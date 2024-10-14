const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const useragent = require('express-useragent'); 
const { adminProtected } = require("./middlewares/admin.protected");
const { userProtected } = require("./middlewares/userProtected");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static("dist"));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieparser());
app.use(useragent.express()); 

const importantLogFormat = ':method :url :status :response-time ms';
const mobileLogPath = path.join(__dirname, 'logs', 'mobile.log');
const computerLogPath = path.join(__dirname, 'logs', 'computer.log');
const mobileLogStream = fs.createWriteStream(mobileLogPath, { flags: 'a' });
const computerLogStream = fs.createWriteStream(computerLogPath, { flags: 'a' });

app.use((req, res, next) => {
    const userAgent = req.useragent;
    const logStream = (userAgent.isMobile || userAgent.isTablet) ? mobileLogStream : computerLogStream;

    morgan(importantLogFormat, { stream: logStream })(req, res, next);
});

app.use(morgan('dev'));

app.use("/api/adminAuth", require("./routers/admin.auth.routes"));
app.use("/api/userAuth", require("./routers/user.auth.routes"));
app.use("/api/admin", adminProtected, require("./routers/admin.routes"));
app.use("/api/user", userProtected, require("./routers/user.routes"));
app.use("/api/open", require("./routers/open.routes"));

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not Found" });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
});

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED");
    app.listen(process.env.PORT, () => console.log(`SERVER RUNNING on port ${process.env.PORT}`));
});
