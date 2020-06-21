var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'foodJWTverse';

var db = require("../models");

let strategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    console.log('payload received '+jwt_payload);
    db.User.findOne({
        email
    }).then((user) => {
            // no user found with the given email
            if(!user) {
                return done(null, false, {
                    message: "Incorrect email."
                });
            }
            // if there is a user with the given email, but the password given is incorrect
            else if(!user.validPassword(password, user)) {
                return done(null, false, {
                    message: "Incorrect password."
                })
            }
            // else return the user
            return done(null, user);
    })
});

getUser = async (email) => {
    await db.User.findOne({
        where: {
            email: email
        }
    });
}

passport.use(
    // new LocalStrategy(
//     {
//         usernameField: "email"
//     },
//     (email, password, done) => {
//         // sigin code
//         db.User.findOne({
//             where: {
//                 email: email
//             }
//         }).then(
//             (dbUser)=>{
//                 // no user found with the given email
//                 if(!dbUser) {
//                     return done(null, false, {
//                         message: "Incorrect email."
//                     });
//                 }
//                 // if there is a user with the given email, but the password given is incorrect
//                 else if(!dbUser.validPassword(password, dbUser)) {
//                     return done(null, false, {
//                         message: "Incorrect password."
//                     })
//                 }
//                 // else return the user
//                 return done(null, dbUser);
//             });
//     })
    strategy
);

passport.serializeUser((user, cb)=>{
    cb(null, user);
});

passport.deserializeUser((obj, cb)=>{
    cb(null, obj);
});

module.exports = passport;