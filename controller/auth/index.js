const User = require("../../models").User;
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const Joi = require("joi")
const fs = require("fs");
const response = require("../../helpers/response")
require("dotenv").config();


const { JWT_KEY } = process.env

module.exports = {
    register: async (req, res) => {
        try {
            const payload = req.body;
            const valid = await User.findOne({ where: { email: payload.email } });
            if (valid === null) {
                if (req.file !== undefined || null) {
                    const picture = req.file.filename;
                    const user = await User.create({
                        ...payload,
                        picture,
                    });
                    res.status(200).json({
                        status: true,
                        message: "Success",
                        data: user,
                    });
                } else {
                    const user = await User.create({
                        ...payload,
                    });
                    res.status(200).json({
                        status: true,
                        message: "Success",
                        data: user,
                    });
                }
            } else {
                res.status(400).json({
                    status: false,
                    message: "Email already registered",
                    data: {},
                });
            }
        } catch (err) {
            res.status(500).json({
                status: false,
                message: err.message,
            });
        }
    },
    login: async (req, res) => {
        const { body } = req;
        try {
            const { value, error } = loginSchema.validate(body);
            if (error) return response.badrequest(res, error.message);

            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (user) {
                const valid = await bcrypt.compare(password, user.password);
                if (valid) {
                    const token = Jwt.sign(
                        {
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                            },
                        },
                        JWT_KEY
                    );

                    response.success(res, token, "login successfuly", null, null, null)
                    res.status(200).json({
                        status: true,
                        message: "Success",
                        data: token,
                    });
                } else {
                    res.status(400).json({
                        status: false,
                        message: "Password incorrect",
                    });
                }
            } else {
                res.status(400).json({
                    status: false,
                    message: "Email not registered",
                });
            }
        } catch (err) {
            res.status(500).json({
                status: false,
                message: err.message,
            });
        }
    },
    update: async (req, res) => {
        try {
            if (req.body.password) {
                const salt = bcrypt.genSaltSync(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }

            const payload = req.body;
            if (req.file !== undefined || null) {
                const picture = req.file.filename;
                const user = await User.update(
                    {
                        ...payload,
                        picture,
                    },
                    {
                        where: {
                            id: req.params.id,
                        },
                    }
                );
                res.status(200).json({
                    status: true,
                    message: "Success",
                    data: user,
                });
            } else {
                const user = await User.update(
                    {
                        ...payload,
                    },
                    {
                        where: {
                            id: req.params.id,
                        },
                    }
                );
                res.status(200).json({
                    status: true,
                    message: "Success",
                    data: user,
                });
            }
        } catch (err) {
            res.status(500).json({
                status: false,
                message: err.message,
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const picture = await User.findOne({ where: { id: id } });
            const data = await User.destroy({ where: { id: id } });
            if (picture.picture !== null) {
                let currentFile = `${config.rootPath}/public/uploads/profile/${picture.picture}`;
                if (fs.existsSync(currentFile)) {
                    fs.unlinkSync(currentFile);
                }
            }
            res.status(200).json({
                status: true,
                message: "Success",
                data,
            });
        } catch (err) {
            res.status(500).json({
                status: false,
                message: err.message,
            });
        }
    },
};

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
