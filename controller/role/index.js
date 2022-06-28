const Role = require("../../models").Role;
const response = require("../../helpers/response");
const Joi = require("joi");

module.exports = {
  findAll: async (req, res) => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const offset = (page - 1) * limit;
    try {
      const data = await Role.findAndCountAll({
        limit,
        offset,
      });
      response.success(
        res,
        data,
        "Success get all data role",
        page,
        limit,
        offset
      );
    } catch (err) {
      response.badrequest(res, err.message);
    }
  },
  findOne: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Role.findByPk(id);
      if (data)
        return response.success(
          res,
          data,
          "Success get data role",
          null,
          null,
          null
        );
      response.badrequest(res, `Role with id ${id} is not found`);
    } catch (err) {
      response.badrequest(res, err.message);
    }
  },
  create: async (req, res) => {
    const { name, description, createdBy } = req.body;
    try {
      const { value, error } = bodySchema.validate({ name, description });
      if (error) return response.badrequest(res, error.message);

      const data = await Role.create({
        ...value,
        createdBy: JSON.stringify(createdBy),
      });
      response.success(res, data, "Successfully create role", null, null, null);
    } catch (err) {
      response.badrequest(res, err.message);
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { name, description, updatedBy } = req.body;
    try {
      const { value, error } = bodySchema.validate({ name, description });
      if (error) return response.badrequest(res, error.message);

      const data = await Role.update(
        {
          ...value,
          updatedBy: JSON.stringify(updatedBy),
        },
        {
          where: { id },
        }
      );
      if (data > 0)
        return response.success(
          res,
          data,
          "Successfully update role",
          null,
          null,
          null
        );
      response.badrequest(res, `Role with id ${id} is not found`);
    } catch (err) {
      response.badrequest(res, err.message);
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Role.destroy({ where: { id } });
      if (data > 0)
        return response.success(
          res,
          data,
          "Successfully delete role",
          null,
          null,
          null
        );
      response.badrequest(res, `Role with id ${id} is not found`);
    } catch (err) {
      response.badrequest(res, err.message);
    }
  },
};

const bodySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
