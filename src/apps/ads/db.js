const { db } = require("../../config/db/index");

exports.AdsDB = class {
  static async create(params) {
    const query = `INSERT INTO ads(
      title, title_uz, title_ru, title_en,
      description, description_uz, description_ru, description_en,
      file, type, status, cta_link,
      cta_text, cta_text_uz, cta_text_ru, cta_text_en,
      created_at, updated_at
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, now(), now()) RETURNING *`;

    const result = await db.query(query, params);

    return result[0];
  }

  static async update(params) {
    const query = `UPDATE ads SET
      title = $1, title_uz = $2, title_ru = $3, title_en = $4,
      description = $5, description_uz = $6, description_ru = $7, description_en = $8,
      file = $9, type = $10, status = $11, cta_link = $12,
      cta_text = $13, cta_text_uz = $14, cta_text_ru = $15, cta_text_en = $16,
      updated_at = now()
    WHERE id = $17 RETURNING *`;

    const result = await db.query(query, params);

    return result[0];
  }

  // Get ad by ID with language support (for frontend)
  static async getById(params, lang = "uz") {
    // Validate language to prevent SQL injection
    const validLangs = ["uz", "ru", "en"];
    const safeLang = validLangs.includes(lang) ? lang : "uz";

    const query = `
      SELECT
        id,
        COALESCE(title_${safeLang}, title) AS title,
        COALESCE(description_${safeLang}, description) AS description,
        file,
        type,
        status,
        cta_link,
        COALESCE(cta_text_${safeLang}, cta_text) AS cta_text,
        is_active,
        created_at,
        updated_at,
        '${process.env.BASE_URL}/ads/file/' || file AS file_url
      FROM ads WHERE id = $1 AND is_active = true
    `;

    const result = await db.query(query, params);

    return result[0];
  }

  // Get ad by ID including all language fields (for admin)
  static async getByIdAll(params) {
    const query = `SELECT *, '${process.env.BASE_URL}/ads/file/' || file AS file_url FROM ads WHERE id = $1 AND is_active = true`;

    const result = await db.query(query, params);

    return result[0];
  }

  // Get ads with language support (for frontend)
  static async get(params, filter, lang = "uz") {
    const conditions = [];

    // Validate language to prevent SQL injection
    const validLangs = ["uz", "ru", "en"];
    const safeLang = validLangs.includes(lang) ? lang : "uz";

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
          id,
          COALESCE(title_${safeLang}, title) AS title,
          COALESCE(description_${safeLang}, description) AS description,
          file,
          type,
          status,
          cta_link,
          COALESCE(cta_text_${safeLang}, cta_text) AS cta_text,
          is_active,
          created_at,
          updated_at,
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

  // Get all ads including all language fields (for admin)
  static async getAll(params, filter) {
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

  static async updateStatus(params) {
    const query = `UPDATE ads SET status = $1 WHERE id = $2 RETURNING *`;

    const result = await db.query(query, params);

    return result[0];
  }
};
