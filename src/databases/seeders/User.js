"use strict"
const argon = require("argon2")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await argon.hash("password")
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Robert",
          lastName: "Julios",
          email: "juliosRobert@mail.com",
          password: password
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
