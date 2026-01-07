const { db } = require("../../config/db/index");

class BackgroundColorDB {
  static async get(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const [result, countResult] = await Promise.all([
      db.query(
        `
        SELECT 
          *,
          '${process.env.BASE_URL}/background-color/' || id || '/' || 'file' AS file_url
        FROM background_color
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
      `,
        [limit, offset]
      ),
      db.query(`SELECT COUNT(*) as total FROM background_color`),
    ]);

    const total = parseInt(countResult[0].total);
    const totalPages = Math.ceil(total / limit);

    return {
      data: result,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  static async getById(id) {
    const result = await db.query(
      `
      SELECT id, file, active, is_active, created_at, updated_at,  '${process.env.BASE_URL}/background-color/' || id || '/' || 'file' AS file_url
      FROM background_color
      WHERE id = $1
    `,
      [id]
    );
    return result[0] || null;
  }

  static async create(data) {
    const { file, active = true } = data;
    const result = await db.query(
      `
      INSERT INTO background_color (file, active, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW())
      RETURNING id, file, active, created_at, updated_at
    `,
      [file, active]
    );
    return result[0];
  }

  static async update(id, data) {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (data.file !== undefined) {
      fields.push(`file = $${paramIndex++}`);
      values.push(data.file);
    }

    if (data.active !== undefined) {
      fields.push(`active = $${paramIndex++}`);
      values.push(data.active);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE background_color
      SET ${fields.join(", ")}
      WHERE id = $${paramIndex}
      RETURNING id, file, active, is_active, created_at, updated_at
    `;

    const result = await db.query(query, values);
    return result[0] || null;
  }

  static async delete(id) {
    const result = await db.query(
      `
      DELETE FROM background_color 
      WHERE id = $1 
      RETURNING id
    `,
      [id]
    );
    return result[0] || null;
  }
}

module.exports = { BackgroundColorDB };
