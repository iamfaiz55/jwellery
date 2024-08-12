const multer = require("multer");
const path = require("path");

const postStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname);
        cb(null, fn);
    },
});

// Ensure the field name here matches "image" or whatever is specified in the frontend
const upload = multer({ storage: postStorage }).array("image", 1); 

module.exports = upload;