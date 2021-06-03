const registerModel = require("../models/registerModel");
let createUser = async (req, res) => {
    // console.log(req);
    let error = [];
    if (!req.body.username || !req.body.password || !req.body.name || !req.body.phoneNumber) {
        error.push("Vui lòng nhập đầy đủ thông tin đăng ký!");
    } else if (req.body.password != req.body.repassword) {
        error.push("Mật khẩu không giống!");
    } else if (req.body.phoneNumber.length != 11 && req.body.phoneNumber.length != 10) {
        error.push("Vui lòng nhập số điện thoại có 10 hoặc 11 số");
    }
    if (error && error.length > 0) {
        req.flash("error", error);
        res.redirect("/register");
    } else {
        let user = {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            isMale: req.body.isMale,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            birthday: req.body.birthday,
            is_admin: 0
        };
        try {
            await registerModel.addUser(user);
            return res.redirect("/login");
        } catch (err) {
            req.flash("error", err);
            return res.redirect(req.get('referer'));
        }
    }
}

module.exports = {
    createUser: createUser,
}