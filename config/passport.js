var passport = require('passport');
var user = require('../app/user/models/userModel');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcryptjs');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.uuid);
    });

    passport.deserializeUser(async function (user, done) {
        const userObj = await user.findByPk(uuid);
        done(null, userObj);
    });

    passport.use('login', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async function (req, username, password, done) {
            const user = await UserController.getUserByUsername(username);

            // Username does'nt exist, log error and redirect back
            if(!user) {
                console.log('User not found with username ' + username);
                return done(null, false, req.flash('message', 'User not found'));
            }

            if(!status) {
                console.log('Account is not active for ' + username);
                return done(null, false, req.flash('message', 'Your account is not active!'));
            }

            // User exists but password is wrong, log the error
            isValidPassword(user, password).then((result) => {
                if(!result) {
                    console.log('Invalid Password');
                    return done(null, false, req.flash('message', 'Invalid Password'));
                }
                return done(null, user);
            })
        }
    ));
}

var isValidPassword = async function(user, password) {
    console.log(createHash(password));

    var match = await bCrypt.compare(password, user.password);
    if(match === true) {
        return true;
    } else {
        return false;
    }
}

// Generate hash using bCrypt
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
