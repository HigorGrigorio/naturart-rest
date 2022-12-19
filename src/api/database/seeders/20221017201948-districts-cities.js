'use strict';

const {literal} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('DistrictCity', [
            {
                id: 1,
                idCity: 1,
                idDistrict: 1,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 2,
                idCity: 1,
                idDistrict: 2,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 3,
                idCity: 1,
                idDistrict: 3,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 4,
                idCity: 1,
                idDistrict: 4,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 5,
                idCity: 1,
                idDistrict: 5,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 6,
                idCity: 1,
                idDistrict: 6,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 7,
                idCity: 1,
                idDistrict: 7,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 8,
                idCity: 1,
                idDistrict: 8,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 9,
                idCity: 1,
                idDistrict: 9,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 10,
                idCity: 1,
                idDistrict: 10,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 11,
                idCity: 1,
                idDistrict: 11,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 12,
                idCity: 1,
                idDistrict: 12,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 13,
                idCity: 1,
                idDistrict: 13,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 14,
                idCity: 1,
                idDistrict: 14,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 15,
                idCity: 2,
                idDistrict: 1,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 16,
                idCity: 2,
                idDistrict: 14,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
        ], {})
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete('DistrictCity', null, {});
    }
};
