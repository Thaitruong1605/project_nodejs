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
                console.log(this.sql);
                if (err) rejects(err);
                else resolve(results);
            }
        )
    });
}
module.exports = {
    get,
    put,
    put_order_detail,
    get_last_id
}