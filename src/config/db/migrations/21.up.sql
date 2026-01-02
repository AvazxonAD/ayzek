create table user_post(
    id serial primary key,
    user_id int not null,
    post_id int not null,
    created_at timestamp default now(),
    updated_at timestamp default now(),
    is_active boolean default true
)