'use strict';

const {literal} = require("sequelize");
module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.bulkInsert('State', [
            {
                id: 1,
                name: 'São Paulo',
                initials: 'SP',
                updatedAt: literal('CURRENT_TIMESTAMP'),
                createdAt: literal('CURRENT_TIMESTAMP')
            },
        ], {})
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete('State', null, {});
    }
};
