var bcrypt = require('bcryptjs');
const passport = require('../config/passport');

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.beforeCreate(user => {
        user.password = bcrypt.hashSync(
          user.password,
          bcrypt.genSaltSync(10),
          null
        );
    });

    User.prototype.validPassword = (password, user) => {
        console.log("password " + password + " and " + user.password)
        if(!user.password)
            return false;
        return bcrypt.compareSync(password, user.password);
    }
    
    // User.prototype.validPassword = (password) => {
    //     return bcrypt.compareSync(password, this.password);
    // }

    return User;

    // User.hook("beforeCreate", (user)=>{
    //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10),null);
    // });
    // return User;
};