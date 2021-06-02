const orderModel = require("../models/orderModel");
const paymentModel = require("../models/paymentModel");
const moment = require('moment');

let order_select = async (req, res) => {
    try{
        await paymentModel.payment_selectAll().then(async function(data){
            let payments = data ;
            console.log(payments);
            try{
                orderModel.order_selectAll().then( function(data){
                    return res.render("./backend/functions/orders", { page_name: "Đơn hàng", list_order: data,payments, moment:moment} );
                });
            }catch (err){
                console.log(err);
                req.flash("error", err);
                return res.redirect("/backend/orders");
            }
        })
    }catch(err){
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/orders");
    }
}
let payment_confirmation = async (req,res) =>{
    try{
        await orderModel.payment_confirmation(req.query.o_id).then( function(){
            return res.redirect("/backend/orders");
        });
    }catch (err){
        req.flash("error", err);
        return res.redirect("/backend/orders");
    }
}

let order_detail = async (req,res) =>{
    if(!req.query.o_id){
        return res.redirect("/backend/orders");
    }
    try {
        await orderModel.order_detail(req.query.o_id).then(function(data) {
            return res.render("./backend/functions/orders/detail", { page_name: "Đơn hàng", data, o_id: req.query.o_id, moment:moment});
        });
    }catch (err) {
        // return res.redirect("/backend/orders");
    }
}
module.exports = {
    order_select,
    payment_confirmation,
    order_detail,
}