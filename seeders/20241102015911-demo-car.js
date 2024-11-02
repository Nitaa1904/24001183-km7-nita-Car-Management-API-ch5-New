'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cars = [];

    for (let i = 0; i < 50; i++) {
      cars.push({
        name: faker.vehicle.vehicle(),
        images: ['https://auto2000.co.id/berita-dan-tips/_next/image?url=https%3A%2F%2Fastradigitaldigiroomuat.blob.core.windows.net%2Fstorage-uat-001%2Fjenis-mobil-listrik.png&w=3840&q=75'], // URL gambar default
        stock: faker.number.int({ min: 1, max: 20 }),
        price: faker.number.int({ min: 200000, max: 500000 }),
        userId: faker.number.int({ min: 1, max: 10 }),
        status: faker.helpers.arrayElement(['available', 'unavailable']),
        no_plat: `B ${faker.number.int({ min: 1000, max: 9999 })} XYZ`,
        tahun: faker.number.int({ min: 2000, max: 2023 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Cars', cars, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cars', null, {});
  }
};
