// db.js
const { db } = require("../../config/db/index");

exports.GifDB = class {
  static async get(params, filter) {
    const conditions = ["g.isdeleted = false"];
    const values = [...params];

    if (filter.search) {
      values.push(`%${filter.search}%`);
      conditions.push(`g.file ILIKE $${values.length}`);
    }

    const query = `--sql
      WITH data AS (
        SELECT
          g.id,
          g.file,
          g.created_at,
          g.updated_at
        FROM gifs g
        WHERE ${conditions.join(" AND ")}
        ORDER BY g.id DESC
        OFFSET $1 LIMIT $2
      )
      SELECT 
        COALESCE(JSON_AGG(ROW_TO_JSON(data)), '[]'::JSON) AS data,
        (SELECT COUNT(*) FROM gifs g WHERE ${conditions.join(" AND ")})::INTEGER AS count
      FROM data
    `;

    const result = await db.query(query, values);
    return result[0];
  }

  static async getById(params) {
    const query = `--sql
      SELECT
        g.id,
        g.file,
        g.created_at,
        g.updated_at
      FROM gifs g
      WHERE g.id = $1 AND g.isdeleted = false
    `;
    const result = await db.query(query, params);
    return result[0];
  }

  static async create(params) {
    const query = `--sql
      INSERT INTO gifs (file)
      VALUES ($1)
      RETURNING *
    `;
    const result = await db.query(query, params);
    return result[0];
  }

  static async update(params) {
    const query = `--sql
      UPDATE gifs
      SET file = $2, updated_at = now()
      WHERE id = $1 AND isdeleted = false
      RETURNING *
    `;
    const result = await db.query(query, params);
    return result[0];
  }

  static async delete(params) {
    const query = `--sql
      UPDATE gifs
      SET isdeleted = true, updated_at = now()
      WHERE id = $1
      RETURNING *
    `;
    const result = await db.query(query, params);
    return result[0];
  }
};
