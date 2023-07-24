'use strict';

const {literal} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */

        return await queryInterface.createTable('zipcode', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true,
            },
            code: {
                type: Sequelize.STRING,
                allowNull: false,
                isNull: {
                    msg: 'The code of zip code cannot has be null.'
                }
            },
            idStreetCity: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            idCity: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            idDistrictCity: {
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
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ZipCode');
    }
};
