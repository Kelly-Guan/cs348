CREATE TYPE MovieGenre AS ENUM (
  'Animation',
  'Adventure',
  'Comedy',
  'Family',
  'Sci-Fi',
  'Sport'
);

CREATE TABLE Genre (
  mID INTEGER NOT NULL REFERENCES Movies(mID),
  genre MovieGenre NOT NULL,
  PRIMARY KEY(mID, genre)
);