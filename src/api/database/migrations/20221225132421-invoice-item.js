'use strict';

const {DataTypes, literal} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.createTable('InvoiceItem', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            quantity: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                isNull: {
                    msg: 'The quantity of invoice item cannot be null'
                },
            },
            unitPrice: {
                type: Sequelize.FLOAT,
                allowNull: false,
                isNull: {
                    msg: 'The unit price of invoice item cannot be null'
                },
            },
            serialCode: {
                type: Sequelize.STRING,
                allowNull: false,
                isNull: {
                    msg: "The serial code of invoice item cannot be null"
                },
                unique: true
            },
            idInvoice: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                isNull: {
                    msg: 'The id of product cannot be null'
                }
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

    async down(queryInterface, Sequelize) {
        return await queryInterface.dropTable('InvoiceItem');
    }
};
