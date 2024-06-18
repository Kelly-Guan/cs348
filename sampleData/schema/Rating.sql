CREATE TABLE Rating (
    uID SERIAL NOT NULL REFERENCES User(uID),
    mID SERIAL NOT NULL REFERENCES Movies(mID),
    score NOT NULL INT,
    ratingText VARCHAR(255),
    upvotes INT,
    downvotes INT,
    t_stamp NOT NULL INT,
    PRIMARY KEY(uID, mID)
);