// seeders/XXXX-demo-user.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'hashedpassword1', // Gantilah dengan hash jika perlu
        phone: '081234567890',
        alamat: 'Jl. Mawar No. 1',
        role: 'customer',
        foto_profil: 'https://example.com/profile/johndoe.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'hashedpassword2',
        phone: '081298765432',
        alamat: 'Jl. Melati No. 2',
        role: 'admin',
        foto_profil: 'https://example.com/profile/janesmith.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
