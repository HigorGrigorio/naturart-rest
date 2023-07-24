'use strict';

const {DataTypes, literal} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('sensortypeproduct', {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        idSensorType: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true,
        },
        idProduct: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP'),
        },
    });
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('SensorTypeProduct')
  }
};
