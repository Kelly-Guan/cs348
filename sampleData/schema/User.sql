<<<<<<< HEAD
CREATE TABLE Users (
  uID SERIAL PRIMARY KEY,
  f_name VARCHAR(127),
  l_name VARCHAR(127),
  username VARCHAR(32),
  email VARCHAR(127),
  password VARCHAR(127)
);

=======
CREATE TABLE User (
    uID SERIAL NOT NULL PRIMARY KEY,
    f_name NOT NULL VARCHAR(255),
    l_name NOT NULL VARCHAR(255),
    username NOT NULL VARCHAR(255),
    email NOT NULL VARCHAR(255),
    password NOT NULL VARCHAR(255)
);
>>>>>>> 061c5ba5ed323a5115efc5cdae1a6ebb46ec4865
