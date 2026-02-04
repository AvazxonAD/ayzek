-- =============================================
-- ERKATOY.UZ - INFO TABLE
-- Barcha ma'lumotlar bitta jadvalda
-- =============================================

CREATE TABLE info (
    id SERIAL PRIMARY KEY,
    
    -- Brand ma'lumotlari
    brand_name VARCHAR(100) NOT NULL,
    brand_domain VARCHAR(255) NOT NULL,
    brand_description TEXT,
    
    -- Ijtimoiy tarmoqlar
    social_youtube VARCHAR(255),
    social_instagram VARCHAR(255),
    social_telegram VARCHAR(255),
    social_facebook VARCHAR(255),
    
    -- Aloqa ma'lumotlari
    contact_location VARCHAR(255),
    contact_phone VARCHAR(50),
    contact_email VARCHAR(255),
    
    -- Maqsadli auditoriya
    target_age_range VARCHAR(50),
    target_learning_method VARCHAR(255),
    
    -- Xarita joylashuvi
    map_latitude DECIMAL(10, 6),
    map_longitude DECIMAL(10, 6),
    map_zoom INT DEFAULT 15,
    
    -- Vaqt belgilari
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- INSERT INTO
-- =============================================

INSERT INTO info (
    brand_name,
    brand_domain,
    brand_description,
    social_youtube,
    social_instagram,
    social_telegram,
    social_facebook,
    contact_location,
    contact_phone,
    contact_email,
    target_age_range,
    target_learning_method,
    map_latitude,
    map_longitude,
    map_zoom
) VALUES (
    'Erkatoy',
    'Erkatoy.uz',
    'Erkatoy.uz — bolalar uchun mo''ljallangan ertaklar, she''rlar, topishmoqlar va bolalar adabiyotiga oid qiziqarli materiallar jamlangan o''zbekcha vebsayt. Sayt kichkintoylarning tasavvuri, fikrlashi va nutini rivojlantirishga xizmat qiladi.',
    'https://youtube.com/',
    'https://instagram.com/',
    'https://t.me/',
    'https://facebook.com/',
    'Toshkent, O''zbekiston',
    '+998 90 123 45 67',
    'info@erkatoy.uz',
    '3-10 yosh',
    'O''qish va tinglash orqali o''rganish',
    41.311081,
    69.279737,
    15
);