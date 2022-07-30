const { Sequelize, Op, DataTypes } = require("sequelize");
const database = require("../config/database");
const Logger = require("../middleware/logger");

const env = process.env.NODE_ENV || "development";

const sequelize = new Sequelize(database[env].database, database[env].username, database[env].password, {
  host: database[env].host,
  dialect: database[env].dialect,
  port: database[env].port,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
  logging: (msg) => Logger.info(msg),
  
});

module.exports.sequelize = sequelize;
module.exports.Op = Op;
module.exports.DataTypes = DataTypes;
