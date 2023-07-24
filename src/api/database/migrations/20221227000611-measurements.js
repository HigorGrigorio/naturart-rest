'use strict';

const {literal} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('measurement', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            value: {
                type: Sequelize.FLOAT,
                allowNull: false,
                isNull: {
                    msg: 'The value of measurement cannot be null.'
                }
            },
            idSensorTypeProduct: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            measurementDate: {
                type: Sequelize.DATE,
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
        })
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.dropTable('Measurement')
    }
};
