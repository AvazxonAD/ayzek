const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      token = req.query.token;
    }

    if (!token) {
      return res.error("tokenError", 403);
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.error("notLogged", 403);
    }

    if (!decoded) {
      return res.error("notLogged", 403);
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTimestamp) {
      return res.error("tokenError", 403);
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.error(error.message, 403);
  }
};
