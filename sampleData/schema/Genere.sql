CREATE TYPE movie_genre AS ENUM (
  'Animation',
  'Adventure',
  'Comedy',
  'Family',
  'Sci-Fi',
  'Sport'
);

CREATE TABLE Genres (
  mID SERIAL,
  genre movie_genre 
  CONSTRAINT fk_genre 
  FOREIGN KEY(mID) REFERENCES Movies(mID)
);