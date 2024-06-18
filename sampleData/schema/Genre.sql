CREATE TYPE movie_genre AS ENUM (
  'Animation',
  'Adventure',
  'Comedy',
  'Family',
  'Sci-Fi',
  'Sport'
);

<<<<<<< HEAD:sampleData/schema/Genere.sql
CREATE TABLE Genres (
  mID SERIAL,
  genre movie_genre 
  CONSTRAINT fk_genre 
  FOREIGN KEY(mID) REFERENCES Movies(mID)
=======
CREATE TABLE Genre (
  mID SERIAL NOT NULL REFERENCES Movies(mID),
  genre movie_genre NOT NULL,
  PRIMARY_KEY(mID, genre)
>>>>>>> 061c5ba5ed323a5115efc5cdae1a6ebb46ec4865:sampleData/schema/Genre.sql
);