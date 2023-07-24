'use strict';

const {DataTypes, literal} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('invoice', {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        invoiceNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isNull: {
                msg: 'The invoice number cannot be null'
            }
        },
        invoiceValue: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            isNull: {
                msg: 'The invoice value cannot be null'
            }
        },
        invoiceDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP')
        },
        idClient: {
          type: DataTypes.INTEGER.UNSIGNED
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
    })
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('Invoice');
  }
};
