CREATE TABLE ratings (
uid INTEGER NOT NULL REFERENCES users(uid),
mid INTEGER NOT NULL REFERENCES movies(mid),
score INT NOT NULL,
rating_text VARCHAR(255),
upvotes INT,
downvotes INT,
date_posted TIMESTAMP NOT NULL,
CHECK (uid, mid EXISTS (SELECT uid, mid FROM Watched)),
PRIMARY KEY(uid, mid)
);