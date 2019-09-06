CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT,
    public_id TEXT
);
CREATE TABLE IF NOT EXISTS photos (
    id SERIAL PRIMARY KEY,
    public_id TEXT,
    caption TEXT,
    belongs_to_user INTEGER,
    camera TEXT,
    aperature TEXT,
    shutter TEXT,
    iso TEXT
);
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    comment TEXT,
    belongs_to_photo INTEGER,
    comment_by_user INTEGER
);
CREATE TABLE IF NOT EXISTS replies (
    id SERIAL PRIMARY KEY,
    reply_to_comment INTEGER
);