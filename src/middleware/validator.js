const validator = (controllerMethod, schema) => {
  return async (req, res, next) => {
    try {
      if (schema) {
        const { error, value } = schema.validate({
          body: req.body,
          params: req.params,
          query: req.query,
          headers: req.headers,
        });

        if (error) {
          return res.error(req.t(error.details[0].message) || error.details[0].message, 400, { field: error.details[0].path.join(".") });
        }

        // Validated data ni req ga assign qilish
        req.body = value.body || req.body;
        req.params = value.params || req.params;
        req.query = value.query || req.query;
      }

      // Controller method ni chaqirish
      await controllerMethod(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { validator };
