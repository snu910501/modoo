const Sequelize = require('sequelize');

module.exports = class PropertyImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      imgOfPropertyId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      estateId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imgOfUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imgIndex: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

    },
      {
        sequelize,
        timestamps: false,
        modelName: 'PropertyImage',
        tableName: 'propertyImages',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      })
  }
}