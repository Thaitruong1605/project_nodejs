var express = require("express");
var passport = require("passport");

var router = express.Router();

router.get("/", function (req, res) {
    res.render("./backend", { page_name: "Dashboard" });
});
router.get("/nhasanxuat", function (req, res) {
    res.render("./backend/functions/nhasanxuat/create", { page_name: "Nhà sản xuất" })
});
router.post("/nhasanxuat", function (req, res, next) {
    var nsx_ten = req.body.nsx_ten;
    var conn = require("../../dbconnect");
    conn.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO nhasanxuat (nsx_ten) VALUES ('" + nsx_ten + "')";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
    conn.end;
    res.redirect("/");

});
module.exports = router;