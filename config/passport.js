var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(new LocalStrategy(
    {
        usernameField: "email"
    },
    (email, password, done) => {
        // sigin code
        db.User.findOne({
            where: {
                email: email
            }
        }).then(
            (dbUser)=>{
                // no user found with the given email
                if(!dbUser) {
                    return done(null, false, {
                        message: "Incorrect email."
                    });
                }
                // if there is a user with the given email, but the password given is incorrect
                else if(!dbUser.validPassword(password, dbUser)) {
                    return done(null, false, {
                        message: "Incorrect password."
                    })
                }
                // else return the user
                return done(null, dbUser);
            });
    })
);

passport.serializeUser((user, cb)=>{
    cb(null, user);
});

passport.deserializeUser((obj, cb)=>{
    cb(null, obj);
});

module.exports = passport;