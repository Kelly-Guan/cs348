CREATE TABLE Cast (
    mID SERIAL NOT NULL REFERENCES Movies(mID),
    name NOT NULL VARCHAR(255),
    role NOT NULL VARCHAR(255),
    character VARCHAR(255),
    PRIMARY_KEY(mID, name, role)
);