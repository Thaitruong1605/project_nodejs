const { resolve } = require('path');
const conn = require('../dbconnect');
let payment_selectAll = () => {
    return new Promise( (resolve, reject) => {
        conn.query(
            'SELECT * FROM payments',
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    }); 
}
let payment_selectbyId = (pmt_id) => {
    return new Promise( async (resolve, reject) => {
        conn.query(
            'SELECT * FROM payments where pmt_id = ?',
            pmt_id,
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    });
}
let payment_create = (pmt_name) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'INSERT INTO payments (pmt_name) values ("'+pmt_name+'")',
            function (err) {
                if (err) { reject(err); }
                else {
                    resolve("A new row has been created");
                }
            }
        )
    });
};
let payment_update = (pmt_id, pmt_name) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'UPDATE payments SET pmt_name= "'+pmt_name+'" WHERE pmt_id = "'+pmt_id+'" ',
            function (err) {
                if (err) { reject(err); }
                else {
                    resolve("A row has been updated");
                }
            }
        )
    });
};
let payment_delete = (pmt_id) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'DELETE FROM payments WHERE pmt_id= ? ',
            pmt_id,
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
    payment_selectAll,
    payment_selectbyId,
    payment_create,
    payment_update,
    payment_delete
}