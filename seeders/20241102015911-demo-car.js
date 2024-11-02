// seeders/XXXX-demo-car.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cars', [
      {
        name: 'Toyota Avanza',
        images: ['https://example.com/car1.jpg', 'https://example.com/car2.jpg'],
        stock: 10,
        price: 300000,
        userId: 1, // pastikan userId sesuai dengan id di tabel User
        status: 'available',
        no_plat: 'B 1234 XYZ',
        tahun: 2020,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Honda Jazz',
        images: ['https://example.com/car1.jpg', 'https://example.com/car2.jpg'],
        stock: 5,
        price: 350000,
        userId: 2, // pastikan userId sesuai dengan id di tabel User
        status: 'available',
        no_plat: 'D 5678 ABC',
        tahun: 2019,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cars', null, {});
  }
};
