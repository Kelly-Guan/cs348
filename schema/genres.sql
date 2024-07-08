CREATE TYPE movie_genre AS ENUM (
  'War',
  'Science Fiction',
  'Crime',
  'Action',
  'Family',
  'TV Movie',
  'Mystery',
  'Adventure',
  'Fantasy',
  'Foreign',
  'Western',
  'Music',
  'Documentary',
  'Romance',
  'Thriller',
  'Drama',
  'History',
  'Horror',
  'Animation',
  'Comedy'
);

CREATE TABLE genres (
  mid INTEGER,
  genre movie_genre NOT NULL,
  PRIMARY KEY (mid, genre),
  FOREIGN KEY (mid) REFERENCES movies(mid) ON DELETE CASCADE
);

