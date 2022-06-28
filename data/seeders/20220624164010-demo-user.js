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

    await queryInterface.bulkInsert('Users', [{
      name: 'Syarif Hidayat',
      email: 'syarif.cibatu@gmail.com',
      password: '$2b$10$8vr5D/eNF.YSb/zXfGHarOJerapg1rk6dPBDEdPNQ8.rYSw8ySw.C',
      profile: JSON.stringify({
        name: {
          last_name: "No 2",
          first_name: "Murid",
        },
        images: {
          url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
          filename: "photprofildong",
        },
        address: {
          street: "Kp.kapungan RT/RW 02/01",
          village: "Desadesaan",
          subdistrict: "Kecamatandong",
          city: "Garut",
          province: "Jawa barat",
          postal_code: "44184",
        },
      }),
      active: true,
      createdBy: JSON.stringify({
        id: "",
        type: "Seeder",
        description: "created by register seeder",
      }),
      role_id: 1,
      departement_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', null, {})
  }
};
