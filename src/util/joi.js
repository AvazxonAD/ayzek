const JoiBase = require("joi");

module.exports = Joi = JoiBase.defaults((schema) => {
  return schema.options({ stripUnknown: true, abortEarly: false, allowUnknown: false, convert: true });
});
