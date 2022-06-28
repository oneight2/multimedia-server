var express = require("express");
var router = express.Router();
const { isLogin } = require("../../middleware/auth");

const {
  findAll,
  findOne,
  create,
  update,
  delete: remove,
} = require("../../controller/role");

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
router.get("/:id", isLogin, findOne);
router.post("/created", isLogin, create);
router.put("/updated/:id", isLogin, update);
router.delete("/deleted/:id", isLogin, remove);

module.exports = router;
