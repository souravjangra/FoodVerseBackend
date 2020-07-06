const Sequelize = require('sequelize');

var RestaurantModel = db.define("restaurants", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    engine: 'InnoDB',
    charset: 'utf8mb4',
    timestamps: true
});

RestaurantModel.sync()
    .then(() => {
        console.log("restaurants table has been successfully created, if one does'nt exist");
    })
    .catch((err) => {
        console.log('Error has been occurred: ', err);
    });

module.exports = RestaurantModel;

