const express = require('express');
const uploads = require('../middlewares/uploader');
const carController = require('../controllers/carController');

const router = express.Router();

router.get('/:id', carController.getCarById);
router.post('/', uploads.single('images'), carController.createCar);
router.patch('/:id', uploads.single('images'), carController.updateCar);
router.delete('/:id', carController.deleteCar);

module.exports = router;
