const { resolve } = require('path');
const conn = require('../dbconnect');

let get = () => {
    return new Promise ( (resolve, reject)=> {
        conn.query(
            'SELECT * FROM payments',
            function(err, results){
                if (err) reject(err);
                else resolve(results);
            }
        )
    })
}
module.exports ={
    get
}