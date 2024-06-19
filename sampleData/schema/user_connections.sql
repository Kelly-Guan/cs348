CREATE TABLE user_connections (
  following_uid INTEGER NOT NULL REFERENCES users(uid),
  follower_uid INTEGER NOT NULL REFERENCES users(uid),
  PRIMARY KEY(following_uid, follower_uid)
);