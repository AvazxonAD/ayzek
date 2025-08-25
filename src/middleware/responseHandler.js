const responseHandler = (req, res, next) => {
  res.success = (data = null, message = "Success", statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };

  res.error = (message = "Internal Server Error", statusCode = 500, data = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      data,
    });
  };

  next();
};

module.exports = responseHandler;
