const Sequelize = require("sequelize");

module.exports = class PropertyOfDefault extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        estateId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lat: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lng: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "PropertyOfDefault",
        tableName: "propertyOfDefaults",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
