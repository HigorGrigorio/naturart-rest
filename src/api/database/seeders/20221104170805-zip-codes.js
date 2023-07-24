'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('zipcode', [
            {
                id: 1,
                code: '16265000',
                idCity: 1,
                idDistrictCity: 16,
                idStreetCity: 16
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ZipCode', null, {});
    }
};
