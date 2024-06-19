CREATE TABLE user_connections (
  following_uid INTEGER NOT NULL REFERENCES users(uid),
  follower_uid INTEGER NOT NULL REFERENCES users(uid),
  CHECK (following_uid != follower_uid),
  PRIMARY KEY(following_uid, follower_uid)
);