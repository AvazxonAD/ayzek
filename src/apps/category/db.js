const { db } = require("../../config/db/index");

class CategoryDB {
  // Get categories with language support (for frontend)
  static async get(page = 1, limit = 10, lang = "uz") {
    const offset = (page - 1) * limit;

    // Validate language to prevent SQL injection
    const validLangs = ["uz", "ru", "en"];
    const safeLang = validLangs.includes(lang) ? lang : "uz";

    const [result, countResult] = await Promise.all([
      db.query(
        `
        SELECT
          id,
          COALESCE(name_${safeLang}, name) AS name,
          is_active,
          created_at,
          updated_at
        FROM categories
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
      `,
        [limit, offset]
      ),
      db.query(`SELECT COUNT(*) as total FROM categories`),
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

  // Get all categories including all language fields (for admin)
  static async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const [result, countResult] = await Promise.all([
      db.query(
        `
        SELECT
          id,
          name,
          name_uz,
          name_ru,
          name_en,
          is_active,
          created_at,
          updated_at
        FROM categories
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
      `,
        [limit, offset]
      ),
      db.query(`SELECT COUNT(*) as total FROM categories`),
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

  // Get category by ID with language support (for frontend)
  static async getById(id, lang = "uz") {
    // Validate language to prevent SQL injection
    const validLangs = ["uz", "ru", "en"];
    const safeLang = validLangs.includes(lang) ? lang : "uz";

    const result = await db.query(
      `
      SELECT
        id,
        COALESCE(name_${safeLang}, name) AS name,
        is_active,
        created_at,
        updated_at
      FROM categories
      WHERE id = $1
    `,
      [id]
    );
    return result[0] || null;
  }

  // Get category by ID including all language fields (for admin)
  static async getByIdAll(id) {
    const result = await db.query(
      `
      SELECT
        id,
        name,
        name_uz,
        name_ru,
        name_en,
        is_active,
        created_at,
        updated_at
      FROM categories
      WHERE id = $1
    `,
      [id]
    );
    return result[0] || null;
  }

  static async create(data) {
    const { name, name_uz, name_ru, name_en, is_active = true } = data;
    const result = await db.query(
      `
      INSERT INTO categories (name, name_uz, name_ru, name_en, is_active, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING id, name, name_uz, name_ru, name_en, is_active, created_at, updated_at
    `,
      [name, name_uz || null, name_ru || null, name_en || null, is_active]
    );
    return result[0];
  }

  static async update(id, data) {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(data.name);
    }

    if (data.name_uz !== undefined) {
      fields.push(`name_uz = $${paramIndex++}`);
      values.push(data.name_uz);
    }

    if (data.name_ru !== undefined) {
      fields.push(`name_ru = $${paramIndex++}`);
      values.push(data.name_ru);
    }

    if (data.name_en !== undefined) {
      fields.push(`name_en = $${paramIndex++}`);
      values.push(data.name_en);
    }

    if (data.is_active !== undefined) {
      fields.push(`is_active = $${paramIndex++}`);
      values.push(data.is_active);
    }

    if (fields.length === 0) {
      return await CategoryDB.getByIdAll(id);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE categories
      SET ${fields.join(", ")}
      WHERE id = $${paramIndex}
      RETURNING id, name, name_uz, name_ru, name_en, is_active, created_at, updated_at
    `;

    const result = await db.query(query, values);
    return result[0] || null;
  }

  static async delete(id) {
    const result = await db.query(
      `
      DELETE FROM categories 
      WHERE id = $1 
      RETURNING id
    `,
      [id]
    );
    return result[0] || null;
  }
}

module.exports = { CategoryDB };
