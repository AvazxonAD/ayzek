const Joi = require("../../util/joi");

exports.Schema = class {
  static now = new Date();

  static create() {
    return Joi.object({
      body: Joi.object({
        comment: Joi.string().trim().required(),
        reply_id: Joi.number().min(1).integer().allow(null),
        post_id: Joi.number().min(1).integer().required(),
      }),
    });
  }

  static update() {
    return Joi.object({
      body: Joi.object({
        comment: Joi.string().trim().required(),
        reply_id: Joi.number().min(1).integer().allow(null),
      }),

      params: Joi.object({
        id: Joi.number().min(1).integer().required(),
      }),
    });
  }

  static getById() {
    return Joi.object({
      params: Joi.object({
        id: Joi.number().min(1).integer().required(),
      }),
    });
  }

  static get() {
    return Joi.object({
      query: Joi.object({
        post_id: Joi.number().min(1).integer().required(),
      }),
    });
  }

  static delete() {
    return Joi.object({
      params: Joi.object({
        id: Joi.number().min(1).integer().required(),
      }),
    });
  }
};
