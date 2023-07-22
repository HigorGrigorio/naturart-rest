'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      return await queryInterface.bulkInsert('Client',[
          {
              id: 1,
              name: 'Higor Grigorio dos Santos',
              cpf: '48494370871',
              birthDate: '2001-12-23',
              email: 'higorgrigorio@gmail.com',
              password: '$2b$10$oZxlCAOJJiU9MywF5qqyYO6byTT8yGQ0XtxQhHVVIWDP0rGIVmJU.', // 123456
              telephone: '+5518998091195',
              idAddress: 1
          },
      ])
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
