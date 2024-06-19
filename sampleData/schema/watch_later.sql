CREATE TABLE watch_later (
    uid INTEGER NOT NULL REFERENCES users(uid),
    mid INTEGER NOT NULL REFERENCES movies(mid),
    CHECK (uid, mid NOT EXISTS (SELECT uid, mid FROM Watched)),
    PRIMARY KEY(uid, mid)
);