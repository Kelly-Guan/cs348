CREATE TYPE movie_genre AS ENUM (
  'Animation',
  'Adventure',
  'Comedy',
  'Family',
  'Sci-Fi',
  'Sport'
);

CREATE TABLE genre (
  mid INTEGER NOT NULL REFERENCES movies(mid),
  genre MovieGenre NOT NULL,
  PRIMARY KEY(mid, genre)
);