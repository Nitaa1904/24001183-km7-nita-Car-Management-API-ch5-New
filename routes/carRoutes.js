const express = require('express');
const { getAllCars, getCarById, createCar, updateCar, deleteCar } = require('../controllers/carController');

const router = express.Router();

router.get('/', getAllCars);
router.get('/:id', getCarById);
router.post('/', createCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

module.exports = router;
