CREATE TABLE ratings (
  uid INTEGER,
  mid INTEGER,
  score INTEGER NOT NULL,
  rating_text VARCHAR(255),
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  date_posted TIMESTAMP NOT NULL,
  CHECK(score <= 5 AND score >= 0),
  PRIMARY KEY(uid, mid),
  FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
  FOREIGN KEY (mid) REFERENCES movies(mid) ON DELETE CASCADE
);

/*

CREATE TRIGGER addRatingToWatched
AFTER INSERT ON ratings
REFERENCING NEW ROW AS newRow
FOR EACH ROW
  INSERT INTO watched VALUES(newRow.uid, newRow.mid, the time right now)

*/