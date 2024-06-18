CREATE TYPE movie_genre AS ENUM (
  'Animation',
  'Adventure',
  'Comedy',
  'Family',
  'Sci-Fi',
  'Sport'
);

CREATE TABLE Genre (
  mID SERIAL NOT NULL REFERENCES Movies(mID),
  genre movie_genre NOT NULL,
  PRIMARY_KEY(mID, genre)
);