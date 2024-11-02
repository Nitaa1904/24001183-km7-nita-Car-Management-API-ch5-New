const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const hashedPassword = await bcrypt.hash("password123", 10); // Contoh password yang dienkripsi

        return queryInterface.bulkInsert('Auths', [
            {
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'user@example.com',
                password: hashedPassword,
                role: 'user',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Auths', null, {});
    }
};
