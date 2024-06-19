CREATE TABLE watch_later (
    uid INTEGER NOT NULL REFERENCES users(uid),
    mid INTEGER NOT NULL REFERENCES movies(mid),
    PRIMARY KEY(uid, mid)
);