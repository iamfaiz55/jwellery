const router = require("express").Router()
const adminController = require("./../controllers/admin.controller")

router
    .post("/add-product", adminController.addProduct)
    .get("/all-orders", adminController.getAllOrders)
   
    .put("/update-product/:pUId", adminController.updateProduct)
    .put("/delete-products/:pDId", adminController.deleteProduct)
    


module.exports = router