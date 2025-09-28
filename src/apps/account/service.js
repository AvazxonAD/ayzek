const { AccountDB } = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../../middleware/errorResponse");

exports.AccountService = class {
  static async register(data) {
    const hashed = await bcrypt.hash(data.password, 10);

    const result = await AccountDB.register([data.email, hashed]);

    delete result.password;

    const token = this.generateToken(result);

    return { account: result, token };
  }

  static async login(data) {
    const user = await AccountDB.getByEmail([data.email]);
    if (!user) {
      throw new ErrorResponse("account.invalid_credentials", 401);
    }

    const check = await bcrypt.compare(data.password, user.password);
    if (!check) {
      throw new ErrorResponse("account.invalid_credentials", 401);
    }

    delete user.password;

    const token = this.generateToken(user);

    return { account: user, token };
  }

  static generateToken(payload) {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;

    return jwt.sign(payload, secret, { expiresIn });
  }
};
