const conn = require('../dbconnect');

let product_selectAll = () => {
    return new Promise( (resolve, reject) => {
        conn.query(
            'SELECT p_id ,p_name, p_price, p_oldPrice, p_date, p_number, p_description, p_detail, p_name, t_name FROM products p LEFT JOIN sizes s ON p.s_id = s.s_id LEFT JOIN types t ON p.t_id = t.t_id;',
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    }); 
}

let product_selectbyId = (p_id) => {
    // console.log(p_id)
    return new Promise( async (resolve, reject) => {
        conn.query(
            'SELECT * FROM products WHERE p_id = ?',
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
let product_create = (data) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'INSERT INTO products set ?',
            data, 
            function (err) {
                console.log(this.sql)
                if (err) { reject(err); }
                else {
                    resolve("A new row has been created");
                }
            }
        )
    });
};
let product_update = (p_id,data) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'UPDATE products SET ? WHERE p_id = ?',
            [data, p_id],
            function (err) {
                if (err) { reject(err); }
                else {
                    console.log("A row has been updated");
                    resolve("A row has been updated");
                }
            }
        )
    });
};
let product_delete = (p_id) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'DELETE FROM products WHERE p_id= ? ',
            p_id,
            function (err) {
                if (err) { reject(err); }
                else {
                    resolve("A row has been deleted");
                }
            }
        );
    })
};

module.exports = {
    product_selectAll,
    product_selectbyId,
    product_create,
    product_update,
    product_delete,
}