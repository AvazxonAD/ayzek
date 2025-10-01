CREATE TABLE post_tags(
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) NOT NULL,
    tag_id INTEGER REFERENCES tags(id) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    is_active BOOLEAN DEFAULT TRUE
)