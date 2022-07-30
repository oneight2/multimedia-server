var express = require("express");
var router = express.Router();

// Route
const authRouter = require("./auth");
const userRouter = require("./user");
const roleRouter = require("./role");
const departementRouter = require("./departement");

// ENDPOINT

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/roles", roleRouter);
router.use("/departements", departementRouter);

module.exports = router;
