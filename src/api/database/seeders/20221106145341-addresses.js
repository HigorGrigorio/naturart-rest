'use strict';

const {query} = require("express");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Address', [{
        id: 1,
        idDistrictCity: 1,
        idStreetCity: 17,
        idZipCode: 1,
        idClient: 1
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
