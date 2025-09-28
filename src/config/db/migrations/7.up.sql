create table accounts(
    id serial primary key not null,
    email varchar not null,
    password varchar not null,
    created_at timestamp,
    updated_at timestamp,
    is_active boolean default true
);