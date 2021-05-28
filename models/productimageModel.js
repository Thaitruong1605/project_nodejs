const { resolve } = require('path');
const conn = require('../dbconnect');
let productimage_selectProduct = (pi_id) => {
    return new Promise( (resolve, reject) => {
        conn.query(
            'SELECT * FROM products WHERE p_id NOT IN (SELECT p_id FROM product_images WHERE pi_id <> ?) ',
            pi_id,
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    }); 
}
let productimage_selectAll = () => {
    return new Promise( (resolve, reject) => {
        conn.query(
            'SELECT pi_id, pi_path, p.p_name FROM product_images pimg LEFT JOIN products p ON p.p_id = pimg.p_id;',
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    }); 
}
let productimage_selectbyId = (pi_id) => {
    return new Promise( async (resolve, reject) => {
        conn.query(
            'SELECT * FROM product_images WHERE pi_id = ?',
            pi_id,
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    });
}
let productimage_create = (path, p_id) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'INSERT INTO product_images (pi_path, p_id) VALUES (?, ?)',
            [path, p_id], 
            function (err) {
                if (err) { reject(err); }
                else {
                    resolve("A new row has been created");
                }
            }
        )
    });
};
let productimage_update = (pi_id, path, p_id) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'UPDATE product_images SET pi_path=?,p_id=? WHERE pi_id = ?',
            [path, p_id, pi_id],
            function (err) {
                if (err) { reject(err); }
                else {
                    resolve("A row has been updated");
                }
            }
        )
    });
};
let productimage_delete = (pi_id) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'DELETE FROM product_images WHERE pi_id= ? ',
            pi_id,
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
    productimage_selectAll,
    productimage_selectbyId,
    productimage_create,
    productimage_update,
    productimage_delete,
    productimage_selectProduct
}