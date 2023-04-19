const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      userPassword: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userPasswordCheck: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userPhoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userCompanyName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userBusinessLocation: {
        type: Sequelize.STRING,
        allowNull: true,
      },

    },
      {
        sequelize,
        timestamps: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      })
  }
}