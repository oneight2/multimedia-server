var express = require("express");
var router = express.Router();
const { isLogin } = require("../../middleware/auth");

const { findAll } = require("../../controller/user");

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     description: Get Data All Users
 *     responses:
 *       200:
 *         description: Returns a row data users.
 */
router.get("/", isLogin, findAll);

module.exports = router;
