'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    static associate(models) {
      // Definisikan asosiasi di sini jika ada
      // Contoh: Auth.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Auth.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize, // Pastikan ini terisi dengan objek sequelize yang benar
      modelName: 'Auth',
    }
  );

  return Auth;
};
