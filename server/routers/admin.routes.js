const router = require("express").Router()
const adminController = require("./../controllers/admin.controller")
const userController = require("./../controllers/user.controller")

router
    .get("/all-orders", adminController.getAllOrders)
    .get("/all-user", adminController.getAllUsers)
    .get("/get-contact", userController.getContacts)
    .get("/get-all-products", adminController.getAllProductsAdmin)
    .get("/get-company-addresses", adminController.getCompanyAddress)
    .get("/get-all-payment-method", adminController.getPaymentMethods)
    .get("/get-history/:uId", adminController.getHistory)

    .put("/update-order-status", adminController.updateOrderStatus)
    .put("/unblock-user/:uId", adminController.unblockUser)
    .put("/delete-products/:pDId", adminController.deleteProduct)
    .put("/update-product/:pUId", adminController.updateProduct)
    .put("/block-user/:uId", adminController.blockUser)
    .put("/disable-method/:methodId", adminController.disableMethod)
    .put("/enable-method/:methodId", adminController.enableMethod)
    .put("/update-company-address/:id", adminController.updateCompanyAddress)
    .put("/update-tax/:taxId", adminController.updateTax)
    .put("/update-menu-item/:id", adminController.updateMenuItem)
    .put("/update-scroll-card/:id", adminController.updateScrollCard)

    .post("/add-category", adminController.addCategory)
    .post("/add-carousel", adminController.addCarousel)
    .post("/create-method", adminController.createPaymentMethod)
    .post("/add-company-address", adminController.addAddress)
    .post("/add-tax", adminController.createTax)
    .post("/add-menu-item", adminController.addMenuItem)
    .post("/add-image", adminController.addImage)
    .post("/add-scroll-card", adminController.addScrollCard)
    .post("/add-product", adminController.addProduct)
    .post("/update-carousel", adminController.updateCarousel)
    
    .delete("/delete-category/:cId", adminController.deleteCategory)
    .delete("/delete-carousel/:id", adminController.deleteCarousel)
    .delete("/delete-scroll-card/:id", adminController.deleteScrollCard)
    .delete("/delete-add-image/:id", adminController.deleteImage)
    .delete("/delete-menu-item/:id/:menuId", adminController.deleteMenuItem)

module.exports = router