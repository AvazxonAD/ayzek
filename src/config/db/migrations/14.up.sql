create table gifs (
    id SERIAL PRIMARY KEY, 
    file VARCHAR(1000) NOT NULL, 
    created_at timestamp default now(),
    updated_at timestamp default now(),
    isdeleted boolean default false
)