CREATE TABLE ratings (
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
);