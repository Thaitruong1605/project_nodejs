const conn = require('../dbconnect');

let order_selectAll = () => {
    return new Promise( async (resolve, reject) => {
        conn.query(
            'SELECT * FROM orders',
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    }); 
}

let order_selectbyId = (o_id) => {
    return new Promise( async (resolve, reject) => {
        conn.query(
            'SELECT * FROM orders WHERE o_id = ?',
            o_id,
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    });
}

let payment_confirmation = (o_id) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'UPDATE orders SET o_isPaid=1 WHERE o_id = ?',
            o_id,
            function (err) {
                if (err) { reject(err); }
                else {
                    resolve("A row has been updated");
                }
            }
        )
    });
};

let order_detail = (o_id) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'SELECT p.p_id, p_name, o_id, odp_price, odp_number FROM order_details od LEFT JOIN products p ON p.p_id = od.p_id WHERE o_id = ?',
            o_id,
            function (err, results) {
                if (err) { reject(err); }
                else {
                    console.log(results);
                    resolve(results);
                }
            }
        )
    });
}

module.exports = {
    order_selectAll,
    order_selectbyId,
    payment_confirmation,
    order_detail
}