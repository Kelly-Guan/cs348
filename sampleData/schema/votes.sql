CREATE TABLE votes(
    voter_uid INTEGER,
    reviewer_uid INTEGER, 
    mid INTEGER,
    vote BOOLEAN,
    PRIMARY KEY(voter_uid, reviewer_uid, mid),
    FOREIGN KEY (voter_uid) REFERENCES users(uid) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_uid) REFERENCES users(uid) ON DELETE CASCADE,
    FOREIGN KEY (mid) REFERENCES movies(mid) ON DELETE CASCADE
);
