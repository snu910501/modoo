const Sequelize = require('sequelize');

module.exports = class PropertyOfDong extends Sequelize.Model{
  static init(sequelize) {
    return super.init(
      {
        nameOfDong: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        numOfDong: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lat: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lng: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "PropertyOfDong",
        tableName: "propertyOfDongs",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}