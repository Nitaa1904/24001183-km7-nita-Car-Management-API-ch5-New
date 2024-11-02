const router = require("express").Router();

const User = require("./userRoutes");
const Car = require("./carRoutes");
const Auth = require("./authRoutes");

router.use("/users", User);
router.use("/cars", Car);
router.use('/', Auth); 

module.exports = router
