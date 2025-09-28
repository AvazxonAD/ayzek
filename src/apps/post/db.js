const { db } = require("../../config/db/index");

class PostDB {
  static async updateSeeCount(params) {
    const query = `UPDATE posts SET see = see + 1 WHERE id = $1 RETURNING *`;

    const result = await db.query(query, params);

    return result[0];
  }

  static async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const [result, countResult] = await Promise.all([
      db.query(
        `
        SELECT
          p.*,
          c.name as category_name
        FROM posts p
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.created_at DESC
        LIMIT $1 OFFSET $2
      `,
        [limit, offset]
      ),
      db.query(`SELECT COUNT(*) as total FROM posts`),
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

  static async findById(id) {
    const result = await db.query(
      `
      SELECT p.*,
             c.name as category_name
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1
    `,
      [id]
    );
    return result[0] || null;
  }

  static async create(data) {
    const { title, description, content, image, category_id, tags, fio, gif, video } = data;
    const result = await db.query(
      `
      INSERT INTO posts (title, description, content, image, category_id, tags, fio, gif, video, created_at, updated_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) 
      RETURNING *
    `,
      [title, description, content, image, category_id, tags, fio, gif, video]
    );
    return result[0];
  }

  static async update(id, data) {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (data.title !== undefined) {
      fields.push(`title = $${paramIndex++}`);
      values.push(data.title);
    }

    if (data.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(data.description);
    }

    if (data.content !== undefined) {
      fields.push(`content = $${paramIndex++}`);
      values.push(data.content);
    }

    if (data.image !== undefined) {
      fields.push(`image = $${paramIndex++}`);
      values.push(data.image);
    }

    if (data.category_id !== undefined) {
      fields.push(`category_id = $${paramIndex++}`);
      values.push(data.category_id);
    }

    if (data.tags !== undefined) {
      fields.push(`tags = $${paramIndex++}`);
      values.push(data.tags);
    }

    if (data.fio !== undefined) {
      fields.push(`fio = $${paramIndex++}`);
      values.push(data.fio);
    }

    if (data.is_active !== undefined) {
      fields.push(`is_active = $${paramIndex++}`);
      values.push(data.is_active);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE posts 
      SET ${fields.join(", ")} 
      WHERE id = $${paramIndex} 
      RETURNING id, title, description, content, image, category_id, tags, fio, is_active, created_at, updated_at
    `;

    const result = await db.query(query, values);
    return result[0] || null;
  }

  static async delete(id) {
    const result = await db.query(
      `
      DELETE FROM posts 
      WHERE id = $1 
      RETURNING id
    `,
      [id]
    );
    return result[0] || null;
  }
}

module.exports = { PostDB };
