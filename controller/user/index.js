const User = require("../../models").User;
const response = require("../../helpers/response")
const Joi = require('joi')


module.exports = {
    findAll: async (req, res) => {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        try {
            const data = await User.findAndCountAll({
                limit,
                offset,
            });
            response.success(res, data.rows, "get data all users", page, limit, data.count);
        } catch (err) {
            response.badrequest(res, err.message)
        }

    }
}
