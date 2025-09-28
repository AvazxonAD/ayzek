DROP TABLE comment;

create table comments(
    id serial primary key not null,
    comment varchar(100000) not null,
    reply_id integer references comments(id),
    account_id integer references accounts(id),
    created_at timestamp not null,
    updated_at timestamp not null,
    is_active boolean default true
)