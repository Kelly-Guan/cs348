CREATE TABLE UserConnections (
    following_uID SERIAL NOT NULL REFERENCES User(uID),
    follower_uID SERIAL NOT NULL REFERENCES User(uID),
    PRIMARY KEY(following_uID, follower_uID)
);