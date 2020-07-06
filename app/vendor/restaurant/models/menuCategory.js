const Sequelize = require('sequelize');

var MenuCategoryRestaurantModel = db.define("menu_category_restaurants", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    engine: 'InnoDB',
    charset: 'utf8mb4',
    timestamps: true
});

MenuCategoryRestaurantModel.sync()
    .then(() => {
        console.log("menu category table has been successfully created, if one does'nt exist");
    })
    .catch((err) => {
        console.log('Error has been occurred: ', err);
    });

module.exports = MenuCategoryRestaurantModel;

