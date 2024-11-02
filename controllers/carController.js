const { Car } = require('../models');
const { Op } = require("sequelize");
const imagekit = require('../lib/imagekit'); // Pastikan sudah mengimpor imagekit

// Mendapatkan semua mobil dengan pagination
const getAllCars = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

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

// Mendapatkan mobil berdasarkan ID
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

// Membuat mobil baru
const createCar = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ status: "Error", message: "Image file is required" });
        }

        const split = file.originalname.split(".");
        const ext = split[split.length - 1];
        const { name, stock, price, status, no_plat, tahun, userId } = req.body;

        // Mengunggah gambar ke ImageKit
        const uploadedImage = await imagekit.upload({
            file: file.buffer,
            fileName: `${split[0]}-${Date.now()}.${ext}`,
        });

        if (!uploadedImage) {
            return res.status(500).json({ status: "Error", message: "Failed to upload image to ImageKit" });
        }

        // Membuat entri mobil baru dengan gambar yang diunggah
        const newCar = await Car.create({
            name,
            images: [uploadedImage.url], // Menyimpan sebagai array sesuai dengan model
            stock,
            price,
            status,
            no_plat,
            tahun,
            userId,
        });

        res.status(201).json({ status: "Success", message: "Car created successfully", data: newCar });
    } catch (error) {
        res.status(500).json({ status: "Error", message: "Failed to create car", error: error.message });
    }
};

// Mengupdate mobil berdasarkan ID
const updateCar = async (req, res) => {
    const { name, stock, price, status, no_plat, tahun } = req.body;
    const file = req.file;

    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).json({ status: "Error", message: "Car not found" });
        }

        let imageUrl = car.images;
        if (file) {
            const split = file.originalname.split(".");
            const ext = split[split.length - 1];
            
            const uploadResponse = await imagekit.upload({
                file: file.buffer,
                fileName: `${split[0]}-${Date.now()}.${ext}`,
            });
            imageUrl = [uploadResponse.url];
        }

        await car.update({
            name,
            images: imageUrl,
            stock,
            price,
            status,
            no_plat,
            tahun,
        });

        res.status(200).json({ status: "Success", message: "Car updated successfully", data: car });
    } catch (error) {
        res.status(500).json({ status: "Error", message: "Failed to update car", error: error.message });
    }
};

// Menghapus mobil berdasarkan ID
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
