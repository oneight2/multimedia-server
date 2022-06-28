var express = require("express");
var router = express.Router();
const { isLogin } = require("../../middleware/auth");

const {
  register,
  login,
  findAccountByVendor,
  delete: remove,
  update,
} = require("../../controller/auth");

/**
 * @openapi
 * /api/v1/signin:
 *   post:
 *     description: Login schema
 *     parameters:
 *      - email:syarif.cibatu@gmail.com
 *        password:rahasia
 *     responses:
 *       200:
 *         description: Returns jwt token.
 */
router.post("/signin", login);
// router.put("/:id", uploadProfilePicture.single("picture"), isLogin, update);
// router.delete("/:id", isLogin, remove);

module.exports = router;
