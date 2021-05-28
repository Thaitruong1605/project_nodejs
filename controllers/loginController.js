const loginModel = require("../models/loginModel");
const bcrypt = require("bcrypt");

let checkUser = (username, password) => {
    return new Promise (async (resolve,reject) => {
        try {
            let user = await loginModel.findUser(username).then();
            if (user){
                bcrypt.compare(password, user.password). then( isMatch => {
                    if (isMatch){
                        resolve(user);
                    }else {
                        reject("Sai mật khẩu!");
                    }
                })
            }else 
            reject("Không tìm thấy người dùng");
        }catch(err){
            reject(err);
        }
    });
}
module.exports = {
    checkUser: checkUser
}