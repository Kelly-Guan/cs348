CREATE TABLE Movie (
  mID SERIAL PRIMARY KEY,
  title VARCHAR(255),
  relaseDate DATE,
  runtime INT,
  decription TEXT,
  posterLink VARCHAR(512),
  adult BOOLEAN
);

