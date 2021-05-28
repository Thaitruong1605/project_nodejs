// thao tác với CSDL
const conn = require("../dbconnect");
const bcrypt = require("bcrypt");

let addUser = (user) => {
    return new Promise(async (resolve, reject) => {
        
        let checkUsername = await isExist_username(user.username);
        if (checkUsername){
            reject("Tên đăng nhập đã được đăng ký!");
        }else {
            const SALT = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, SALT);
            conn.query(
                'INSERT INTO users set ? ', 
                user,
                function(err){
                    console.log(this.sql);
                    if (err) { console.log(err);}
                    resolve("A new user has been created!");
                }
            );
        }
    });
};

let isExist_username = (username) => {
    return new Promise( (resolve, reject) => {
        try {
            conn.query(
                'SELECT username FROM users WHERE username= "'+username +'"',
                function(err,rows){
                    if(err){ console.log(err); }
                    if(rows != ''){ resolve(true); }
                    else { resolve(false); }
                }
            )
        }catch(err){
            reject(err);
        }
    });
};

module.exports = {
    addUser: addUser,
}