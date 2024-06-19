CREATE TABLE movie_cast (
    mid INTEGER NOT NULL REFERENCES movies(mid),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    character VARCHAR(255),
    PRIMARY KEY(mid, name, role)
);