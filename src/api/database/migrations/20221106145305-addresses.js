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
        return await queryInterface.createTable('Address', {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true,
            },
            number: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                isNull: {
                    msg: 'The address code cannot has be null.'
                }
            },
            complement: {
                type: DataTypes.STRING,
                allowNull: true
            },
            idDistrictCity: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            idStreetCity: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            idZipCode: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
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

    async down(queryInterface, Sequelize) {
        return await queryInterface.dropTable('Address');
    }
};
