const conn = require('../dbconnect');
let count_orders = () => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'SELECT COUNT(o_id) count FROM orders ',
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    });
}
let count_products = () => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'SELECT COUNT(p_id) count FROM products ',
            function (err,results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        );
    })
};
let count_users = () => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'SELECT COUNT(username) count FROM users',
            function (err,results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        );
    })
};
let totalamount =  () => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'SELECT SUM(o_totalamount) totalamount  FROM  orders WHERE o_isPaid = 1 ',
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results[0].totalamount);
                }
            }
        )
    });
}
let totalamount_per_month =  () => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'SELECT MONTH(o_date) m, YEAR(o_date) y, SUM(o_totalamount) total FROM orders GROUP BY m, y ORDER BY y;',
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    });
}
module.exports = {
    totalamount_per_month,
    count_orders,
    count_products,
    count_users,
    totalamount
}