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
    await queryInterface.bulkInsert('roles', [
      {
        name: "SuperAdmin",
        description: "Can acces all fitur on app",
        createdAt: new Date(),
        createdBy: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
      {
        name: "Admin",
        description: "Can acces some fitur on app",
        createdAt: new Date(),
        createdBy: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
      {
        name: "User",
        description: "client this app",
        createdAt: new Date(),
        createdBy: JSON.stringify({
          id: "",
          type: "Seeder",
          description: "created by register seeder",
        }),
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('roles', null, {})
  }
};
