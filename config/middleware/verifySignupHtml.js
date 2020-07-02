const db = require("../../models");

const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if(user) {
            var message = "Failed! Email already in use!";
            res.locals.message = message;
            res.render("pages/signup");
            return;
        }

        next();
    });
}

checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for(let i=0; i<req.body.roles.length;i++) {
            if(!ROLES.includes(req.body.roles[i])) {
                var message = "Failed! Role does not exist = "+req.body.roles[i];
                res.locals.message = message;
                res.render("pages/signup");
                return ;
            }
        }
    }
    next();
}

const verifySignup = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignup;
