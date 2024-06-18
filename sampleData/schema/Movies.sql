CREATE TABLE Movie (
  mID SERIAL NOT NULL PRIMARY KEY,
  title NOT NULL VARCHAR(255),
  relaseDate NOT NULL DATE,
  runtime NOT NULL INT,
  decription TEXT,
  posterLink VARCHAR(512),
  adult NOT NULL BOOLEAN
);

