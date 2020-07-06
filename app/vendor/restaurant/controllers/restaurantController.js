var menuModel = require('../models/menuModel');
var menuCategory = require('../models/menuCategory');
var restaurantModel = require('../models/restaurantModel');
const path = require('path');
const capitalize = require('../../../../helpers/stringHelper');

menuCategory.hasMany(menuModel, {foreignKey: 'category_id', targetKey: 'id'});
menuModel.belongsTo(menuCategory, {foreignKey: 'category_id', targetKey: 'id'});

// one to many relationship between restaurantModel and menuModel
restaurantModel.hasMany(menuModel, {foreignKey: 'restaurant_id', targetKey: 'id'});

// one to one relationship between menuModel and restaurantModel
menuModel.belongsTo(restaurantModel, {foreignKey: 'restaurant_id', targetKey: 'id'});

class RestaurantController {

    constructor() {

    }
}

RestaurantController.createRestaurant = async function (req, res) {
    const restaurantObj = restaurantModel.findOne();
    var menu_category = {};
    var restaurants = {};
    var menu_items = {};

    menu_category = [{
        name: "North Indian"
    }, {
        name: "South Indian"
    }, {
        name: "Chinese"
    }, {
        name: "Punjabi"
    }];

    restaurants = [{
        name: "Om Sweets",
        location: "Sector-4,Gurugram"
    }, {
        name: "Bikanerwala",
        location: "Sector-14,Gurugram"
    }, {
        name: "Haldirams",
        location: "Sector-14,Gurugram"
    }];

    menu_items = [{
        name: "Dal Makhni",
        price: 180,
        quantity: 1,
        unit: 'kg',
        category_id: 1,
        restaurant_id: 1
    }, {
        name: "Dal Makhni",
        price: 180,
        quantity: 1,
        unit: 'kg',
        category_id: 1,
        restaurant_id: 2
    }, {
        name: "Dal Makhni",
        price: 180,
        quantity: 1,
        unit: 'kg',
        category_id: 1,
        restaurant_id: 3
    }];

    await menuCategory.bulkCreate(menu_category);
    await restaurantModel.bulkCreate(restaurants);
    await menuModel.bulkCreate(menu_items);
};

RestaurantController.showAll = async function (req, res) {
    var pageName = "Restaurants";
    var username = capitalize(req.user.firstname) + " " + capitalize(req.user.lastname);
    const restaurants = await restaurantModel.findAll();
    res.render(path.join(BASE_DIR, 'app/vendor/restaurant/views','index'),{pageName: pageName, username: username, restaurants: restaurants});
}

RestaurantController.add = function (req, res) {
    var pageName = "Restaurants";
    var username = capitalize(req.user.firstname) + " " + capitalize(req.user.lastname);
    res.render(path.join(BASE_DIR, 'app/vendor/restaurant/views','add'),{pageName: pageName, username: username});
}

RestaurantController.update = function (req, res) {
    console.log(req);
    var pageName = "Restaurants";
    var username = capitalize(req.user.firstname) + " " + capitalize(req.user.lastname);
    res.render(path.join(BASE_DIR, 'app/vendor/restaurant/views','update'),{pageName: pageName, username: username});
}

RestaurantController.delete = function (req, res) {
    var pageName = "Restaurants";
    var username = capitalize(req.user.firstname) + " " + capitalize(req.user.lastname);
    res.render(path.join(BASE_DIR, 'app/vendor/restaurant/views','delete'),{pageName: pageName, username: username});
}

module.exports = RestaurantController;
