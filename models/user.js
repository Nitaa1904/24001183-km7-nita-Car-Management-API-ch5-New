'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.associate = function(models) {
        User.hasMany(models.Car, { foreignKey: 'userId', as: 'cars' });
      };
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    alamat: DataTypes.STRING,
    role: DataTypes.STRING,
    foto_profil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};