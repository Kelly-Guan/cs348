CREATE TABLE UserConnections (
following_uID INTEGER NOT NULL REFERENCES Users(uID),
follower_uID INTEGER NOT NULL REFERENCES Users(uID),
PRIMARY KEY(following_uID, follower_uID)
);