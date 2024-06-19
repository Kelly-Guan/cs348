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

/* Should delete Andrew Jia's account in users, as well as every row related to him */
DELETE FROM users u WHERE u.username = 'akyjia';


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