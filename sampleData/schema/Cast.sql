CREATE TABLE Cast (
    mID INTEGER NOT NULL REFERENCES Movies(mID),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    character VARCHAR(255),
    PRIMARY KEY(mID, name, role)
);