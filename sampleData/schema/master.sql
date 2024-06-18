CREATE TABLE Movies (
  mID SERIAL NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  relaseDate DATE NOT NULL,
  runtime INT NOT NULL,
  decription TEXT NOT NULL,
  posterLink VARCHAR(512) NOT NULL,
  adult BOOLEAN NOT NULL
);

CREATE TABLE Users (
  uID SERIAL PRIMARY KEY,
  f_name VARCHAR(255) NOT NULL,
  l_name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE UserConnections (
  following_uID INTEGER NOT NULL REFERENCES Users(uID),
  follower_uID INTEGER NOT NULL REFERENCES Users(uID),
  PRIMARY KEY(following_uID, follower_uID)
);

w

CREATE TABLE Favourites (
  uID INTEGER NOT NULL REFERENCES Users(uID),
  rank INT NOT NULL,
  mID INTEGER NOT NULL REFERENCES Movies(mID),
  PRIMARY KEY(uID, rank)
);

CREATE TYPE movie_genre AS ENUM (
  'Animation',
  'Adventure',
  'Comedy',
  'Family',
  'Sci-Fi',
  'Sport'
);

CREATE TABLE Genre (
  mID INTEGER NOT NULL REFERENCES Movies(mID),
  genre movie_genre NOT NULL,
  PRIMARY KEY(mID, genre)
);

CREATE TABLE Rating (
  uID INTEGER NOT NULL REFERENCES Users(uID),
  mID INTEGER NOT NULL REFERENCES Movies(mID),
  score INT NOT NULL,
  ratingText VARCHAR(255),
  upvotes INT,
  downvotes INT,
  t_stamp TIME NOT NULL,
  PRIMARY KEY(uID, mID)
);

CREATE TABLE WatchLater (
  uID INTEGER NOT NULL REFERENCES Users(uID),
  mID INTEGER NOT NULL REFERENCES Movies(mID),
  PRIMARY KEY(uID, mID)
);

CREATE TABLE Watched (
  uID INTEGER NOT NULL REFERENCES Users(uID),
  mID INTEGER NOT NULL REFERENCES Movies(mID),
  t_stamp TIME NOT NULL,
  PRIMARY KEY(uID, mID)
);