CREATE TABLE favourites (
    uid INTEGER NOT NULL REFERENCES users(uid),
    rank INT NOT NULL CHECK(rank >= 1 AND rank <= 5),
    mid INTEGER NOT NULL REFERENCES movies(mid),
    CHECK (uid, mid EXISTS (SELECT uid, mid FROM Watched)),
    PRIMARY KEY(uid, rank)
);

/*

CREATE TRIGGER ensureFavouritesNoGap
AFTER INSERT ON Favourites
REFERENCING NEW ROW AS NewFave, OLD TABLE AS OldFaves
FOR EACH STATEMENT
    WHEN (NewFave.rank > (SELECT COUNT(*) FROM OldFaves) + 1)
        NewFave.rank = (SELECT COUNT(*) FROM OldFaves)

CREATE TRIGGER maintainFavouritesOrderOnInsert
AFTER INSERT ON Favourites
REFERENCING NEW ROW AS NewFave, NEW TABLE AS NewFaves, OLD TABLE AS OldFaves
FOR EACH STATEMENT
    WHEN (NewFave.rank <= (SELECT COUNT(*) FROM OldFaves))
    BEGIN
        UPDATE Favourites
        SET rank = rank + 1
        WHERE rank >= NewFave.rank
    END

CREATE TRIGGER maintainFavouritesOrderOnUpdate
AFTER UPDATE OF rank ON Favourites
REFERENCING NEW ROW AS NewFave, NEW TABLE AS NewFaves, OLD TABLE AS OldFaves
FOR EACH STATEMENT
    WHEN (NewFave.rank <= (SELECT COUNT(*) FROM OldFaves))
    BEGIN
        UPDATE Favourites
        SET rank = rank + 1
        WHERE rank >= NewFave.rank
    END

CREATE TRIGGER maintainFavouritesOrderOnDELETE
AFTER UPDATE OF rank ON Favourites
REFERENCING OLD ROW AS DelFave, NEW TABLE AS NewFaves
FOR EACH STATEMENT
    WHEN (DelFave.rank <= (SELECT COUNT(*) FROM NewFaves))
    BEGIN
        UPDATE Favourites
        SET rank = rank - 1
        WHERE rank > DelFave.rank
    END

*/