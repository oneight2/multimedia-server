var express = require("express");
var router = express.Router();

// Route
const authRouter = require("./auth");
const userRouter = require("./user");
const roleRouter = require("./role");

// ENDPOINT

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/roles", roleRouter);

module.exports = router;
