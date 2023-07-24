'use strict';

const {DataTypes, literal} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.createTable('localization', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            latitude: {
                type: Sequelize.FLOAT,
                allowNull: false,
                isNull: {
                    msg: 'The latitude of localization cannot be null.'
                }
            },
            longitude: {
                type: Sequelize.FLOAT,
                allowNull: false,
                isNull: {
                    msg: 'The longitude of localization cannot be null.'
                }
            },
            idProduct: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                isNull: {
                    msg: 'The localization can not be inserted without product.'
                }
            },
            startDate: {
                type: Sequelize.DATE,
                allowNull: false,
                isNull: {
                    msg: 'The start date of localization can not be null.'
                }
            },
            endDate: {
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
        return await queryInterface.dropTable('Localization')
    }
};
