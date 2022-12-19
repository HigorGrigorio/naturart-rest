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
              password: '123456',
              telephone: '+5518998091195'
          },
          {
              id: 2,
              name: 'Erick de Sousa Almeida',
              cpf: '12345678901',
              birthDate: '2002-5-11',
              email: 'erickzikabta@gmail.com',
              password: '123456',
              telephone: '+5518123456789'
          },
      ])

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
