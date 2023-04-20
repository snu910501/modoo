const Sequelize = require('sequelize');
const Users = require("./user");

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env]
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

db.sequelize = sequelize;
db.Users = Users;

Users.init(sequelize);

module.exports = db;