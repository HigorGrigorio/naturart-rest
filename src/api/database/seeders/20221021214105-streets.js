'use strict';

const {literal} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('street', [
            {
                id: 1,
                name: 'Manoel Rodrigues Máximo',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 2,
                name: 'Rua Wenceslau Braz',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 3,
                name: 'Frei Marcelo Manilla',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 4,
                name: 'Centro',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 5,
                name: 'Alameda 1',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 6,
                name: 'Alameda 2',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 7,
                name: 'Alameda 3',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 8,
                name: 'Alameda 4',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 9,
                name: 'Alameda 5',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 10,
                name: 'Alameda 6',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 11,
                name: 'Alameda 7',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 12,
                name: 'Alameda 8',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 13,
                name: 'Alameda 9',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 14,
                name: 'Alameda Pau Preto',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 15,
                name: 'Rua das Palmeiras',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete('Street', null, {});
    }
};
