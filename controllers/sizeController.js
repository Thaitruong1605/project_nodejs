const { destroy } = require("../dbconnect");
const sizeModel = require("../models/sizeModel");

let size_create = async (req, res) => {
    let error = [];
    if (typeof req.body.btnSave !== 'undefined') {
        let s_name = req.body.s_name;
        console.log(s_name);
        if (!s_name){
            error.push("Vui lòng nhập đầy đủ thông tin!");
        }else if (s_name.length < 12 || s_name > 3){
            error.push("Vui lòng nhập tên kích thước nhiều hơn 3 và nhỏ hơn 12 ký tự!");
            try{
                await sizeModel.size_create(s_name);
                return res.redirect("/backend/sizes");
            }catch (err){
                console.log(err);
                req.flash("error", err);
                return res.redirect("/backend/sizes/create");
            }
        }
    }   
};
let size_update = async (req, res) => {
    let error = [];
    console.log(req);
    if (typeof req.body.btnSave !== 'undefined') {
        let s_id = req.body.s_id;
        let s_name = req.body.s_name;
        if (!s_name){
            error.push("Vui lòng nhập đầy đủ thông tin!");
        }else if (s_name.length < 12 || s_name > 3){
            error.push("Vui lòng nhập tên kích thước nhiều hơn 3 và nhỏ hơn 12 ký tự!");
            try{
                await sizeModel.size_update(s_id, s_name);
                return res.redirect("/backend/sizes");
            }catch (err){
                console.log(err);
                req.flash("error", err);
                return res.redirect("/backend/sizes/update");
            }
        }
    }   
};
let size_select = async (req, res) => {
    try{
        sizeModel.size_selectAll().then( function(data){
            return res.render("./backend/functions/sizes", { page_name: "Kích thước sản phẩm", list_size: data} );
        });
    }catch (err){
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/sizes");
    }
}
let size_getupdate = async (req, res) => {
    try{
        sizeModel.size_selectbyId(req.query.s_id).then( function(data){
            return res.render("./backend/functions/sizes/update", { page_name: "Nhập nhật - Kích thước sản phẩm", row: data} );
        });
    }catch (err){
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/sizes");
    }
}
let size_delete = async (req, res) => {
    try{
        sizeModel.size_delete(req.query.s_id).then( function(data){
            return res.redirect("/backend/sizes");
        });
    }catch (err){
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/sizes");
    }
}
module.exports = {
    size_create,
    size_update,
    size_getupdate,
    size_select,
    size_delete
}