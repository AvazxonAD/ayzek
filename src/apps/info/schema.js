const Joi = require("joi");

class InfoSchema {
  static getSchema() {
    return Joi.object({
      query: Joi.object({}),
    }).options({ stripUnknown: true });
  }

  static getAllSchema() {
    return Joi.object({
      query: Joi.object({}),
    }).options({ stripUnknown: true });
  }

  static updateSchema() {
    return Joi.object({
      params: Joi.object({
        id: Joi.number().integer().positive().required().messages({
          "any.required": "validation.id.required",
          "number.positive": "validation.id.positive",
        }),
      }),
      body: Joi.object({
        brand_name: Joi.string().min(1).required(),
        brand_domain: Joi.string().min(1).required(),
        // Translatable field: brand_description
        brand_description: Joi.string().required(),
        brand_description_uz: Joi.string().allow(null, "").optional(),
        brand_description_ru: Joi.string().allow(null, "").optional(),
        brand_description_en: Joi.string().allow(null, "").optional(),
        // Social links
        social_youtube: Joi.string().min(1).required(),
        social_instagram: Joi.string().min(1).required(),
        social_telegram: Joi.string().min(1).required(),
        social_facebook: Joi.string().min(1).required(),
        // Translatable field: contact_location
        contact_location: Joi.string().min(1).required(),
        contact_location_uz: Joi.string().allow(null, "").optional(),
        contact_location_ru: Joi.string().allow(null, "").optional(),
        contact_location_en: Joi.string().allow(null, "").optional(),
        contact_phone: Joi.string().min(1).required(),
        contact_email: Joi.string().email().min(1).required(),
        // Translatable field: target_age_range
        target_age_range: Joi.string().required(),
        target_age_range_uz: Joi.string().allow(null, "").optional(),
        target_age_range_ru: Joi.string().allow(null, "").optional(),
        target_age_range_en: Joi.string().allow(null, "").optional(),
        // Translatable field: target_learning_method
        target_learning_method: Joi.string().required(),
        target_learning_method_uz: Joi.string().allow(null, "").optional(),
        target_learning_method_ru: Joi.string().allow(null, "").optional(),
        target_learning_method_en: Joi.string().allow(null, "").optional(),
        // Map fields
        map_latitude: Joi.number().min(-90).max(90).required(),
        map_longitude: Joi.number().min(-180).max(180).required(),
        map_zoom: Joi.number().integer().min(1).max(21).required(),
      }),
    }).options({ stripUnknown: true });
  }
}

module.exports = { InfoSchema };
