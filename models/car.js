'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models/car.js
      Car.associate = function(models) {
        Car.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      };
    }
  }
  Car.init({
    name: DataTypes.STRING,
    images: DataTypes.ARRAY(DataTypes.STRING),
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    no_plat: DataTypes.STRING,
    tahun: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};