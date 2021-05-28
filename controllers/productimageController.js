var productimageModel = require("../models/productimageModel");

let productimage_select = async (req, res) => {
    try {
        productimageModel.productimage_selectAll().then(function (data) {
            return res.render("./backend/functions/product-images", { page_name: "Kích thước sản phẩm", list_img: data });
        });
    } catch (err) {
        req.flash("error", err);
        return res.redirect("/backend/product-images");
    }
}
let productimage_rendercreate = async (req, res) => {
    let error = [];
    let producttb = [];
    try {
        await productimageModel.productimage_selectProduct(0).then(function (data) {
            let i = 0;
            data.forEach(function (row) {
                producttb[i] = {
                    p_id: row.p_id,
                    p_name: row.p_name,
                    p_price: row.p_price
                }
                i++;
            })
        });
    } catch (err) {
        console.log(err);
        error.push(err);
    }
    if (error == "") {
        return res.render("./backend/functions/product-images/create", { page_name: "Thêm - Sản phẩm", p_list: producttb });
    } else {
        return res.redirect("/backend/product-images/");
    }
}
let productimage_create = async (req, res) => {
    console.log(req.body.btnSave);
    if (typeof req.body.btnSave !== 'undefined') {
        try {
            // console.log(req.file.path);
            await productimageModel.productimage_create(req.file.filename, req.body.p_id);
            return res.redirect("/backend/product-images");
        } catch (err) {
            console.log(err);
            req.flash("error", err);
            return res.redirect("/backend/product-images/create");
        }
    }
};
let productimage_renderupdate = async (req, res) => {
    let error = [];
    let producttb = [];
    let row;
    let pi_id = req.query.pi_id;
    try {
        await productimageModel.productimage_selectProduct(pi_id).then(function (data) {
            let i = 0;
            data.forEach(function (row) {
                producttb[i] = {
                    p_id: row.p_id,
                    p_name: row.p_name,
                    p_price: row.p_price
                }
                i++;
            })
        });
    } catch (err) {
        console.log(err);
        error.push(err);
    }
    try {
        await productimageModel.productimage_selectbyId(pi_id).then(function(data){
            row = data[0];
        });
    } catch (err) {
        console.log(err);
        error.push(err);
    }
    if (error == "") {
        return res.render("./backend/functions/product-images/update", { page_name: "Thêm - Sản phẩm", p_list: producttb, row });
    } else {
        return res.redirect("/backend/product-images/");
    }
}
let productimage_update = async (req, res) => {
    if (typeof req.body.btnSave !== 'undefined') {
        try {
            await productimageModel.productimage_update(req.body.pi_id, req.file.filename, req.body.p_id,);
            return res.redirect("/backend/product-images");
        } catch (err) {
            console.log(err);
            req.flash("error", err);
            return res.redirect(req.get('referer'));
        }
    }
};
let productimage_delete = async (req, res) => {
    try {
        await productimageModel.productimage_delete(req.query.pi_id);
        return res.redirect("/backend/product-images");
    } catch (err) {
        console.log(err);
        req.flash("error", err);
        return res.redirect("/backend/product-images");
    }
}
module.exports = {
    productimage_select,
    productimage_rendercreate,
    productimage_create,
    productimage_renderupdate,
    productimage_update,
    productimage_delete
}