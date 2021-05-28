const { resolve } = require('path');
const conn = require('../dbconnect');
let size_selectAll = () => {
    return new Promise( (resolve, reject) => {
        conn.query(
            'SELECT * FROM sizes',
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    }); 
}
let size_selectbyId = (s_id) => {
    return new Promise( async (resolve, reject) => {
        conn.query(
            'SELECT * FROM sizes where s_id = ?',
            s_id,
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    });
}
let size_create = (s_name) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'INSERT INTO sizes (s_name) values ("'+s_name+'")',
            function (err) {
                if (err) { reject(err); }
                else {
                    resolve("A new row has been created");
                }
            }
        )
    });
};
let size_update = (s_id, s_name) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'UPDATE sizes SET s_name= "'+s_name+'" WHERE s_id = "'+s_id+'" ',
            function (err) {
                console.log(this.sql);
                if (err) { reject(err); }
                else {
                    console.log("A row has been updated");
                    resolve("A row has been updated");
                }
            }
        )
    });
};
let size_delete = (s_id) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'DELETE FROM sizes WHERE s_id= ? ',
            s_id,
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
    size_selectAll,
    size_selectbyId,
    size_create,
    size_update,
    size_delete
}