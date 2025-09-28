const { db } = require("../../config/db/index");

exports.AccountDB = class {
  static async register(params) {
    const query = `INSERT INTO accounts(email, password, created_at, updated_at) VALUES($1, $2, now(), now()) RETURNING *`;

    const result = await db.query(query, params);

    return result[0];
  }

  static async getByEmail(params) {
    const query = `SELECT * FROM accounts WHERE email = $1 AND is_active = true`;

    const result = await db.query(query, params);

    return result[0];
  }
};
