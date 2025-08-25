const Joi = require('joi');

class PostSchema {
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

  static createSchema() {
    return Joi.object({
      body: Joi.object({
        title: Joi.string().min(1).max(255).required().messages({
          'string.min': 'validation.title.min',
          'string.max': 'validation.title.max',
          'any.required': 'validation.title.required'
        }),
        description: Joi.string().optional().allow('').messages({
          'string.base': 'validation.description.invalid'
        }),
        content: Joi.string().min(1).required().messages({
          'string.min': 'validation.content.min',
          'any.required': 'validation.content.required'
        }),
        category_id: Joi.number().integer().positive().optional().messages({
          'number.positive': 'validation.category_id.positive',
          'number.base': 'validation.category_id.invalid'
        }),
        tags: Joi.string().optional().allow('').messages({
          'string.base': 'validation.tags.invalid'
        }),
        fio: Joi.string().min(1).max(255).required().messages({
          'string.min': 'validation.fio.min',
          'string.max': 'validation.fio.max',
          'any.required': 'validation.fio.required'
        }),
        is_active: Joi.boolean().optional().default(true)
      })
    }).options({ stripUnknown: true });
  }

  static updateSchema() {
    return Joi.object({
      params: Joi.object({
        id: Joi.number().integer().positive().required().messages({
          'any.required': 'validation.id.required',
          'number.positive': 'validation.id.positive'
        })
      }),
      body: Joi.object({
        title: Joi.string().min(1).max(255).optional().messages({
          'string.min': 'validation.title.min',
          'string.max': 'validation.title.max'
        }),
        description: Joi.string().optional().allow('').messages({
          'string.base': 'validation.description.invalid'
        }),
        content: Joi.string().min(1).optional().messages({
          'string.min': 'validation.content.min'
        }),
        category_id: Joi.number().integer().positive().optional().messages({
          'number.positive': 'validation.category_id.positive',
          'number.base': 'validation.category_id.invalid'
        }),
        tags: Joi.string().optional().allow('').messages({
          'string.base': 'validation.tags.invalid'
        }),
        fio: Joi.string().min(1).max(255).optional().messages({
          'string.min': 'validation.fio.min',
          'string.max': 'validation.fio.max'
        }),
        is_active: Joi.boolean().optional()
      }).min(1).messages({
        'object.min': 'validation.update.min_fields'
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

  static deleteSchema() {
    return Joi.object({
      params: Joi.object({
        id: Joi.number().integer().positive().required().messages({
          'any.required': 'validation.id.required',
          'number.positive': 'validation.id.positive'
        })
      })
    }).options({ stripUnknown: true });
  }

  static getImageSchema() {
    return Joi.object({
      params: Joi.object({
        filename: Joi.string().pattern(/^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif|webp)$/).required().messages({
          'any.required': 'validation.filename.required',
          'string.pattern.base': 'validation.filename.invalid'
        })
      })
    }).options({ stripUnknown: true });
  }
}

module.exports = { PostSchema };