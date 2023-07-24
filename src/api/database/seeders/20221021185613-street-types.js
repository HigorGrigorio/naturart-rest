'use strict';

const {literal} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.bulkInsert('streettype', [
            {
                id: 1,
                name: 'Acesso',
                initials: 'AC',
            },
            {
                id: 2,
                name: 'Acampamento',
                initials: 'ACA',
            },
            {
                id: 3,
                name: 'Acesso Local',
                initials: 'ACL',
            },
            {
                id: 4,
                name: 'Praia',
                initials: 'PR',
            },
            {
                id: 5,
                name: 'Rua',
                initials: 'R',
            },
            {
                id: 6,
                name: 'Residencial',
                initials: 'RES',
            },
        ], {})
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete('StreetType', null, {});
    }
};
