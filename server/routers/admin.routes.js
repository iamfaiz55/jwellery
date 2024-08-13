const router = require("express").Router()
const adminController = require("./../controllers/admin.controller")

router
    .post("/add-product", adminController.addProduct)
    .get("/all-orders", adminController.getAllOrders)
    .get("/all-user", adminController.getAllUsers)
    
    .post("/add-carousel", adminController.addCarousel)
   
    .put("/update-product/:pUId", adminController.updateProduct)
    .post("/update-carousel", adminController.updateCarousel)
    .put("/update-order-status", adminController.updateOrderStatus)
    .put("/delete-products/:pDId", adminController.deleteProduct)
    .delete("/delete-carousel/:id", adminController.deleteCarousel)
    


module.exports = router