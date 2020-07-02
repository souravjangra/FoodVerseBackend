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

UserController.getLogin = function (req, res) {
}
