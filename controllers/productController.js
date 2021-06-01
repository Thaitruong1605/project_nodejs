const productModel = require("../models/productModel");
const size_selectAll = require("../models/sizeModel").size_selectAll;
const type_selectAll = require("../models/typeModel").type_selectAll;
const moment = require('moment');
let product_select = async (req, res) => {
    try{
        productModel.product_selectAll().then( function(data){
            return res.render("./backend/functions/products", { page_name: "Kích thước sản phẩm", list_product: data,moment:moment} );
        });
    }catch (err){
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/products");
    }
}

let product_rendercreate = async (req, res) => {
    let error = [];
    let sizetb, typetb;
    try{
        await type_selectAll().then(function (data) {
            typetb = data;
        });
    }catch(err){
        console.log(err);
        error.push(err);
    }
    try{
        await size_selectAll().then(function (data) {
            sizetb = data;
        });
        
    }catch(err){
        console.log(err);
        error.push(err);
    }

    if (error == ""){
        return res.render("./backend/functions/products/create", { page_name: "Thêm - Sản phẩm", size_list: sizetb,type_list: typetb} );
    }else {
        return res.redirect("./backend/functions/products/");
    }
}
let product_create = async (req, res) => {
    let error = [];
    if (typeof req.body.btnSave !== 'undefined') {
        let p_name = req.body.p_name;
        console.log(p_name);
        if (!p_name){
            error.push("Vui lòng nhập đầy đủ thông tin!");
        }else{
            let data = {
                p_name: req.body.p_name,
                p_price: req.body.p_price,
                p_oldPrice: req.body.p_oldPrice ,
                p_date: req.body.p_date,
                p_number: req.body.p_number,
                p_description: req.body.p_description,
                p_detail: req.body.p_detail,
                s_id: req.body.s_id,
                t_id: req.body.t_id
            }
            try{
                await productModel.product_create(data);
                return res.redirect("/backend/products");
            }catch (err){
                console.log(err);
                req.flash("error", err);
                return res.redirect("/backend/products/create");
            }
        }
    }   
};
let product_renderupdate = async (req, res) => {
    let error = [];
    let sizetb, typetb, product_row ;
    try{
         await type_selectAll().then(function (data) { typetb = data; }); 
    }catch(err){ console.log(err); error.push(err); }

    try{
        await size_selectAll().then(function (data) { sizetb = data; }); 
    }catch(err){ console.log(err);  error.push(err); }
    
    try {
        await productModel.product_selectbyId(req.query.p_id).then(function(data){ product_row = data });
    }catch(err){ console.log(err);  error.push(err); }

    if (error == ""){
        return res.render("./backend/functions/products/update", { page_name: "Cập nhật - Sản phẩm", size_list: sizetb,type_list: typetb, row:product_row ,moment:moment} );
    }else {
        return res.redirect("./backend/functions/products/");
    }
}
let product_update = async (req, res) => {
    let error = [];
    console.log(req);
    if (typeof req.body.btnSave !== 'undefined') {
        let p_id = req.body.p_id;
        let data = {
            p_name: req.body.p_name,
            p_price: req.body.p_price,
            p_oldPrice: req.body.p_oldPrice ,
            p_date: req.body.p_date,
            p_number: req.body.p_number,
            p_description: req.body.p_description,
            p_detail: req.body.p_detail,
            s_id: req.body.s_id,
            t_id: req.body.t_id
        }
        
        try{
            await productModel.product_update(p_id,data);
            return res.redirect("/backend/products");
        }catch (err){
            console.log(err);
            req.flash("error", err);
            return res.redirect("/backend/products/update");
        }
        
    }   
};


let product_delete = async (req, res) => {
    try{
        productModel.product_delete(req.query.p_id).then( function(){
            return res.redirect("/backend/products");
        })
    }catch(err){
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/products");
    }
}
module.exports = {
    product_select,
    product_rendercreate,
    product_create,
    product_renderupdate,
    product_update,
    product_delete
}