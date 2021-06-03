const { destroy } = require("../dbconnect");
const userModel = require("../models/userModel");
const moment = require('moment');

let user_select = async (req, res) => {
    try{
        userModel.user_selectAll().then( function(data){
            console.log(data);
            return res.render("./backend/functions/users", { page_name: "Tài khoản người dùng", list_user: data, moment:moment} );
        });
    }catch (err){
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/users");
    }
}
let user_create = async (req, res) => {
    let error = [];
    if (typeof req.body.btnSave !== 'undefined') {
        let t_name = req.body.t_name;
        if (!t_name){
            error.push("Vui lòng nhập đầy đủ thông tin!");
        }else if (t_name.length < 50 || t_name > 3){
            error.push("Vui lòng nhập tên loại cây nhiều hơn 3 và nhỏ hơn 12 ký tự!");
            try{
                await userModel.user_create(t_name);
                return res.redirect("/backend/users");
            }catch (err){
                console.log(err);
                req.flash("error", err);
                return res.redirect("/backend/users/create");
            }
        }
    }   
};
let user_update = async (req, res) => {
    // let error = [];
    if (typeof req.body.btnSave !== 'undefined') {
        let username = req.body.username;
        let user_inf = {
            name: req.body.name,
            isMale: req.body.isMale,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            birthday: req.body.birthday, 
            is_admin:  req.body.is_admin
        }
        if (username != ""){
            try{
                await userModel.user_update(username,user_inf);
                return res.redirect("/backend/users");
            }catch (err){
                console.log(err);
                req.flash("error", err);
                return res.redirect("/backend/users/update");
            }
        }
    }   
};
let user_getupdate = async (req, res) => {
    try{
        userModel.user_selectbyUsername(req.query.username).then( function(data){
            return res.render("./backend/functions/users/update", { page_name: "Nhập nhật - Thông tin người dùng", row: data, moment:moment} );
        });
    }catch (err){
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/users");
    }
}
let user_delete = async (req, res) => {
    try{
        userModel.user_delete(req.query.username).then( function(data){
            return res.redirect("/backend/users");
        });
    }catch (err){
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/users");
    }
}

module.exports = {
    user_create,
    user_update,
    user_getupdate,
    user_select,
    user_delete,
}