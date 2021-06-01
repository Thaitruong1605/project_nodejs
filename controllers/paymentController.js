const { destroy } = require("../dbconnect");
const paymentModel = require("../models/paymentModel");

let payment_create = async (req, res) => {
    let error = [];
    if (typeof req.body.btnSave !== 'undefined') {
        let pmt_name = req.body.pmt_name;
        try{
            await paymentModel.payment_create(pmt_name);
            return res.redirect("/backend/payments");
        }catch (err){
            console.log(err);
            req.flash("error", err);
            return res.redirect("/backend/payments/create");
        }
    }   
};
let payment_update = async (req, res) => {
    let error = [];
    console.log(req);
    if (typeof req.body.btnSave !== 'undefined') {
        let pmt_id = req.body.pmt_id;
        let pmt_name = req.body.pmt_name;
        try{
            await paymentModel.payment_update(pmt_id, pmt_name);
            return res.redirect("/backend/payments");
        }catch (err){
            console.log(err);
            req.flash("error", err);
            return res.redirect("/backend/payments/update");
        }
    }   
};
let payment_select = async (req, res) => {
    try{
        paymentModel.payment_selectAll().then( function(data){
            return res.render("./backend/functions/payments", { page_name: "Kích thước sản phẩm", list_payment: data} );
        });
    }catch (err){
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/payments");
    }
}
let payment_getupdate = async (req, res) => {
    try{
        paymentModel.payment_selectbyId(req.query.pmt_id).then( function(data){
            return res.render("./backend/functions/payments/update", { page_name: "Nhập nhật - Kích thước sản phẩm", row: data} );
        });
    }catch (err){
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/payments");
    }
}
let payment_delete = async (req, res) => {
    try{
        paymentModel.payment_delete(req.query.pmt_id).then( function(data){
            return res.redirect("/backend/payments");
        });
    }catch (err){
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/payments");
    }
}
module.exports = {
    payment_create,
    payment_update,
    payment_getupdate,
    payment_select,
    payment_delete
}