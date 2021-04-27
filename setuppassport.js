const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
var User = require("./models/user");

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });
    passport.deserializeUser(function (username, done) {
        User.findOne(username, function (err, user) {
            done(err, user);
        })
    });
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne(username, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if (err) { return done(err); }
                    if (!isMatch) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                });
                return done(null, user);
            });
        }
    ));
};