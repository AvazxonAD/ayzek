const { db } = require("../../config/db/index");

class SwearWordsDB {
    static async get(page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        const [result, countResult] = await Promise.all([
            db.query(
                `
        SELECT id, word, is_active, created_at, updated_at 
        FROM swear_words 
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
      `,
                [limit, offset]
            ),
            db.query(`SELECT COUNT(*) as total FROM swear_words`),
        ]);

        const total = parseInt(countResult[0].total);
        const totalPages = Math.ceil(total / limit);

        const texts = result.map((item) => item.word);

        return {
            data: result,
            texts,
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
      SELECT id, word, is_active, created_at, updated_at 
      FROM swear_words 
      WHERE id = $1
    `,
            [id]
        );
        return result[0] || null;
    }

    static async create(data) {
        const { word, is_active = true } = data;
        const result = await db.query(
            `
      INSERT INTO swear_words (word, is_active, created_at, updated_at) 
      VALUES ($1, $2, NOW(), NOW()) 
      RETURNING id, word, is_active, created_at, updated_at
    `,
            [word, is_active]
        );
        return result[0];
    }

    static async update(id, data) {
        const fields = [];
        const values = [];
        let paramIndex = 1;

        if (data.word !== undefined) {
            fields.push(`word = $${paramIndex++}`);
            values.push(data.word);
        }

        if (data.is_active !== undefined) {
            fields.push(`is_active = $${paramIndex++}`);
            values.push(data.is_active);
        }

        fields.push(`updated_at = NOW()`);
        values.push(id);

        const query = `
      UPDATE swear_words 
      SET ${fields.join(", ")} 
      WHERE id = $${paramIndex} 
      RETURNING id, word, is_active, created_at, updated_at
    `;

        const result = await db.query(query, values);
        return result[0] || null;
    }

    static async delete(id) {
        const result = await db.query(
            `
      DELETE FROM swear_words 
      WHERE id = $1 
      RETURNING id
    `,
            [id]
        );
        return result[0] || null;
    }
}

module.exports = { SwearWordsDB };
