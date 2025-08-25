const Joi = require('joi');

class AuthSchema {
  static loginSchema() {
    return Joi.object({
      body: Joi.object({
        username: Joi.string().min(3).max(50).required().messages({
          'string.min': 'validation.username.min',
          'string.max': 'validation.username.max',
          'any.required': 'validation.username.required'
        }),
        password: Joi.string().min(1).max(255).required().messages({
          'string.min': 'validation.password.min',
          'any.required': 'validation.password.required'
        })
      })
    }).options({ stripUnknown: true });
  }
}

module.exports = { AuthSchema };