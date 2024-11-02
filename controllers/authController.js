const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Auth, User } = require('../models');

const register = async (req, res, next) => {
  try {
    res.status(201).json({
      status: "Success",
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: "An error occurred during registration",
      data: null,
    });
  }
};

const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      console.log("Email:", email); // Debug log
      console.log("Password:", password); // Debug log
  
      const data = await Auth.findOne({ // Pastikan ini menggunakan Auth, bukan Auths
        include: [
          {
            model: User,
            as: "user",
          },
        ],
        where: {
          email,
        },
      });
  
      console.log("User data found:", data); // Debug log
  
      if (!data) {
        return res.status(404).json({
          status: "Failed",
          message: "User does not exist",
          isSuccess: false,
          data: null,
        });
      }
  
      if (data && bcrypt.compareSync(password, data.password)) { 
        const token = jwt.sign(
          {
            id: data.id,
            username: data.user.name,
            email: data.email,
            userId: data.user.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRED,
          }
        );
  
        res.status(200).json({
          status: "Success",
          message: "Berhasil login",
          isSuccess: true,
          data: {
            username: data.user.name,
          },
        });
      } else {
        res.status(401).json({
          status: "Failed",
          message: "Incorrect password",
          isSuccess: false, 
          data: null,
        });
      }
    } catch (err) {
      console.error("Error in login function:", err); // Debug log
      res.status(500).json({ 
        status: "Failed",
        message: "An error occurred",
        data: null,
      });
    }
  };
  

const authenticate = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: "An error occurred",
      data: null,
    });
  }
};
  

const getAllUsers = async (req, res) => {
    try {
      const users = await Auth.findAll(); // Mengambil semua pengguna
      res.status(200).json({
        status: "Success",
        data: users,
      });
    } catch (err) {
      res.status(500).json({
        status: "Failed",
        message: "An error occurred while retrieving users",
        data: null,
      });
    }
  };

  
module.exports = {
  register,
  login,
  authenticate,
  getAllUsers,
};
