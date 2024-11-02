const { Car } = require('../models');
const { Op } = require("sequelize");

const getAllCars = async (req, res) => {
    try {
      // Mendapatkan page, limit, dan menghitung offset
      const page = parseInt(req.query.page) || 1; // Default page 1 jika tidak ada
      const limit = parseInt(req.query.limit) || 10; // Default limit 10 jika tidak ada
      const offset = (page - 1) * limit; // Menghitung offset berdasarkan page
  
      const cars = await Car.findAndCountAll({
        limit: limit,
        offset: offset,
      });
  
      res.status(200).json({
        totalItems: cars.count,
        totalPages: Math.ceil(cars.count / limit),
        currentPage: page,
        data: cars.rows,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const getCarById = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCar = async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (car) {
      await car.update(req.body);
      res.status(200).json(car);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (car) {
      await car.destroy();
      res.status(200).json({ message: "Car deleted" });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllCars, getCarById, createCar, updateCar, deleteCar };
