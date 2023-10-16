"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const owner = [];
    const auth = [];

    for (let i = 1; i <= 5; i++) {
      owner.push({
        name: `owner ${i}`,
        age: 25 + i,
        role: "owner",
        address: `Adress ${i}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const salt = 10;
      const hashedPassword = bcrypt.hashSync("123456", salt);
      auth.push({
        email: `owner${i}@gmail.com`,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        userId: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Users", owner, {});
    await queryInterface.bulkInsert("Auths", auth, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Auths", null, {});
  },
};
