'use strict';

const {literal} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Street', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                isNull: {
                    msg: 'The state name cannot has be null.'
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
        }   );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Street');
    }
};
