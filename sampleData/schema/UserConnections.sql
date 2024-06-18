CREATE TABLE UserConnections (
  followingUID INTEGER NOT NULL REFERENCES Users(uID),
  followerUID INTEGER NOT NULL REFERENCES Users(uID),
  PRIMARY KEY(followingUID, followerUID)
);