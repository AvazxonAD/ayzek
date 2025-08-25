const errorHandler = (err, req, res, next) => {
  console.error("---------------- GLOBAL ERROR HANDLER ----------------".red);
  console.error(err.stack.red);

  const message = req.t(err.message) || req.t('common.internal_server_error');
  const code = err.statusCode || 500;

  res.error(message, code);
};

module.exports = errorHandler;
