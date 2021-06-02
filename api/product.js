const conn = require('../dbconnect');

let get = () => {
    return new Promise( (resolve, reject) => {
        conn.query(
            'SELECT p.p_id, p_name, p_price, p_oldPrice, p_date, p_number, p_description,  s_name, t_name, pi_path FROM products p LEFT JOIN product_images pi ON pi.p_id = p.p_id LEFT JOIN sizes s ON s.s_id = p.s_id LEFT JOIN types t ON t.t_id = p.t_id',
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    }); 
}

let getById = (p_id) => {
    return new Promise( (resolve, reject) => {
        conn.query(
            'SELECT p.p_id, p_name, p_price, p_description,  s_name, t_name, pi_path FROM products p LEFT JOIN product_images pi ON pi.p_id = p.p_id LEFT JOIN sizes s ON s.s_id = p.s_id LEFT JOIN types t ON t.t_id = p.t_id WHERE p.p_id = ?',
            p_id,
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
    get,
    getById
}