const router = require("express").Router()
const adminController = require("./../controllers/admin.controller")
const userController = require("./../controllers/user.controller")

router
    .post("/add-product", adminController.addProduct)
    .put("/update-product/:pUId", adminController.updateProduct)
    .put("/delete-products/:pDId", adminController.deleteProduct)
    
    .post("/add-carousel", adminController.addCarousel)
    .post("/update-carousel", adminController.updateCarousel)
    .delete("/delete-carousel/:id", adminController.deleteCarousel)
    
    .get("/all-orders", adminController.getAllOrders)
    .put("/update-order-status", adminController.updateOrderStatus)
    
    .get("/all-user", adminController.getAllUsers)
    .put("/block-user/:uId", adminController.blockUser)
    .put("/unblock-user/:uId", adminController.unblockUser)

    .post("/add-category", adminController.addCategory)
    .delete("/delete-category/:cId", adminController.deleteCategory)

    .get("/get-contact", userController.getContacts)
    .post("/create-method", adminController.createPaymentMethod)
    .put("/disable-method/:methodId", adminController.disableMethod)
    .get("/get-all-payment-method", adminController.getPaymentMethods)
    .put("/enable-method/:methodId", adminController.enableMethod)


module.exports = router