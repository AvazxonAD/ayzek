const { db } = require("../../config/db/index");

class BackgroundColorDB {
    static async get(page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        const [result, countResult] = await Promise.all([
            db.query(
                `
        SELECT id, color, active, is_active, created_at, updated_at 
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
      SELECT id, color, active, is_active, created_at, updated_at 
      FROM background_color 
      WHERE id = $1
    `,
            [id]
        );
        return result[0] || null;
    }

    static async create(data) {
        const { color, active = true, is_active = true } = data;
        const result = await db.query(
            `
      INSERT INTO background_color (color, active, is_active, created_at, updated_at) 
      VALUES ($1, $2, $3, NOW(), NOW()) 
      RETURNING id, color, active, is_active, created_at, updated_at
    `,
            [color, active, is_active]
        );
        return result[0];
    }

    static async update(id, data) {
        const fields = [];
        const values = [];
        let paramIndex = 1;

        if (data.color !== undefined) {
            fields.push(`color = $${paramIndex++}`);
            values.push(data.color);
        }

        if (data.active !== undefined) {
            fields.push(`active = $${paramIndex++}`);
            values.push(data.active);
        }

        if (data.is_active !== undefined) {
            fields.push(`is_active = $${paramIndex++}`);
            values.push(data.is_active);
        }

        fields.push(`updated_at = NOW()`);
        values.push(id);

        const query = `
      UPDATE background_color 
      SET ${fields.join(", ")} 
      WHERE id = $${paramIndex} 
      RETURNING id, color, active, is_active, created_at, updated_at
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
