'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('departements', [
      {
        name: 'IT & Multimedia',
        description: 'Departement yang menaungi segala urusan IT',
        createdAt: new Date(),
        createdBy: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
      {
        name: 'Percetakan',
        description: 'Departement yang menaungi segala urusan Percetakan',
        createdAt: new Date(),
        createdBy: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('departements', null, {});

  }
};
