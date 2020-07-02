'use strict';

var mysql = require('mysql');
var Sequelize = require('sequelize');
var Promise = require('bluebird');

// creates async methods on the mysql library
Promise.promisifyAll(mysql);

global.Promise = Promise;

var dbConfig = {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
};

var connection;

function handleDisconnect () {
    connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    })
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    })
    Promise.promisifyAll(connection);
    // console.log(connection);
    global.db = connection;
};

var sequelize;
function sequelizeConnection() {
    sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
        host: config.db.host,
        port: 3306,
        dialect: 'mysql',
        define: {
            timestamps: false,
            freezeTableName: true
        },
        timezone: '+05:30'
    });
    sequelize.authenticate()
        .then(() => {
            console.log("Connection has been established successfully!");
        }).catch((err) => {
            console.error("Unable to connect to the database", err);
    });

    global.db = sequelize;
};

sequelizeConnection();
