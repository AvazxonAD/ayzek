CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    fio VARCHAR NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

INSERT INTO
    users (username, password, fio, is_admin, is_active)
VALUES
    (
        'developer',
        '$2a$10$z4dywBLPHupNi8SE/4joZeHxnTHAyDqlM8nvP/MQ8TEddj7gkMkCW',
        'System Developer',
        TRUE,
        TRUE
    );