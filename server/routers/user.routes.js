const router = require("express").Router()
const userController = require("./../controllers/user.controller")
const adminController = require("./../controllers/admin.controller")

router
    .get("/get-orders/:userId", userController.getOrders)
    .get("/details/:pId", userController.getDetails)
    .post("/add-address", userController.addAddress)
    .get("/get-address/:id", userController.getAddresses)
    .get("/get-cart/:uid", userController.getAllCartItems)
    .post("/create-cart", userController.addCart)
    .post("/create-order", userController.createOrder)
    .delete("/delete-cart/:id", userController.deleteItemFromCart)
    .put("/cancel-order/:id", userController.cancelOrder)
    .delete("/delete-all-cart", userController.deleteAllCart)
    .get("/get-products", userController.getAllProduct)
    .get("/carousel", adminController.getAllCarousels)
    .get("/filter", userController.getFilteredProducts)



module.exports = router