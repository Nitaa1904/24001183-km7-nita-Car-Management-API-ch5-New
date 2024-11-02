'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    const saltRounds = 10; // Jumlah putaran salt untuk bcrypt

    for (let i = 0; i < 100; i++) { // Menghasilkan 100 data dummy
      const password = 'password123'; // Password dummy sebelum di-hash
      const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash password

      users.push({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: hashedPassword, // Simpan password yang sudah di-hash
        phone: faker.phone.number('08##########'), // Format nomor telepon Indonesia
        alamat: faker.address.streetAddress(),
        role: faker.helpers.arrayElement(['customer', 'admin']),
        foto_profil: faker.image.avatar(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
