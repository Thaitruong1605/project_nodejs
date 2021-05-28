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
const typeController = require("../../controllers/typeController");
const userController = require("../../controllers/userController");
const productController = require("../../controllers/productController");
const productimageController = require("../../controllers/productimageController");

router.get("/", function (req, res) {
    res.render("./backend", { page_name: "Dashboard" });
});

// SIZE ---------------------------------------------------------------------------- 
router.get("/size", function (req, res) {
    sizeController.size_select(req, res);
});
router.get("/size/create", function (req, res) {
    res.render("./backend/functions/size/create", { page_name: "Thêm - Kích thước sản phẩm" });
});
router.post("/size/create", function (req, res) {
    sizeController.size_create(req, res);
});
router.get("/size/update", function (req, res) {
    sizeController.size_getupdate(req, res);
});
router.post("/size/update", function (req, res) {
    sizeController.size_update(req, res);
});
router.get("/size/delete", function (req, res) {
    sizeController.size_delete(req, res);
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
module.exports = router;