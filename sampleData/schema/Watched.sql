CREATE TABLE watched (
    uid INTEGER NOT NULL REFERENCES users(uid),
    mid INTEGER NOT NULL REFERENCES movies(mid),
    date_watched DATE NOT NULL,
    PRIMARY KEY(uid, mid)
);

/*

CREATE TRIGGER deleteFromWatchLater
AFTER INSERT ON watched
REFERENCING NEW ROW AS newWatched
FOR EACH ROW
    DELETE FROM watch_later
    WHERE uid = newWatched.uid
        AND mid = newWatched.mid

*/