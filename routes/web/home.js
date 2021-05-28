const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt"); // hash password
const SALT = bcrypt.genSaltSync(10);
const registerController = require("../../controllers/registerController");
const conn = require("../../dbconnect");

var isLogined = require('../../auth').ensureAuthenticated;
var router = express.Router();

router.get("/", function (req, res) {
    res.render("./", { page_name: "Mobile store" });
});
router.get("/register", function (req, res) {
    res.render("./auth/register", { page_name: "Đăng ký" });
});
router.post("/register", function(req, res){
    registerController.createUser(req, res);
});
router.get("/login", function (req, res) {
    res.render("./auth/login", { page_name: "Đăng nhập" });
});
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login', 
        failureFlash: true
    })
);
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
router.get('/cart',isLogined, function(req, res){
    res.render("./auth/register", { page_name: "Giỏ hàng" });
});
module.exports = router;