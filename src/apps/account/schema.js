const Joi = require("../../util/joi");

exports.Schema = class {
  static register() {
    return Joi.object({
      body: Joi.object({
        email: Joi.string().trim().required(),
        password: Joi.string().trim().required(),
      }),
    });
  }

  static login() {
    return Joi.object({
      body: Joi.object({
        email: Joi.string().trim().required(),
        password: Joi.string().trim().required(),
      }),
    });
  }
};
