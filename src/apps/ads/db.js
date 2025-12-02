const { db } = require("../../config/db/index");

exports.AdsDB = class {
  static async create(params) {
    const query = `INSERT INTO ads(title, description, file, type, status, created_at, updated_at) VALUES($1, $2, $3, $4, $5, now(), now()) RETURNING *`;

    const result = await db.query(query, params);

    return result[0];
  }

  static async update(params) {
    const query = `UPDATE ads SET title = $1, description = $2, file = $3, type = $4, status = $5, updated_at = now() WHERE id = $6 RETURNING *`;

    const result = await db.query(query, params);

    return result[0];
  }

  static async getById(params) {
    const query = `SELECT *, '${process.env.BASE_URL}/ads/file/' || file AS file_url  FROM ads WHERE id = $1 AND is_active = true`;

    const result = await db.query(query, params);

    return result[0];
  }

  static async get(params, filter) {
    const conditions = [];

    if (filter.search) {
      params.push(`%${filter.search}%`);
      conditions.push(`title ILIKE $${params.length}`);
    }

    if (filter.status !== undefined) {
      params.push(filter.status);
      conditions.push(`status = $${params.length}`);
    }

    if (filter.type) {
      params.push(filter.type);
      conditions.push(`type = $${params.length}`);
    }

    const where = conditions.length ? `AND ${conditions.join(" AND ")}` : "";

    const query = `--sql
      WITH data AS (
        SELECT
          *,
          '${process.env.BASE_URL}/ads/file/' || file AS file_url
        FROM ads
        WHERE is_active = true
          ${where}
        ORDER BY created_at DESC
        OFFSET $1 LIMIT $2
      )
      SELECT 
        COALESCE(JSON_AGG(ROW_TO_JSON(data)), '[]'::JSON) AS data,
        (
          SELECT
            COALESCE(COUNT(id), 0)
          FROM ads
          WHERE is_active = true
            ${where}
        )::INTEGER AS count
      FROM data
    `;

    const result = await db.query(query, params);

    return result[0];
  }

  static async delete(params) {
    const query = `UPDATE ads SET is_active = false WHERE id = $1 RETURNING *`;

    const result = await db.query(query, params);

    return result[0];
  }
};
