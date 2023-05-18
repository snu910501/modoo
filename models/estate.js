const Sequelize = require('sequelize');

module.exports = class Estate extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        estateId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true,
        },
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        typeOfProperty: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        addressOfProperty: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dong: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        transactionType: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        deposit: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        monthly: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        price: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        maintenanceCost: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        moveInDate: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        moveInDateInput: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        supplyArea: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        exclusiveArea: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        numOfRoom: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        numOfBath: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        numOfFloor: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        floor: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        parking: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        elevator: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        pet: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        options: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        detail: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lowestFloor: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        highestFloor: {
          type: Sequelize.STRING,
          allowNull: true,
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
        modelName: "Estate",
        tableName: "estates",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}