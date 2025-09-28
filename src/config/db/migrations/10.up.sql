delete from
    comments;

alter table
    comments
add
    column post_id integer references posts(id) not null