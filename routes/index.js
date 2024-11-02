const router = require("express").Router();

const User = require("./userRoutes");
const Car = require("./carRoutes");

router.use("/users", User);
router.use("/Cars", Car);

module.exports = router
