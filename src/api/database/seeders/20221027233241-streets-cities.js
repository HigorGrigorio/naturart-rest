'use strict';

const {literal} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.bulkInsert('StreetCity', [
            {
                id: 1,
                idStreet: 1,
                idCity: 1,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }, {
                id: 2,
                idStreet: 2,
                idCity: 1,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }, {
                id: 3,
                idStreet: 3,
                idCity: 1,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }, {
                id: 4,
                idStreet: 4,
                idCity: 1,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }, {
                id: 5,
                idStreet: 5,
                idCity: 1,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }, {
                id: 6,
                idStreet: 6,
                idCity: 1,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }, {
                id: 7,
                idStreet: 7,
                idCity: 1,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }, {
                id: 8,
                idStreet: 8,
                idCity: 1,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }, {
                id: 9,
                idStreet: 9,
                idCity: 1,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }, {
                id: 10,
                idStreet: 10,
                idCity: 1,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }, {
                id: 11,
                idStreet: 1,
                idCity: 1,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }, {
                id: 12,
                idStreet: 1,
                idCity: 1,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }, {
                id: 13,
                idStreet: 1,
                idCity: 1,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }, {
                id: 14,
                idStreet: 1,
                idCity: 1,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }, {
                id: 15,
                idStreet: 1,
                idCity: 1,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }, {
                id: 16,
                idStreet: 15,
                idStreetType: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP'),
                idCity: 2
            }
        ])
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete('StreetCity', null, {});
    }
};
