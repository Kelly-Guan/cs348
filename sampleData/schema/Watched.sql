CREATE TABLE watched (
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

*/