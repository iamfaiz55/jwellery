const router = require("express").Router()
const userController = require("./../controllers/user.controller")
const adminController = require("./../controllers/admin.controller")

router
    .get("/carousel", adminController.getAllCarousels)
    .get("/filter", userController.getFilteredProducts)
    .get("/categories", userController.getAllCategory)
    .get("/get-products", userController.getAllProduct)
    
    .post("/post-contact", userController.contact)
    .get("/details/:pId", userController.getDetails)


module.exports = router