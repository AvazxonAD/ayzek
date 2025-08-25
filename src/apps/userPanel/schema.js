const Joi = require('joi');

class UserPanelSchema {
  static getAllSchema() {
    return Joi.object({
      query: Joi.object({
        page: Joi.number().integer().min(1).optional().default(1).messages({
          'number.min': 'validation.page.min',
          'number.base': 'validation.page.invalid'
        }),
        limit: Joi.number().integer().min(1).max(100).optional().default(10).messages({
          'number.min': 'validation.limit.min',
          'number.max': 'validation.limit.max',
          'number.base': 'validation.limit.invalid'
        })
      })
    }).options({ stripUnknown: true });
  }

  static getByIdSchema() {
    return Joi.object({
      params: Joi.object({
        id: Joi.number().integer().positive().required().messages({
          'any.required': 'validation.id.required',
          'number.positive': 'validation.id.positive'
        })
      })
    }).options({ stripUnknown: true });
  }
}

module.exports = { UserPanelSchema };