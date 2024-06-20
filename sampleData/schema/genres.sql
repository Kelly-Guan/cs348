CREATE TYPE movie_genre AS ENUM (
  'Action',
  'Animation',
  'Adventure',
  'Comedy',
  'Family',
  'Sci-Fi',
  'Sport',
  'Fantasy'
);

CREATE TABLE genres (
  mid INTEGER,
  genre movie_genre NOT NULL,
  PRIMARY KEY (mid, genre),
  FOREIGN KEY (mid) REFERENCES movies(mid) ON DELETE CASCADE
);