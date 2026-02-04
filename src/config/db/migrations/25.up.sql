-- =============================================
-- MULTI-LANGUAGE SUPPORT FOR INFO AND CATEGORIES
-- Adding _uz, _ru, _en columns for translatable fields
-- =============================================

-- INFO TABLE: Add language columns for translatable fields
ALTER TABLE info ADD COLUMN IF NOT EXISTS brand_description_uz TEXT;
ALTER TABLE info ADD COLUMN IF NOT EXISTS brand_description_ru TEXT;
ALTER TABLE info ADD COLUMN IF NOT EXISTS brand_description_en TEXT;

ALTER TABLE info ADD COLUMN IF NOT EXISTS contact_location_uz VARCHAR(255);
ALTER TABLE info ADD COLUMN IF NOT EXISTS contact_location_ru VARCHAR(255);
ALTER TABLE info ADD COLUMN IF NOT EXISTS contact_location_en VARCHAR(255);

ALTER TABLE info ADD COLUMN IF NOT EXISTS target_age_range_uz VARCHAR(50);
ALTER TABLE info ADD COLUMN IF NOT EXISTS target_age_range_ru VARCHAR(50);
ALTER TABLE info ADD COLUMN IF NOT EXISTS target_age_range_en VARCHAR(50);

ALTER TABLE info ADD COLUMN IF NOT EXISTS target_learning_method_uz VARCHAR(255);
ALTER TABLE info ADD COLUMN IF NOT EXISTS target_learning_method_ru VARCHAR(255);
ALTER TABLE info ADD COLUMN IF NOT EXISTS target_learning_method_en VARCHAR(255);

-- CATEGORIES TABLE: Add language columns for name
ALTER TABLE categories ADD COLUMN IF NOT EXISTS name_uz VARCHAR(255);
ALTER TABLE categories ADD COLUMN IF NOT EXISTS name_ru VARCHAR(255);
ALTER TABLE categories ADD COLUMN IF NOT EXISTS name_en VARCHAR(255);

-- Copy existing data to _uz columns (default language)
UPDATE info SET
    brand_description_uz = brand_description,
    contact_location_uz = contact_location,
    target_age_range_uz = target_age_range,
    target_learning_method_uz = target_learning_method
WHERE brand_description_uz IS NULL;

UPDATE categories SET name_uz = name WHERE name_uz IS NULL;
