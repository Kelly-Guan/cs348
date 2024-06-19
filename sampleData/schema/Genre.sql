CREATE TYPE movie_genre AS ENUM (
  'Animation',
  'Adventure',
  'Comedy',
  'Family',
  'Sci-Fi',
  'Sport'
);

CREATE TABLE genre (
  mid INTEGER,
  genre MovieGenre NOT NULL,
  PRIMARY KEY (mid, genre),
  FOREIGN KEY (mid) REFERENCES movies(mid) ON DELETE CASCADE
);