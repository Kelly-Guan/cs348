CREATE TABLE movies (
  mid SERIAL UNIQUE,
  title VARCHAR(255) NOT NULL,
  release_date DATE NOT NULL,
  runtime INTEGER NOT NULL,
  description TEXT NOT NULL,
  poster_link VARCHAR(512) NOT NULL,
  adult BOOLEAN NOT NULL
);
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
  genre movie_genre NOT NULL,
  PRIMARY KEY (mid, genre),
  FOREIGN KEY (mid) REFERENCES movies(mid) ON DELETE CASCADE
);CREATE TABLE users (
  uid SERIAL UNIQUE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);CREATE TABLE watched (
  uid INTEGER,
  mid INTEGER,
  date_watched DATE NOT NULL,
  PRIMARY KEY(uid, mid),
  FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
  FOREIGN KEY (mid) REFERENCES movies(mid) ON DELETE CASCADE
);

/*

CREATE TRIGGER deleteFromWatchLater
AFTER INSERT ON watched
REFERENCING NEW ROW AS newWatched
FOR EACH ROW
    DELETE FROM watch_later
    WHERE uid = newWatched.uid
        AND mid = newWatched.mid

*/CREATE TABLE favourites (
  uid INTEGER,
  mid INTEGER,
  rank INTEGER NOT NULL CHECK(rank >= 1 AND rank <= 5),
  PRIMARY KEY (uid, rank),
  FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
  FOREIGN KEY (mid) REFERENCES movies(mid) ON DELETE CASCADE,
  FOREIGN KEY (uid, mid) REFERENCES watched(uid, mid)
);

/*

CREATE TRIGGER ensureFavouritesNoGap
AFTER INSERT ON Favourites
REFERENCING NEW ROW AS NewFave, OLD TABLE AS OldFaves
FOR EACH STATEMENT
    WHEN (NewFave.rank > (SELECT COUNT(*) FROM OldFaves) + 1)
        NewFave.rank = (SELECT COUNT(*) FROM OldFaves)

CREATE TRIGGER maintainFavouritesOrderOnInsert
AFTER INSERT ON Favourites
REFERENCING NEW ROW AS NewFave, NEW TABLE AS NewFaves, OLD TABLE AS OldFaves
FOR EACH STATEMENT
    WHEN (NewFave.rank <= (SELECT COUNT(*) FROM OldFaves))
    BEGIN
        UPDATE Favourites
        SET rank = rank + 1
        WHERE rank >= NewFave.rank
    END

CREATE TRIGGER maintainFavouritesOrderOnUpdate
AFTER UPDATE OF rank ON Favourites
REFERENCING NEW ROW AS NewFave, NEW TABLE AS NewFaves, OLD TABLE AS OldFaves
FOR EACH STATEMENT
    WHEN (NewFave.rank <= (SELECT COUNT(*) FROM OldFaves))
    BEGIN
        UPDATE Favourites
        SET rank = rank + 1
        WHERE rank >= NewFave.rank
    END

CREATE TRIGGER maintainFavouritesOrderOnDELETE
AFTER UPDATE OF rank ON Favourites
REFERENCING OLD ROW AS DelFave, NEW TABLE AS NewFaves
FOR EACH STATEMENT
    WHEN (DelFave.rank <= (SELECT COUNT(*) FROM NewFaves))
    BEGIN
        UPDATE Favourites
        SET rank = rank - 1
        WHERE rank > DelFave.rank
    END

*/CREATE TABLE movie_cast (
  mid INTEGER,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  character VARCHAR(255),
  PRIMARY KEY (mid, name, role),
  FOREIGN KEY (mid) REFERENCES movies(mid) ON DELETE CASCADE
);CREATE TABLE ratings (
  uid INTEGER,
  mid INTEGER,
  score INTEGER NOT NULL,
  rating_text VARCHAR(255),
  upvotes INTEGER,
  downvotes INTEGER,
  date_posted TIMESTAMP NOT NULL,
  PRIMARY KEY(uid, mid),
  FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
  FOREIGN KEY (mid) REFERENCES movies(mid) ON DELETE CASCADE
);CREATE TABLE user_connections (
  following_uid INTEGER,
  follower_uid INTEGER,
  CHECK (following_uid != follower_uid),
  PRIMARY KEY (following_uid, follower_uid),
  FOREIGN KEY (following_uid) REFERENCES users(uid) ON DELETE CASCADE,
  FOREIGN KEY (follower_uid) REFERENCES users(uid) ON DELETE CASCADE
);CREATE TABLE watch_later (
  uid INTEGER,
  mid INTEGER,
  PRIMARY KEY(uid, mid),
  FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
  FOREIGN KEY (mid) REFERENCES movies(mid) ON DELETE CASCADE
);

/*

CREATE TRIGGER checkNotInWatched
AFTER INSERT ON watch_later
REFERENCING NEW ROW AS newRow
FOR EACH ROW
    WHEN (newRow.uid, newRow.mid EXISTS (SELECT uid, mid FROM watched))
        DELETE FROM watch_later
        WHERE uid = newRow.uid AND mid = newRow.mid

*/