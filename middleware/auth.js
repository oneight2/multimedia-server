const jwt = require("jsonwebtoken");
const User = require("../models").User;
const response = require("../helpers/response");
require("dotenv").config();
module.exports = {
  isLogin: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : response.unauthorized(res, 'Unauthorized')

      const key = process.env.JWT_KEY;

      const data = jwt.verify(token, key);
      const user = await User.findOne({ id: data.user.id });
      if (!user) {
        throw new Error();
      }
      req.user = user;
      req.token = token;
      next();
    } catch (err) {
      response.unauthorized(res, err.message);
    }
  },
};
