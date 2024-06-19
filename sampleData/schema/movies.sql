CREATE TABLE movies (
  mid SERIAL UNIQUE,
  title VARCHAR(255) NOT NULL,
  release_date DATE NOT NULL,
  runtime INTEGER NOT NULL,
  description TEXT NOT NULL,
  poster_link VARCHAR(512) NOT NULL,
  adult BOOLEAN NOT NULL
);
