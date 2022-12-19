'use strict';

const {literal} = require("sequelize");

module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.bulkInsert('City', [
            {
                id: 1,
                name: 'Buritama',
                idState: 1,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
            {
                id: 2,
                name: 'Brejo Alegre',
                idState: 1,
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            }
        ], {})
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete('City', null, {});
    }
};
