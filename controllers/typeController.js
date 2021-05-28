const { destroy } = require("../dbconnect");
const typeModel = require("../models/typeModel");

let type_select = async (req, res) => {
    try{
        typeModel.type_selectAll().then( function(data){
            return res.render("./backend/functions/types", { page_name: "Kích thước sản phẩm", list_type: data} );
        });
    }catch (err){
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/types");
    }
}
let type_create = async (req, res) => {
    let error = [];
    if (typeof req.body.btnSave !== 'undefined') {
        let t_name = req.body.t_name;
        if (!t_name){
            error.push("Vui lòng nhập đầy đủ thông tin!");
        }else if (t_name.length < 50 || t_name > 3){
            error.push("Vui lòng nhập tên loại cây nhiều hơn 3 và nhỏ hơn 12 ký tự!");
            try{
                await typeModel.type_create(t_name);
                return res.redirect("/backend/types");
            }catch (err){
                console.log(err);
                req.flash("error", err);
                return res.redirect("/backend/types/create");
            }
        }
    }   
};
let type_update = async (req, res) => {
    let error = [];
    if (typeof req.body.btnSave !== 'undefined') {
        let t_id = req.body.t_id;
        let t_name = req.body.t_name;
        if (!t_name){
            error.push("Vui lòng nhập đầy đủ thông tin!");
        }else if (t_name.length < 50 || t_name > 3){
            error.push("Vui lòng nhập tên kích thước nhiều hơn 3 và nhỏ hơn 12 ký tự!");
            try{
                await typeModel.type_update(t_id, t_name);
                return res.redirect("/backend/types");
            }catch (err){
                console.log(err);
                req.flash("error", err);
                return res.redirect("/backend/types/update");
            }
        }
    }   
};
let type_getupdate = async (req, res) => {
    try{
        typeModel.type_selectbyId(req.query.t_id).then( function(data){
            return res.render("./backend/functions/types/update", { page_name: "Nhập nhật - Kích thước sản phẩm", row: data} );
        });
    }catch (err){
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/types");
    }
}
let type_delete = async (req, res) => {
    try{
        typeModel.type_delete(req.query.t_id).then( function(data){
            return res.redirect("/backend/types");
        });
    }catch (err){
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/types");
    }
}
module.exports = {
    type_create,
    type_update,
    type_getupdate,
    type_select,
    type_delete
}