var path = require('path');
var bCrypt = require('bcryptjs');
var userModel = require('../models/userModel');
var roleModel = require('../models/roleModel');

roleModel.hasMany(userModel, {foreignKey: 'role_id', targetKey: 'id'});
userModel.belongsTo(roleModel, {foreignKey: 'role_id', targetKey: 'id'});

class UserController {
    constructor() {
    }
}

UserController.createUser = async function (req, res) {
    const userObj = await userModel.findOne({where: {username: 'admin'}});
    let data = {};

    if(!userObj) {
        console.log(userObj);

        data = [
            {
                role_name: 'Admin',
                created_at: new Date()
            },
            {
                role_name: 'Vendor',
                created_at: new Date()
            },
            {
                role_name: 'User',
                created_at: new Date()
            }
        ];

        await roleModel.bulkCreate(data);

        data = [];

        // creating a admin
        data = {
            username: 'admin',
            email: 'imsouravjangra@gmail.com',
            password: bCrypt.hashSync('123456', bCrypt.genSaltSync(10), null),
            role_id: 1,
            created_at: new Date()
        };

        await userModel.create(data);
    }
    return true;
};

UserController.getUserByUsername = async function (username, callback) {
    try {
        const user = await userModel.findOne({where: {username: username}});
        return user;
    } catch (error) {
        console.log(error);
        return error;
    }
};

UserController.getUserByEmail = async function (email, callback) {
    try {
        const user = await userModel.findOne({where: {email: email}});
        return callback(null, user);
    }catch (err) {
       console.log(err);
       return callback(err, null);
    }
}

UserController.getUserByUsernameWithoutCallback = async function (email) {
    try {
        const user = await userModel.findOne({ where: { email: email } });
        return user;
    } catch (err) {
        console.log(err);
        return err;
    }
};

UserController.getLogin = function (req, res) {
    if(!req.isAuthenticated()) {
        this.createUser();
        res.render('pages/login');
    } else {
        res.redirect('/');
    }
}

UserController.postLogin = function(req, res, next) {
    let isValid = true;
    let message;
    if(!req.body.email && !req.body.password) {
        message = "email and password is required";
        isValid = false;
    } else if(!req.body.email) {
        message = "email is required";
        isValid = false;
    } else if(!req.body.password) {
        message = "password is required";
        isValid = false;
    }
    res.locals.message = message;
    if(isValid) {
        passport.authenticate('login', function (err, user, info) {
            if(err) {
                return next(err); // generates a 500 error
            }
            if(!user) {
                res.locals.message = info.message;
                return res
                    .status(409)
                    .render("pages/login");
            }
            req.login(user, function (err) {
                if(err) {
                    console.error(err);
                    return next(err);
                }
                return res.redirect("/");
            });
        })(req, res, next);
    } else {
        return res.render("pages/login");
    }

}

UserController.getSignup = function (req, res) {
    if(!req.isAuthenticated()) {
        res.render('pages/signup');
    } else {
        res.redirect('/');
    }
}

UserController.postSignup = function (req, res) {
    if(!req.body.email) {
        res.locals.message = "Email cannot be empty";
        return res.render('pages/signup');
    } else if(!req.body.password) {
        res.locals.message = "Password cannot be empty";
        return res.render('pages/signup');
    } else if(!req.body.confirm_pass) {
        res.locals.message = "Passwords do not match";
        return res.render('pages/signup');
    } else if(req.body.role === "0") {
        res.locals.message = "Please select a role";
        return res.render('pages/signup');
    }
    this.getUserByEmail(req.body.email, (err, result) => {
        console.log('email: ', req.body.email);
        console.log('error: ', err);
        console.log('result: ', result);

        if(err) {
            res.locals.message = "Something went wrong!";
            return res.render('pages/signup');
        } else if(!result) {
            req.body.password = bCrypt.hashSync(
                req.body.password,
                bCrypt.genSaltSync(10),
                null
            );
            let data = {};
            data = {
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(10), null),
                role_id: parseInt(req.body.role),
                created_at: new Date()
            };
            console.log('Password: ', req.body.password);
            userModel.create(data, (err, result) => {
                console.log(err);
            });
            return res.redirect('/user');
        } else {
            res.locals.message = "Email already exists!";
            return res.render('pages/signup');
        }
    })
}

UserController.logout = function (req, res) {
    req.logout();
    res.redirect('/');
}

UserController.showProfile = function (req, res) {
    res.render(path.join(BASE_DIR, 'app/user/views', 'profile'), {pageName: 'Profile'});
}

module.exports = UserController;
