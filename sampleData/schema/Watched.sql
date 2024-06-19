CREATE TABLE watched (
    uid INTEGER NOT NULL REFERENCES users(uid),
    mid INTEGER NOT NULL REFERENCES movies(mid),
    date_watched DATE NOT NULL,
    PRIMARY KEY(uid, mid)
);