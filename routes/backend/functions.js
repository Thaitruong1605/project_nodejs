const express = require("express");
const passport = require("passport");
const router = express.Router();
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/img/products')
    },
    filename: function (req, file, cb) {
        console.log(req.body);
        cb(null, Date.now() + '-ID'+req.body.p_id+file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length));
    }
});
var upload = multer({storage:storage}).single('pimg');

const sizeController = require("../../controllers/sizeController");
const paymentController = require("../../controllers/paymentController");
const typeController = require("../../controllers/typeController");
const userController = require("../../controllers/userController");
const productController = require("../../controllers/productController");
const orderController = require("../../controllers/orderController");
const productimageController = require("../../controllers/productimageController");

const dashboardAPI = require("../../models/dashboard");
// DASHBOARD 

router.get("/", async function (req, res) { 
    let totalamount_per_month = [];
    let count_orders, count_users, count_products, totalamount;
    
    try{
        await dashboardAPI.totalamount().then(function(data) {totalamount  = data; });
    }catch (err){
        console.log (err);
    }
    try{
        await dashboardAPI.totalamount_per_month().then(function(data) {totalamount_per_month  = data; });
    }catch (err){
        console.log (err);
    }
    try {
        await dashboardAPI.count_orders().then( function(data){ count_orders = data[0].count });
    }catch (err){
        console.log (err);
    }
    try{
        await dashboardAPI.count_products().then( function(data){ count_products = data[0].count });
    }catch(err){
        console.log (err);
    }
    try{
        await dashboardAPI.count_users().then( function(data){ count_users = data[0].count });
    }catch(err){
        console.log (err);
    }
    console.log(totalamount_per_month);
    res.render("./backend", { page_name: "Dashboard", totalamount_per_month, count_orders, count_users, count_products, totalamount});
});

// SIZE ---------------------------------------------------------------------------- 
router.get("/sizes", function (req, res) {
    sizeController.size_select(req, res);
});
router.get("/sizes/create", function (req, res) {
    res.render("./backend/functions/sizes/create", { page_name: "Thêm - Kích thước sản phẩm" });
});
router.post("/sizes/create", function (req, res) {
    sizeController.size_create(req, res);
});
router.get("/sizes/update", function (req, res) {
    sizeController.size_getupdate(req, res);
});
router.post("/sizes/update", function (req, res) {
    sizeController.size_update(req, res);
});
router.get("/sizes/delete", function (req, res) {
    sizeController.size_delete(req, res);
});
// PAYMENT ---------------------------------------------------------------------------- 
router.get("/payments", function (req, res) {
    paymentController.payment_select(req, res);
});
router.get("/payments/create", function (req, res) {
    res.render("./backend/functions/payments/create", { page_name: "Thêm - Kích thước sản phẩm" });
});
router.post("/payments/create", function (req, res) {
    paymentController.payment_create(req, res);
});
router.get("/payments/update", function (req, res) {
    paymentController.payment_getupdate(req, res);
});
router.post("/payments/update", function (req, res) {
    paymentController.payment_update(req, res);
});
router.get("/payments/delete", function (req, res) {
    paymentController.payment_delete(req, res);
});
// TYPE ---------------------------------------------------------------------------- 
router.get("/types", function (req, res) {
    typeController.type_select(req, res);
});
router.get("/types/create", function (req, res) {
    res.render("./backend/functions/types/create", { page_name: "Thêm - Kích thước sản phẩm" });
});
router.post("/types/create", function (req, res) {
    typeController.type_create(req, res);
});
router.get("/types/update", function (req, res) {
    typeController.type_getupdate(req, res);
});
router.post("/types/update", function (req, res) {
    typeController.type_update(req, res);
});
router.get("/types/delete", function (req, res) {
    typeController.type_delete(req, res);
});
// USERS -------------------------------------------------------------------------
router.get("/users", function (req, res) {
    userController.user_select(req, res);
});
router.get("/users/update", function (req, res) {
    userController.user_getupdate(req, res);
});
router.post("/users/update", function (req, res) {
    userController.user_update(req, res);
});
router.get("/users/delete", function (req, res) {
    userController.user_delete(req, res);
})
// PRODUCTS ---------------------------------------------------------------------------- 
router.get("/products", function (req, res) {
    productController.product_select(req, res);
});
router.get("/products/create", function (req, res) {
    productController.product_rendercreate(req, res);
});
router.post("/products/create", function (req, res) {
    productController.product_create(req, res);
});
router.get("/products/update", function (req, res) {
    productController.product_renderupdate(req, res);
});
router.post("/products/update", function (req, res) {
    productController.product_update(req, res);
});
router.get("/products/delete", function (req, res) {
    productController.product_delete(req, res);
});

// IMAGES ----------------------------------

router.get("/product-images", function (req, res) {
    productimageController.productimage_select(req, res);
});
router.get("/product-images/create", function (req, res) {
    productimageController.productimage_rendercreate(req, res);
});
router.post("/product-images/create", function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.send(err);
        } else if (err) {
            res.send(err);
        }
        // console.log(req.file);
        productimageController.productimage_create(req,res);
    })
});
router.get("/product-images/update", function (req, res) {
    productimageController.productimage_renderupdate(req, res);
});
router.post("/product-images/update", function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.send(err);
        } else if (err) {
            res.send(err);
        }
        productimageController.productimage_update(req,res);
    })
});
router.get("/product-images/delete", function (req, res) {
    console.log(req.query.pi_path);
    fs.unlink('./uploads/img/products/'+req.query.pi_path, (err) => {
        if (err){
            res.redirect("/backend/product-images");
        }
        console.log('path/file.txt was deleted');
        productimageController.productimage_delete(req, res);
    });
});

// ORDER ----------------------------------\
router.get("/orders", function(req, res){
    orderController.order_select(req,res);
});
router.get("/orders/order_detail", function(req, res){
    orderController.order_detail(req,res);
});

module.exports = router;