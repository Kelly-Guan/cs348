/* FEATURE R6 - Account Management */


/* Should add a new row to the table users, where first_name = 'ben', last_name = 'smith', etc. */
INSERT INTO users (first_name,last_name,username,email,password) VALUES ('ben', 'smith', 'pizzaman', 'bensmith@gmail.ca', '1111111');

/* Should return 1, since there is a row where the username is pizzaman */
SELECT COUNT(*) FROM users u WHERE u.username = 'pizzaman';

/* Should return 10, since there isn't a row where the username is notcurrentlyausername */
SELECT COUNT(*) FROM users u WHERE u.username = 'notcurrentlyausername';

/* Should return 1111111, since that is ben's password */
SELECT u.password FROM users u WHERE u.username = 'pizzaman';

/* Should change ben smith's username to 'baconman' */
UPDATE users SET username = 'baconman' WHERE uid = 6;

/* Should delete Ben's account in users, as well as every row related to him */
DELETE FROM users u WHERE u.username = 'hkoya';


/* FEATURE R7 - Landing Page */

-- Showcases Recent Releases -> filter by ' release_date '
SELECT
  *
FROM
  movies
ORDER BY
  release_date DESC
LIMIT
  10;

-- Shows Popular Movies -> filtered by ' rating ' and ' release_date '
SELECT 
  m.mid,
  m.title,
  m.release_date,
  AVG(r.score) AS aggregate_rating
FROM
  movies m
  JOIN ratings r ON m.mid = r.mid
GROUP BY
  m.mid,
  m.title,
  m.release_date
ORDER BY
  m.release_date,
  aggregate_rating DESC
LIMIT
  10;


/* FEATURE R8 - User Page */

/* Should select all of Andrew's ratings */
SELECT
  m.title,
  r.*,
  u.first_name
FROM
  ratings r
  JOIN movies m ON r.mid = m.mid
  JOIN users u ON r.uid = u.uid
WHERE
  r.uid = 1 -- Andrew's uid
ORDER BY
  r.upvotes;

/* Should select all of Kelly's favourites */
SELECT
  m.title,
  f.rank,
  u.first_name
FROM
  favourites f
  JOIN movies m ON f.mid = m.mid
  JOIN users u ON f.uid = u.uid
WHERE
  f.uid = 3; -- Kelly's uid

/* Should select all of Hudson's watch later movies */
SELECT m.title, u.username
FROM watch_later wl
JOIN movies m ON wl.mid = m.mid
JOIN users u ON u.uid = 2 -- Hudson's uid
LIMIT 3;

/* Should return uid and username of all accounts Lindsay follows */
SELECT uc.following_uid, u.username
FROM user_connections uc
JOIN users u ON uc.following_uid = u.uid
WHERE uc.follower_uid = 5; -- Lindsay's uid

/* Should delete that Lindsay follows Arjun */
DELETE FROM user_connections
WHERE following_uid = 4
    AND follower_uid = 5;

/* Should give all of Arjuns info */
SELECT *
FROM users u
WHERE u.uid = 4;