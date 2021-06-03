const conn = require('../dbconnect');
let user_selectAll = () => {
    return new Promise( (resolve, reject) => {
        conn.query(
            'SELECT username, name, email, phoneNumber, isMale, birthday, address, is_admin FROM users',
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    }); 
}
let user_selectbyUsername = (username) => {
    return new Promise( async (resolve, reject) => {
        conn.query(
            'SELECT username, name, email, phoneNumber, isMale, birthday, address, is_admin FROM users WHERE username = ?',
            username,
            function (err, results) {
                if (err) { reject(err); }
                else {
                    resolve(results);
                }
            }
        )
    });
}
let user_update = (username, user_inf) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'UPDATE users SET ? WHERE username= ? ', 
            [user_inf, username],
            function(err){
                console.log(this.sql);
                if (err) { reject(err);}
                resolve("A new user has been created!");
            }
        )
    });
};
let user_delete = (username) => {
    return new Promise(async (resolve, reject) => {
        conn.query(
            'DELETE FROM users WHERE username= ? ',
            username,
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
    user_selectAll,
    user_selectbyUsername,
    user_update,
    user_delete,
}