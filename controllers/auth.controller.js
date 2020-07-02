const db = require('../models');

const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { role } = require('../models');

exports.signup = (req, res) => {
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phoneNo: req.body.phoneNo
    }).then(user => {
        if(req.body.roles){
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({message: "User registered successfully!"});
                })
            })
        } else {
            // user role = 1
            user.setRoles([1]).then(()=>{
                res.send({message: "User registered successfully!"});
            })
        }
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(!user) {
            return res.status(404).send({success: false, message: "User Not found."});
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid) {
            return res.status(401).send({
                success: false,
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 // 24 hrs
        });

        var authorities = [];

        user.getRoles().then(roles => {
            for(let i=0;i<roles.length; i++) {
                authorities.push("ROLE_"+roles[i].name.toUpperCase());
            }
            res.status(200).send({
                success: true,
                data: {
                    id: user.id,
                    email: user.email,
                    roles: authorities,
                    accessToken: token,
                    phoneNo: user.phoneNo
                }
            });
        })
    }).catch(err => {
        res.status(500).send({success: false, message: err.message});
    });
}

exports.signup_html = (req, res) => {
    var message;
    if(req.body.password !== req.body.confirm_pass) {
        message = "Passwords do not match.";
        res.locals.message = message;
        res.render('pages/signup');
        return;
    }
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phoneNo: req.body.phoneNo
    }).then(user => {
        if(req.body.roles){
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    message = "User registered successfully!";
                    res.locals.message = message;
                    res.render('pages/signup');
                })
            })
        } else {
            // user role = 1
            user.setRoles([1]).then(()=>{
                message = "User registered successfully!";
                res.locals.message = message;
                res.render('pages/signup');
            })
        }
    }).catch(err => {
        message = err.message;
        res.locals.message = message;
        res.render('pages/signup');
    });
};

exports.signin_html = (req, res) => {
    var message;
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(!user) {
            message = "User Not found.";
            res.locals.message = message;
            return res.render("pages/login");
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid) {
            message = "Invalid Password!";
            res.locals.message = message;
            return res.render("pages/login", {accessToken: null});
        }

        var token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 // 24 hrs
        });

        var authorities = [];

        user.getRoles().then(roles => {
            for(let i=0;i<roles.length; i++) {
                authorities.push("ROLE_"+roles[i].name.toUpperCase());
            }
            message = "Login Successfull";
            res.locals.message = message;
            res.render("pages/login", {data: {
                    id: user.id,
                    email: user.email,
                    roles: authorities,
                    accessToken: token,
                    phoneNo: user.phoneNo
                }});
        })
    }).catch(err => {
        res.status(500).send({success: false, message: err.message});
    });
}
