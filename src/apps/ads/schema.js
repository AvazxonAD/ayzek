const Joi = require("../../util/joi");

exports.Schema = class {
  static now = new Date();

  static create() {
    return Joi.object({
      body: Joi.object({
        // Title fields
        title: Joi.string().trim().max(255).required(),
        title_uz: Joi.string().trim().max(255).allow(null, ""),
        title_ru: Joi.string().trim().max(255).allow(null, ""),
        title_en: Joi.string().trim().max(255).allow(null, ""),
        // Description fields
        description: Joi.string().trim().allow(null, ""),
        description_uz: Joi.string().trim().allow(null, ""),
        description_ru: Joi.string().trim().allow(null, ""),
        description_en: Joi.string().trim().allow(null, ""),
        cta_link: Joi.string().trim().allow(null, ""),
        // CTA text fields
        cta_text: Joi.string().trim().allow(null, ""),
        cta_text_uz: Joi.string().trim().allow(null, ""),
        cta_text_ru: Joi.string().trim().allow(null, ""),
        cta_text_en: Joi.string().trim().allow(null, ""),
        file: Joi.string().trim().allow(null, ""),
        type: Joi.string().trim().max(100).allow(null, ""),
        status: Joi.boolean().default(false),
      }),
    });
  }

  static update() {
    return Joi.object({
      body: Joi.object({
        // Title fields
        title: Joi.string().trim().max(255).required(),
        title_uz: Joi.string().trim().max(255).allow(null, ""),
        title_ru: Joi.string().trim().max(255).allow(null, ""),
        title_en: Joi.string().trim().max(255).allow(null, ""),
        // Description fields
        description: Joi.string().trim().allow(null, ""),
        description_uz: Joi.string().trim().allow(null, ""),
        description_ru: Joi.string().trim().allow(null, ""),
        description_en: Joi.string().trim().allow(null, ""),
        cta_link: Joi.string().trim().allow(null, ""),
        // CTA text fields
        cta_text: Joi.string().trim().allow(null, ""),
        cta_text_uz: Joi.string().trim().allow(null, ""),
        cta_text_ru: Joi.string().trim().allow(null, ""),
        cta_text_en: Joi.string().trim().allow(null, ""),
        file: Joi.string().trim().allow(null, ""),
        type: Joi.string().trim().max(100).allow(null, ""),
        status: Joi.boolean().default(false),
      }),

      params: Joi.object({
        id: Joi.number().min(1).integer().required(),
      }),
    });
  }

  static updateStatus() {
    return Joi.object({
      body: Joi.object({
        status: Joi.boolean().required(),
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

  static getFile() {
    return Joi.object({
      params: Joi.object({
        file_name: Joi.string().required(),
      }),
    });
  }

  static get() {
    return Joi.object({
      query: Joi.object({
        search: Joi.string().trim().allow(null, ""),
        page: Joi.number().integer().positive().default(1),
        limit: Joi.number().integer().positive().default(20),
        status: Joi.boolean().allow(null),
        type: Joi.string().allow(null, ""),
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
