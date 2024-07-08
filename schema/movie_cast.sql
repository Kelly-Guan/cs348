CREATE TABLE movie_cast (
  mid INTEGER,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  character VARCHAR(255),
  PRIMARY KEY (mid, name, role, character),
  FOREIGN KEY (mid) REFERENCES movies(mid) ON DELETE CASCADE
);