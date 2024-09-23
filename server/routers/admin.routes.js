const router = require("express").Router()
const adminController = require("./../controllers/admin.controller")
const userController = require("./../controllers/user.controller")

router
    .post("/add-product", adminController.addProduct)
    .put("/update-product/:pUId", adminController.updateProduct)
    .put("/delete-products/:pDId", adminController.deleteProduct)
    
    .get("/get-all-products", adminController.getAllProductsAdmin)
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



    .post("/add-company-address", adminController.addAddress)
    .put("/update-company-address/:id", adminController.updateCompanyAddress)
    .get("/get-company-addresses", adminController.getCompanyAddress)

    .post("/add-tax", adminController.createTax)
    .put("/update-tax/:taxId", adminController.updateTax)


    .post("/add-menu-item", adminController.addMenuItem)
    .put("/update-menu-item/:id", adminController.updateMenuItem)


    .post("/add-scroll-card", adminController.addScrollCard)
    .put("/update-scroll-card/:id", adminController.updateScrollCard)
    .delete("/delete-scroll-card/:id", adminController.deleteScrollCard)
    .post("/add-image", adminController.addImage)
    .delete("/delete-add-image/:id", adminController.deleteImage)
    .delete("/delete-menu-item/:id/:menuId", adminController.deleteMenuItem)


module.exports = router