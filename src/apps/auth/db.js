const { db } = require("../../config/db/index");

class UserDB {
  static async findByUsername(username) {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    return result[0] || null;
  }
}

module.exports = { UserDB };
