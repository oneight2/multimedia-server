const Departement = require("../../models").Departement;
const response = require("../../helpers/response");
const Joi = require("joi");

module.exports = {
  findAll: async (req, res) => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const offset = (page - 1) * limit;
    try {
      const data = await Departement.findAndCountAll({
        limit,
        offset,
      });
      response.success(
        res,
        data,
        "Success get all data departement",
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
      const data = await Departement.findByPk(id);
      if (data)
        return response.success(
          res,
          data,
          "Success get data departement",
          null,
          null,
          null
        );
      response.badrequest(res, `Departement with id ${id} is not found`);
    } catch (err) {
      response.badrequest(res, err.message);
    }
  },
  create: async (req, res) => {
    const { name, description, createdBy } = req.body;
    try {
      const { value, error } = bodySchema.validate({ name, description });
      if (error) return response.badrequest(res, error.message);

      const data = await Departement.create({
        ...value,
        createdBy: JSON.stringify(createdBy),
      });
      response.success(res, data, "Successfully create departement", null, null, null);
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

      const data = await Departement.update(
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
          "Successfully update departement",
          null,
          null,
          null
        );
      response.badrequest(res, `Departement with id ${id} is not found`);
    } catch (err) {
      response.badrequest(res, err.message);
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Departement.destroy({ where: { id } });
      if (data > 0)
        return response.success(
          res,
          data,
          "Successfully delete departement",
          null,
          null,
          null
        );
      response.badrequest(res, `Departement with id ${id} is not found`);
    } catch (err) {
      response.badrequest(res, err.message);
    }
  },
};

const bodySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
