CREATE TABLE user_connections (
  following_uid INTEGER,
  follower_uid INTEGER,
  CHECK (following_uid != follower_uid),
  PRIMARY KEY (following_uid, follower_uid),
  FOREIGN KEY (following_uid) REFERENCES users(uid) ON DELETE CASCADE,
  FOREIGN KEY (follower_uid) REFERENCES users(uid) ON DELETE CASCADE
);