const Sequelize = require('sequelize');
const Users = require("./user");
const Estate = require('./estate');
const PropertyImg = require('./propertyImg');
const PropertyOfDong = require('./propertyOfDong');

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
db.Estate = Estate;
db.PropertyImg = PropertyImg;
db.PropertyOfDong = PropertyOfDong;

Users.init(sequelize);
Estate.init(sequelize);
PropertyImg.init(sequelize);
PropertyOfDong.init(sequelize);

module.exports = db;