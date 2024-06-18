CREATE TYPE MovieGenre AS ENUM (
  'Animation',
  'Adventure',
  'Comedy',
  'Family',
  'Sci-Fi',
  'Sport'
);

CREATE TABLE Movies (
  mID SERIAL NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  releaseDate DATE NOT NULL,
  runtime INT NOT NULL,
  description TEXT NOT NULL,
  posterLink VARCHAR(512) NOT NULL,
  adult BOOLEAN NOT NULL
);

CREATE TABLE Users (
  uID SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE Favourites (
  uID INTEGER NOT NULL REFERENCES Users(uID),
  rank INT NOT NULL,
  mID INTEGER NOT NULL REFERENCES Movies(mID),
  PRIMARY KEY(uID, rank)
);

CREATE TABLE Genre (
  mID INTEGER NOT NULL REFERENCES Movies(mID),
  genre MovieGenre NOT NULL,
  PRIMARY KEY(mID, genre)
);

CREATE TABLE Movie_Cast (
  mID INTEGER NOT NULL REFERENCES Movies(mID),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  character VARCHAR(255),
  PRIMARY KEY(mID, name, role)
);

CREATE TABLE Rating (
  uID INTEGER NOT NULL REFERENCES Users(uID),
  mID INTEGER NOT NULL REFERENCES Movies(mID),
  score INT NOT NULL,
  ratingText VARCHAR(255),
  upvotes INT,
  downvotes INT,
  timestamp TIME NOT NULL,
  PRIMARY KEY(uID, mID)
);

CREATE TABLE UserConnections (
  followingUID INTEGER NOT NULL REFERENCES Users(uID),
  followerUID INTEGER NOT NULL REFERENCES Users(uID),
  PRIMARY KEY(followingUID, followerUID)
);

CREATE TABLE WatchLater (
  uID INTEGER NOT NULL REFERENCES Users(uID),
  mID INTEGER NOT NULL REFERENCES Movies(mID),
  PRIMARY KEY(uID, mID)
);

CREATE TABLE Watched (
  uID INTEGER NOT NULL REFERENCES Users(uID),
  mID INTEGER NOT NULL REFERENCES Movies(mID),
  timestamp TIME NOT NULL,
  PRIMARY KEY(uID, mID)
);