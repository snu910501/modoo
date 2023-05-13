const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      userKey : {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      userPassword: {
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
      userBusinessLicenseImgUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userProfileImgUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userCompanyTelNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      approved: {
        type : Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false,
      }

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