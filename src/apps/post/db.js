const { db } = require("../../config/db/index");

class PostDB {
  static async updateSeeCount(params) {
    const query = `UPDATE posts SET see = see + 1 WHERE id = $1 RETURNING *`;

    const result = await db.query(query, params);

    return result[0];
  }

  static async get(page = 1, limit = 10, id, video, order_by, order_type) {
    const offset = (page - 1) * limit;
    const conditions = [];

    if (video) {
      conditions.push(`p.video IS NOT NULL`);
    }

    const where = conditions.length > 0 ? `AND ${conditions.join(" AND ")}` : "";

    const [result, countResult] = await Promise.all([
      db.query(
        `
        SELECT
          p.*,
          c.name as category_name,
          COALESCE(
              (
                SELECT 
                  JSON_AGG(JSON_BUILD_OBJECT(
                    'id', tg.id,
                    'tag_name', t.name
                  ))
                FROM post_tags tg
                JOIN tags t ON t.id = tg.tag_id
                WHERE tg.post_id = p.id
                  AND tg.is_active = true
                LIMIT 1
            ), '[]'::JSON) AS tags
        FROM posts p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.is_active = true
          ${id ? `AND p.id != ${id}` : ""}
          ${where}
        ORDER BY p.${order_by} ${order_type}
        LIMIT $1 OFFSET $2
      `,
        [limit, offset]
      ),
      db.query(`
        SELECT
          COALESCE(COUNT(p.id), 0) as total
        FROM posts p
        WHERE p.is_active = true
          ${where}
      `),
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
      SELECT p.*,
            c.name as category_name,
            COALESCE(
              (
                SELECT 
                  JSON_AGG(JSON_BUILD_OBJECT(
                    'id', tg.id,
                    'tag_name', t.name
                  ))
                FROM post_tags tg
                JOIN tags t ON t.id = tg.tag_id
                WHERE tg.post_id = p.id
                  AND tg.is_active = true
                LIMIT 1
            ), '[]'::JSON) AS tags
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1
        AND p.is_active = true
    `,
      [id]
    );
    return result[0] || null;
  }

  static async create(params, client) {
    const result = await client.query(
      `
      INSERT INTO posts (title, description, content, image, category_id, tags, fio, gif, video, created_at, updated_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) 
      RETURNING *
    `,
      params
    );

    return result.rows[0];
  }

  static async createTags(params, client) {
    const result = await client.query(
      `
      INSERT INTO post_tags (post_id, tag_id) 
      VALUES ($1, $2) 
      RETURNING *
    `,
      params
    );

    return result.rows[0];
  }

  static async deleteTags(params, client) {
    await client.query(`UPDATE post_tags SET is_active = false WHERE post_id = $1`, params);
  }

  static async deleteTagsById(params, client) {
    await client.query(`UPDATE post_tags SET is_active = false WHERE id = $1`, params);
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

    if (data.gif !== undefined) {
      fields.push(`gif = $${paramIndex++}`);
      values.push(data.gif);
    }

    if (data.video !== undefined) {
      fields.push(`video = $${paramIndex++}`);
      values.push(data.video);
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

    const result = await db.transaction(async (client) => {
      const result = await client.query(query, values);

      const tags = await client.query(`SELECT * FROM post_tags WHERE post_id = $1 AND is_active = true`, [id]);

      for (let tag of data.tags) {
        const check = await tags.rows.find((item) => item.tag_id === tag);
        if (!check) {
          await this.createTags([id, tag], client);
        }
      }

      for (let tag of tags.rows) {
        const check = data.tags.find((item) => item === tag.tag_id);
        if (!check) {
          await this.deleteTagsById([tag.id], client);
        }
      }

      return result.rows[0];
    });

    return result;
  }

  static async delete(id) {
    const result = await db.query(
      `
      UPDATE posts
      SET is_active = false 
      WHERE id = $1 
      RETURNING id
    `,
      [id]
    );
    return result[0] || null;
  }
}

module.exports = { PostDB };
