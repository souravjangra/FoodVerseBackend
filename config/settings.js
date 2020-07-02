config.host = process.env.HOST;
config.hostName = process.env.HOST_NAME;

config.port = process.env.PORT;

config.db = {};

config.db.host = process.env.DB_HOST;
config.db.user = process.env.DB_USERNAME;
config.db.password = process.env.DB_PASSWORD;
config.db.database = process.env.DB_DATABASE;

module.exports = config;
