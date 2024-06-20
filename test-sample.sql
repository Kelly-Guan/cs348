/* FEATURE R6 - Account Management */


/* Should add a new row to the table users, where first_name = 'ben', last_name = 'smith', etc. */
INSERT INTO users (first_name,last_name,username,email,password) VALUES ('ben', 'smith', 'pizzaman', 'bensmith@gmail.ca', '1111111');

/* Should return 1, since there is a row where the username is pizzaman */
SELECT COUNT(*) FROM users u WHERE u.username = 'pizzaman';

/* Should return 1, since there isn't a row where the username is notcurrentlyausername */
SELECT COUNT(*) FROM users u WHERE u.username = 'notcurrentlyausername';

/* Should return 1111111, since that is ben's password */
SELECT u.password FROM users u WHERE u.username = 'pizzaman';

/* Should change ben smith's username to 'baconman' */
UPDATE users SET username = 'baconman' WHERE uid = 6;

/* Should delete Ben's account in users, as well as every row related to him */
DELETE FROM users u WHERE u.username = 'baconman';


/* FEATURE R7 - Landing Page */

SELECT
  m.mid,
  m.title,
  m.release_date,
  SUM(r.score) AS aggregate_rating
FROM
  movies m
  JOIN ratings r ON m.mid = r.mid
GROUP BY
  m.mid,
  m.title,
  m.release_date
ORDER BY
  aggregate_rating,
  m.release_date DESC
LIMIT
  10;

SELECT
FROM
  movies
ORDER BY
  release_date DESC
LIMIT
  10;


/* FEATURE R8 - User Page */

/* Should select all of Andrew's ratings */
SELECT m.title, r.score, r.rating_text, r.upvotes, r.downvotes
FROM ratings r, movies m
WHERE r.uid = 1
    AND r.mid = m.mid
ORDER BY upvotes;

/* Should select all of Kelly's favourites */
SELECT m.title, f.rank
FROM favourites f, movies m
WHERE f.uid = 3;

/* Should select all of Hudson's watch later movies */
SELECT m.title
FROM watch_later wl, movies m
WHERE wl.uid = 2
    AND m.mid = wl.mid
LIMIT 3;

/* Should return username of all of Lindsay's following */
SELECT u2.username
FROM user_connections uc, users u2
WHERE uc.follower_uid = 5
    AND uc.following_uid = u2.uid;

/* Should delete that Lindsay follows Arjun */
DELETE FROM user_connections
WHERE following_uid = 4
    AND follower_uid = 5;

/* Should give all of Arjuns info */
SELECT u.first_name, u.last_name, u.email
FROM users u
WHERE u.uid = 4;