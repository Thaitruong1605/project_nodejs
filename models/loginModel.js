const conn = require("../dbconnect");

let findUser = (username) => {
    return new Promise((resolve, reject) => {
        try {
            conn.query(
                'SELECT username, password, is_admin FROM users WHERE username = "'+ username +'"',
                function (err, result) {
                    // console.log(this.sql);
                    if (err) { reject(err); }
                    else if (result.length > 0) {
                        let user = {
                            username: result[0].username,
                            password: result[0].password,
                            is_admin: result[0].is_admin
                        };
                        resolve(user);
                    } else
                        reject("Không tìm thấy người dùng");
                }
            );
        } catch (err) {
            reject(err);
        }
    });
}
module.exports = {
    findUser: findUser
}
