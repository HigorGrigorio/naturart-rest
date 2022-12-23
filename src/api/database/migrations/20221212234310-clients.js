'use strict';

const {query} = require("express");
const {DataTypes, literal} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Client', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                isNull: {
                    msg: 'Username cannot be null'
                }
            },
            cpf: {
                type: Sequelize.STRING,
                allowNull: false,
                isNull: {
                    msg: 'CPF cannot be null'
                }
            },
            birthDate: {
                type: Sequelize.DATE,
                allowNull: false,
                isNull: {
                    msg: 'Birth date cannot be null'
                }
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                isNull: {
                    msg: 'Email cannot be null'
                },
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                isNull: {
                    msg: 'Password cannot be null'
                }
            },
            telephone: {
                type: Sequelize.STRING,
                allowNull: false,
                isNull: {
                    msg: 'Telephone cannot be null'
                }
            },
            idAddress: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true,
                unique: false
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
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};
