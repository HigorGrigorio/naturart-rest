'use strict';

const {DataTypes, literal} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('districtcity', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            idCity: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                isNull: {
                    msg: 'A relationship between a district and a city cannot be entered without informing the district'
                }
            },
            idDistrict: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                isNull: {
                    msg: 'A relationship between a district and a city cannot be entered without informing the city'
                }
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
        await queryInterface.dropTable('DistrictCity');
    }
};
