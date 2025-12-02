// schema.js
const Joi = require("joi");

exports.Schema = class {
  static updateStatus() {
    return Joi.object({
      body: Joi.object({
        status: Joi.boolean().required(),
      }),
      params: Joi.object({
        id: Joi.number().positive().integer().required(),
      }),
    }).options({ stripUnknown: true });
  }
  static get() {
    return Joi.object({
      query: Joi.object({
        search: Joi.string().trim().allow(null, ""),
        page: Joi.number().integer().positive().default(1),
        limit: Joi.number().integer().positive().default(20),
        active: Joi.boolean().allow(null),
      }),
    }).options({ stripUnknown: true });
  }

  static getById() {
    return Joi.object({
      params: Joi.object({
        id: Joi.number().integer().positive().required(),
      }),
    }).options({ stripUnknown: true });
  }

  static create() {
    return Joi.object({
      body: Joi.object({
        file: Joi.string().required(),
      }),
    }).options({ stripUnknown: true });
  }

  static update() {
    return Joi.object({
      params: Joi.object({
        id: Joi.number().integer().positive().required(),
      }),
      body: Joi.object({
        file: Joi.string().required(),
      }),
    }).options({ stripUnknown: true });
  }

  static delete() {
    return Joi.object({
      params: Joi.object({
        id: Joi.number().integer().positive().required(),
      }),
    }).options({ stripUnknown: true });
  }
};
