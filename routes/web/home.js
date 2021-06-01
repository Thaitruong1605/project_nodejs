const express = require('express');
const passport = require('passport');
const registerController = require('../../controllers/registerController');
const productAPI = require('./../../api/product');
const paymentAPI = require('./../../api/payment');
const orderAPI = require('./../../api/order');
const session = require('express-session').Session;

var isLogined = require('../../auth').ensureAuthenticated;
var router = express.Router();
// index --------------------------------------------------
router.get('/', function (req, res) {
    res.render('./', { page_name: 'Mobile store' });
});
// auth --------------------------------------------------
router.get('/register', function (req, res) {
    res.render('./auth/register', { page_name: 'Đăng ký' });
});
router.post('/register', function(req, res){
    registerController.createUser(req, res);
});
router.get('/login', function (req, res) {
    res.render('./auth/login', { page_name: 'Đăng nhập' });
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
// PRODUCTS --------------------------------------------------
router.get('/products',async function(req, res){
    try {
        await productAPI.get().then(function(data){
            res.render('./pages/products', { page_name: 'Sản phẩm', data});
        })
    }catch(err){
        return res.redirect('/');
    }
});
// CART --------------------------------------------------
router.get('/cart', isLogined, function(req, res){
    if (!session.cart) {
        return res.render('./pages/cart.ejs', {
            page_name: 'Giỏ hàng',
            products: null
        });
    }
    res.render('./pages/cart.ejs', {
        page_name: 'Giỏ hàng',
        products: session.cart
    });
});
router.get('/add-to-cart', isLogined, async function(req,res){
    var p_id = req.query.p_id;
    if (!session.cart){
        session.cart = [];
    }
    var isexist = 0;
    session.cart.forEach(Element => {
        if (Element.p_id == p_id) {
            Element.number++; isexist =1;
        }
    });
    if (isexist == 0){
        try {
            await productAPI.getById(p_id).then(function(results){
                var product= {p_id:results[0].p_id, p_name:results[0].p_name,pi_path:results[0].pi_path,number:1,p_price:results[0].p_price};
                session.cart.push(product);     
            });
        }catch(err){
            throw err;
        }
    }
    res.redirect(req.get('referer'));
});
router.get('/update-number-cart', isLogined, function(req,res){
    var p_id = req.query.p_id;
    var number = req.query.number;
    if (session.cart){
        session.cart.forEach((Element,index) => {
            if (Element.p_id == p_id) {
                session.cart[index].number = number;
            }
        });
    }
    res.redirect('/cart');
});
router.get('/remove-from-cart', isLogined, function(req,res){
    var p_id = req.query.p_id;
    if (session.cart){
        session.cart.forEach((Element,index) => {
            if (Element.p_id == p_id) {
                session.cart.splice(index,1);
            }
        });
    }
    res.redirect('/cart');
});

// ODER -------------------------------------------
router.get('/order', isLogined, function(req,res){
    var cart = session.cart;
    paymentAPI.get().then(function(data){
        res.render('./pages/order',{
            page_name:'Đặt hàng',
            products: cart,
            payments: data,
        });
    })
});
router.post('/comfirm-order',async function(req, res){
    var order_data = {
        username: req.body.username,
        o_totalamount: req.body.o_totalamount,
        o_address:req.body.o_address,
        pmt_id: req.body.pmt_id,
    }
    try {
        await orderAPI.put(order_data).then(async function (data){
            try {
                await orderAPI.get_last_id().then(function(data){
                    var last_id = data[0].o_id ; 
                    var order_detail = [];
                    session.cart.forEach(function(Element,index){
                        order_detail[index] = {
                            o_id: last_id,
                            p_id: Element.p_id,
                            odp_price: Element.p_price,
                            odp_number: Element.number
                        };
                        try {
                            orderAPI.put_order_detail(order_detail[index]);
                            if (index == session.cart.length-1) {
                                session.cart.splice(0);
                                res.redirect('/cart');
                            }
                        }catch (err){
                            res.redirect(req.get('referer'));
                        }
                    });
                });
            }catch (err){
                res.redirect(req.get('referer'));
            }
        });
    }catch (err){
        res.redirect(req.get('referer'));
    }
});
module.exports = router;