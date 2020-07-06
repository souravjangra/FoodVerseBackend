const Sequelize = require('sequelize');

var MenuItemRestaurantModel = db.define("menu_item_restaurants", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    quantity: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    unit: {
        type: Sequelize.ENUM,
        values: ['gm','kg','ltr','ml'],
        defaultValue: 'kg',
    },
    category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    engine: 'InnoDB',
    charset: 'utf8mb4',
    timestamps: true
});

MenuItemRestaurantModel.sync()
    .then(() => {
        console.log("menu items table has been successfully created, if one does'nt exist");
    })
    .catch((err) => {
        console.log('Error has been occurred: ', err);
    });

module.exports = MenuItemRestaurantModel;

