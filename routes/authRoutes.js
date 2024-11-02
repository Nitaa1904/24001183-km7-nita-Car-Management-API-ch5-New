const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");

router.post("/register", authController.register);
router.post('/login', authController.login);
router.get("/token", authenticate, authController.tokenChecker);

module.exports = router;
