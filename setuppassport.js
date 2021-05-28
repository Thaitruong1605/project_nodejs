const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const loginController = require("./controllers/loginController");

module.exports = function () {
  passport.serializeUser(function (username, done) {
    done(null, username);
  });
  passport.deserializeUser(function (username, done) {
    done(null, username);
  });
  passport.use(new LocalStrategy(
    async function (username, password, done) {
      try{
        await loginController.checkUser(username, password);
        return done(null, username);
      }catch(err){        
        return done(null, false, { message: err });
      }
    }
  ));
};