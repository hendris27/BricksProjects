"use strict"
const { faker } = require("@faker-js/faker")

let dataProduct = []

for (let index = 0; index < 100; index++) {
  dataProduct.push({
    categoryId: faker.number.int({ min: 1, max: 3 }),
    sku: faker.number.hex({ min: 0, max: 65535 }),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    weight: faker.number.int({ min: 1 }),
    width: faker.number.int({ min: 1 }),
    length: faker.number.int({ min: 1 }),
    height: faker.number.int({ min: 1 }),
    image: faker.image.url(),
    price: faker.number.int({ min: 1000 })
  })
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", dataProduct, {})
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
