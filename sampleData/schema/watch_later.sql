CREATE TABLE watch_later (
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