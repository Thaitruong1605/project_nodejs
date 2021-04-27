const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt"); // hash password
var User = require("../../models/user");

const saltRounds = 10; // Chuỗi được thêm vào để phức tạp hoá mật khẩu

var router = express.Router();

router.get("/", function (req, res) {
    res.render("./", { page_name: "Mobile store" });
});
router.get("/register", function (req, res) {
    res.render("./auth/register", { page_name: "Đăng ký" });
});
router.post("/register", function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    var kh_ten = req.body.kh_ten;
    var kh_dienthoai = req.body.kh_dienthoai;
    var kh_gioitinh = req.body.kh_gioitinh;
    var kh_email = req.body.kh_email;
    var kh_diachi = req.body.kh_diachi;
    var kh_ngaysinh = req.body.kh_ngaysinh;
    var error = [];
    if (!username || !password || !kh_ten || !kh_dienthoai) {
        error.push("Vui lòng nhập đầy đủ thông tin đăng ký!");
    } else {
        
        var select = "SELECT kh_tendangnhap	FROM khachhang='" + username + "'";
        conn.query(select, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                error.push("Tên đăng nhập đã được đăng ký!");
                console.log("A row was selected!");
            }
        });

        if (password != repassword) {
            error.push("Mật khẩu không giống!");
        }
        if (kh_dienthoai.length != 11 && kh_dienthoai.length != 10) {
            error.push("Vui lòng nhập số điện thoại có 10 hoặc 11 số");
        }
    }
    if (error && error.length > 0) {
        req.flash("error", error);
        res.redirect("/register");
    } else {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) { return done(err); }
                password = hash;
                User.addUser(username, password, kh_ten, kh_gioitinh, kh_diachi, kh_dienthoai, kh_email, kh_ngaysinh);

            });
        });
    }
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
module.exports = router;