'use strict';

const {literal} = require("sequelize");
module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.bulkInsert('District', [
            {
                id: 1,
                name: 'Centro',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 2,
                name: 'Cohab 1',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 3,
                name: 'Cohab 2',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 4,
                name: 'Livramento',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 5,
                name: 'Cidade Nova',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 6,
                name: 'Distrito industrial',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 7,
                name: 'Interlagos',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 8,
                name: 'Itaparica',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 9,
                name: 'Orla 1',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 10,
                name: 'Barcelona',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 11,
                name: 'Riviera',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 12,
                name: 'Benedito Garcia',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 13,
                name: 'Santa Bárbara',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 14,
                name: 'Zona Rural',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }

        ]);
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete('District', null, {})
    }
};
