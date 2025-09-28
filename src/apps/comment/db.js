const { db } = require("../../config/db/index");

exports.CommentDB = class {
  static async create(params) {
    const query = `INSERT INTO comments(comment, reply_id, account_id, post_id, created_at, updated_at) values($1, $2, $3, $4, now(), now()) RETURNING *`;

    const result = await db.query(query, params);

    return result[0];
  }

  static async update(params) {
    const query = `UPDATE comments SET comment = $1, reply_id = $2, updated_at = now() WHERE id = $3 RETURNING *`;

    const result = await db.query(query, params);

    return result[0];
  }

  static async getById(params) {
    const query = `SELECT * FROM comments WHERE id = $1 AND is_active = true`;

    const result = await db.query(query, params);

    return result[0];
  }

  static async get(params) {
    const query = `SELECT * FROM comments WHERE is_active = true`;

    const result = await db.query(query, params);

    return result;
  }

  static async delete(params) {
    const query = `UPDATE comments set is_active = false WHERE id = $1 RETURNING *`;

    const result = await db.query(query, params);

    return result[0];
  }
};
