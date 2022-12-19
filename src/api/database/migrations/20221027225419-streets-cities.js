'use strict';

const {literal} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('StreetCity', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        idStreetType: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        idCity: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        idStreet: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP'),
        },
    });
  },

  async down (queryInterface, Sequelize) {

  }
};
