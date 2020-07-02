const Sequelize = require('sequelize');

// setup User model and its fields.
var RoleModel = db.define(
    "roles",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['role_name']
            }
        ]
    },
    {
        engine: 'InnoDB',
        charset: 'utf8mb4'
    }
);

// create all the defined tables in the specified database.
RoleModel.sync()
    .then(() =>
        console.log(
            "user roles table has been successfully created, if one doesn't exist"
        )
    )
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = RoleModel;
