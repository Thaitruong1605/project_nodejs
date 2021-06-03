const { rejects } = require('assert');
const { resolve } = require('path');
const conn = require('../dbconnect');

let get = () => {
    return new Promise ((resolve, rejects) => {
        conn.query(
            'SELECT * FROM orders',
            function(err, results){
                if (err) rejects(err);
                else resolve(results);
            }
        )
    });
}
let put = (data) => {
    return new Promise ((resolve, rejects) => {
        conn.query (
            'INSERT INTO orders set ?, o_date = NOW();',
            data,
            function(err, results){
                // console.log(this.sql);
                if (err) rejects(err);
                else resolve(results);
            }
        )
    });
}
let get_last_id = () => {
    return new Promise ((resolve, rejects) => {
        conn.query (
            'SELECT MAX(o_id) o_id FROM orders',
            function(err, results){
                if (err) rejects(err);
                else resolve(results);
            }
        )
    });
}
let put_order_detail = (data) => {
    return new Promise ((resolve, rejects) => {
        conn.query (
            'INSERT INTO order_details set ?',
            data,
            function(err, results){
                // console.log(this.sql);
                if (err) rejects(err);
                else resolve(results);
            }
        )
    });
}
let get_byUsername = (username) => {
    return new Promise ((resolve, rejects) => {
        conn.query (
            'SELECT * FROM orders WHERE username =? ',
            username,
            function(err, results){
                // console.log(this.sql);
                if (err) rejects(err);
                else resolve(results);
            }
        )
    });
}
let get_byId = (o_id) => {
    return new Promise ((resolve, rejects) => {
        conn.query (
            'SELECT * FROM orders WHERE o_id =? ',
            o_id,
            function(err, results){
                // console.log(this.sql);
                if (err) rejects(err);
                else resolve(results);
            }
        )
    });
}
let get_order_detail = (o_id )=> {
    return new Promise ((resolve, rejects) => {
        conn.query (
            'SELECT p.p_id, p_name, pi_path, odp_number, odp_price  FROM order_details od LEFT JOIN products p ON p.p_id = od.p_id LEFT JOIN product_images pimg ON pimg.p_id = od.p_id WHERE o_id =? ',
            o_id,
            function(err, results){
                // console.log(this.sql);
                if (err) rejects(err);
                else resolve(results);
            }
        )
    });
}

module.exports = {
    get,
    get_byUsername,
    get_byId,
    put,
    put_order_detail,
    get_order_detail,
    get_last_id
}