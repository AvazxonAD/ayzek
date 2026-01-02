const Joi = require('joi');

class BackgroundColorSchema {
    static getAllSchema() {
        return Joi.object({
            query: Joi.object({
                page: Joi.number().integer().min(1).optional().default(1).messages({
                    'number.min': 'validation.page.min',
                    'number.base': 'validation.page.invalid'
                }),
                limit: Joi.number().integer().min(1).optional().default(10).messages({
                    'number.min': 'validation.limit.min',
                    'number.base': 'validation.limit.invalid'
                })
            })
        }).options({ stripUnknown: true });
    }

    static createSchema() {
        return Joi.object({
            body: Joi.object({
                color: Joi.string().required().messages({
                    'any.required': 'validation.color.required',
                    'string.empty': 'validation.color.empty'
                }),
                active: Joi.boolean().optional().default(true),
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
                color: Joi.string().optional().messages({
                    'string.empty': 'validation.color.empty'
                }),
                active: Joi.boolean().optional(),
                is_active: Joi.boolean().optional()
            })
        }).options({ stripUnknown: true });
    }

    static updateActiveSchema() {
        return Joi.object({
            params: Joi.object({
                id: Joi.number().integer().positive().required().messages({
                    'any.required': 'validation.id.required',
                    'number.positive': 'validation.id.positive'
                })
            }),
            body: Joi.object({
                active: Joi.boolean().required().messages({
                    'any.required': 'validation.active.required',
                    'boolean.base': 'validation.active.boolean'
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
}

module.exports = { BackgroundColorSchema };
