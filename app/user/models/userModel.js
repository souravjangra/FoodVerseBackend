const Sequelize = require('sequelize');

var UserModel = db.define("users", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
      type: Sequelize.TINYINT,
      defaultValue: 1
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    role_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['username', 'email']
        }
    ]
}, {
    engine: 'InnoDB',
    charset: 'utf8mb4'
});

UserModel.sync()
    .then(() => {
        console.log("users table has been successfully created, if one does'nt exist");
    }).catch(error => console.log('Error has been occurred : ', error));

module.exports = UserModel;
