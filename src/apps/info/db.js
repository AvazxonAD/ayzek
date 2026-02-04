const { db } = require("../../config/db/index");

class InfoDB {
  // Get info with language support (for frontend)
  static async get(lang = "uz") {
    // Validate language to prevent SQL injection
    const validLangs = ["uz", "ru", "en"];
    const safeLang = validLangs.includes(lang) ? lang : "uz";

    const result = await db.query(
      `
      SELECT
        id,
        brand_name,
        brand_domain,
        COALESCE(brand_description_${safeLang}, brand_description) AS brand_description,
        social_youtube,
        social_instagram,
        social_telegram,
        social_facebook,
        COALESCE(contact_location_${safeLang}, contact_location) AS contact_location,
        contact_phone,
        contact_email,
        COALESCE(target_age_range_${safeLang}, target_age_range) AS target_age_range,
        COALESCE(target_learning_method_${safeLang}, target_learning_method) AS target_learning_method,
        map_latitude,
        map_longitude,
        map_zoom,
        created_at,
        updated_at
      FROM info
      LIMIT 1
    `
    );
    return result[0] || null;
  }

  // Get all info including all language fields (for admin)
  static async getAll() {
    const result = await db.query(
      `
      SELECT
        id,
        brand_name,
        brand_domain,
        brand_description,
        brand_description_uz,
        brand_description_ru,
        brand_description_en,
        social_youtube,
        social_instagram,
        social_telegram,
        social_facebook,
        contact_location,
        contact_location_uz,
        contact_location_ru,
        contact_location_en,
        contact_phone,
        contact_email,
        target_age_range,
        target_age_range_uz,
        target_age_range_ru,
        target_age_range_en,
        target_learning_method,
        target_learning_method_uz,
        target_learning_method_ru,
        target_learning_method_en,
        map_latitude,
        map_longitude,
        map_zoom,
        created_at,
        updated_at
      FROM info
      LIMIT 1
    `
    );
    return result[0] || null;
  }

  static async update(id, data) {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    // Non-translatable fields
    if (data.brand_name !== undefined) {
      fields.push(`brand_name = $${paramIndex++}`);
      values.push(data.brand_name);
    }

    if (data.brand_domain !== undefined) {
      fields.push(`brand_domain = $${paramIndex++}`);
      values.push(data.brand_domain);
    }

    // Translatable field: brand_description
    if (data.brand_description !== undefined) {
      fields.push(`brand_description = $${paramIndex++}`);
      values.push(data.brand_description);
    }
    if (data.brand_description_uz !== undefined) {
      fields.push(`brand_description_uz = $${paramIndex++}`);
      values.push(data.brand_description_uz);
    }
    if (data.brand_description_ru !== undefined) {
      fields.push(`brand_description_ru = $${paramIndex++}`);
      values.push(data.brand_description_ru);
    }
    if (data.brand_description_en !== undefined) {
      fields.push(`brand_description_en = $${paramIndex++}`);
      values.push(data.brand_description_en);
    }

    // Social links
    if (data.social_youtube !== undefined) {
      fields.push(`social_youtube = $${paramIndex++}`);
      values.push(data.social_youtube);
    }

    if (data.social_instagram !== undefined) {
      fields.push(`social_instagram = $${paramIndex++}`);
      values.push(data.social_instagram);
    }

    if (data.social_telegram !== undefined) {
      fields.push(`social_telegram = $${paramIndex++}`);
      values.push(data.social_telegram);
    }

    if (data.social_facebook !== undefined) {
      fields.push(`social_facebook = $${paramIndex++}`);
      values.push(data.social_facebook);
    }

    // Translatable field: contact_location
    if (data.contact_location !== undefined) {
      fields.push(`contact_location = $${paramIndex++}`);
      values.push(data.contact_location);
    }
    if (data.contact_location_uz !== undefined) {
      fields.push(`contact_location_uz = $${paramIndex++}`);
      values.push(data.contact_location_uz);
    }
    if (data.contact_location_ru !== undefined) {
      fields.push(`contact_location_ru = $${paramIndex++}`);
      values.push(data.contact_location_ru);
    }
    if (data.contact_location_en !== undefined) {
      fields.push(`contact_location_en = $${paramIndex++}`);
      values.push(data.contact_location_en);
    }

    if (data.contact_phone !== undefined) {
      fields.push(`contact_phone = $${paramIndex++}`);
      values.push(data.contact_phone);
    }

    if (data.contact_email !== undefined) {
      fields.push(`contact_email = $${paramIndex++}`);
      values.push(data.contact_email);
    }

    // Translatable field: target_age_range
    if (data.target_age_range !== undefined) {
      fields.push(`target_age_range = $${paramIndex++}`);
      values.push(data.target_age_range);
    }
    if (data.target_age_range_uz !== undefined) {
      fields.push(`target_age_range_uz = $${paramIndex++}`);
      values.push(data.target_age_range_uz);
    }
    if (data.target_age_range_ru !== undefined) {
      fields.push(`target_age_range_ru = $${paramIndex++}`);
      values.push(data.target_age_range_ru);
    }
    if (data.target_age_range_en !== undefined) {
      fields.push(`target_age_range_en = $${paramIndex++}`);
      values.push(data.target_age_range_en);
    }

    // Translatable field: target_learning_method
    if (data.target_learning_method !== undefined) {
      fields.push(`target_learning_method = $${paramIndex++}`);
      values.push(data.target_learning_method);
    }
    if (data.target_learning_method_uz !== undefined) {
      fields.push(`target_learning_method_uz = $${paramIndex++}`);
      values.push(data.target_learning_method_uz);
    }
    if (data.target_learning_method_ru !== undefined) {
      fields.push(`target_learning_method_ru = $${paramIndex++}`);
      values.push(data.target_learning_method_ru);
    }
    if (data.target_learning_method_en !== undefined) {
      fields.push(`target_learning_method_en = $${paramIndex++}`);
      values.push(data.target_learning_method_en);
    }

    // Map fields
    if (data.map_latitude !== undefined) {
      fields.push(`map_latitude = $${paramIndex++}`);
      values.push(data.map_latitude);
    }

    if (data.map_longitude !== undefined) {
      fields.push(`map_longitude = $${paramIndex++}`);
      values.push(data.map_longitude);
    }

    if (data.map_zoom !== undefined) {
      fields.push(`map_zoom = $${paramIndex++}`);
      values.push(data.map_zoom);
    }

    if (fields.length === 0) {
      return await InfoDB.getAll();
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE info
      SET ${fields.join(", ")}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result[0] || null;
  }
}

module.exports = { InfoDB };
