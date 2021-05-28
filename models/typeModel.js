const { resolve } = require('path');
const conn = require('../dbconnect');
let type_selectAll = () => {
    return new Promise( (resolve, reject) => {
        conn.query(
            'SELECT * FROM types',
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    }); 
}
let type_selectbyId = (t_id) => {
    return new Promise( async (resolve, reject) => {
        conn.query(
            'SELECT * FROM types where t_id = ?',
            t_id,
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    });
}
let type_create = (t_name) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'INSERT INTO types (t_name) values ("'+t_name+'")',
            function (err) {
                console.log(this.sql);
                if (err) { reject(err); }
                else {
                    resolve("A new row has been created");
                }
            }
        )
    });
};
let type_update = (t_id, t_name) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'UPDATE types SET t_name= "'+t_name+'" WHERE t_id = "'+t_id+'" ',
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
let type_delete = (t_id) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'DELETE FROM types WHERE t_id= ? ',
            t_id,
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
    type_selectAll,
    type_selectbyId,
    type_create,
    type_update,
    type_delete
}