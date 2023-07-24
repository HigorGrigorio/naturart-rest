'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.bulkInsert('invoice', [
            {
                id: 1,
                idClient: 1,
                invoiceNumber: '0000000001',
                invoiceDate: '2021-07-20',
                invoiceValue: 0,
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
