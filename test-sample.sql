-- If you have sucessfully run the databse init script you can run this file with:
-- psql postgres://postgres:postgres@127.0.0.1:5432 -f test-sample.sql > test-sample.out
-- This will run the tests fresh and put the results in test-sample.out



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
DELETE FROM users u WHERE u.username = 'baconman';


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


/* FEATURE R9 - Ratings Page */

/* Should select the ratings from all people Kelly follows */
  SELECT r.*
  FROM ratings r
  WHERE r.uid IN (
    SELECT following_uid FROM user_connections
    WHERE follower_uid = 3
  );

/* Should select all ratings for action movies */

  SELECT
  r.*
FROM
  ratings r
  JOIN movies m ON r.mid = m.mid
  JOIN genres g ON m.mid = g.mid
WHERE
  g.genre = 'Action';

/* Should select all ratings with a up to down vote ratio of 50% */
SELECT
  r.*
FROM
  ratings r
GROUP BY r.uid, r.mid
HAVING r.downvotes>0 AND SUM(r.upvotes)/SUM(r.downvotes) >= 0.5;

/* Should upvote the post made by  */
UPDATE
  ratings
SET
  upvotes = upvotes + 1
WHERE
  uid = 3
  AND mid = 3;

/* FEATURE R10 - Movies Page */

/* Should return the average rating for a movie (CWACOM in this example with mid 3) */
SELECT m.mid, AVG(r.score) AS avg_movie_rating
FROM movies m, ratings r
WHERE m.mid = r.mid
  AND m.mid = 3
GROUP BY m.mid;

/* Should return the rating ranking for a movie, i.e. the number of rows with average score above it (CWACOM in this example with mid 3) */
WITH mid_rating AS (
  SELECT m.mid, AVG(r.score) as avg_score
  FROM movies m, ratings r
  WHERE m.mid = r.mid
  GROUP BY m.mid
  ORDER BY avg_score DESC
)
SELECT COUNT(*) + 1 AS movie_ranking
FROM mid_rating mr1, mid_rating mr2
WHERE mr1.mid = 3
  AND mr1.avg_score < mr2.avg_score;

/* Should return all the rating details for a film (CWACOM in this example with mid 3) */
SELECT r.score, r.rating_text, r.upvotes, r.downvotes, r.date_posted
FROM movies m, ratings r
WHERE m.mid = r.mid 
  AND m.mid = 3;

/* Should return all the movie details for a film excluding cast (CWACOM in this example with mid 3) */
SELECT release_date, poster_link, runtime, adult
FROM movies
WHERE mid = 3;

/* Should return all the directors for a movie (CWACOM in this example with mid 3) */
SELECT name, role
FROM movie_cast
WHERE mid = 3
  AND role = 'Director';

/* Should return all the writers for a movie (CWACOM in this example with mid 3) */
SELECT name, role
FROM movie_cast
WHERE mid = 3
  AND role = 'Writer';

/* Should return all the actors for a movie (CWACOM in this example with mid 3) */
SELECT name, role, character
FROM movie_cast
WHERE mid = 3
  AND role = 'Actor';

/*

/* FEATURE R11 - Search Page/User Search Page */

/* Should return movies based on queries, rows commented to know when to add each */
WITH valid_mid AS (
  SELECT m.mid
  FROM movies m

  INTERSECT /* If searching by director/actor */
  SELECT m.mid
  FROM movies m
  JOIN ON movie_cast mc ON m.mid = mc.mid
  WHERE mc.name LIKE '%search_query%'

  INTERSECT /* If searching by genre, 'search_genre' is the genre being searched for */
  SELECT m.mid
  FROM movies m
  WHERE 'search_genre' IN (
    SELECT g.genre
    FROM genres g
    WHERE g.mid = m.mid
  )

  INTERSECT /* If searching by rating, search_rating is the min score searched for */
  SELECT m.mid
  FROM movies m
  JOIN ON ratings r ON m.mid = r.mid
  GROUP BY m.mid
  HAVING AVG(r.score) >= search_rating

  INTERSECT /* If searching by runtime, lb_runtime is the lower runtime, ub_runtime is the upper runtime */
  SELECT m.mid
  FROM movies m
  WHERE lb_runtime <= m.runtime 
    AND m.runtime <= up_runtime
  
  INTERSECT /* If searching by title, search_title is title being searched for */
  SELECT m.mid
  FROM movies m
  WHERE m.title LIKE '%search_title%'

  INTERSECT /* If searching by not adult */
  SELECT m.mid
  FROM movies m
  WHERE m.adult IS NOT TRUE
)
SELECT m.title, m.poster_link
FROM movies m, valid_mid vm
WHERE m.mid = vm.mid;

/* Should return usernames like some search query */
SELECT u.uid
FROM users u
WHERE u.username LIKE '%search_username%';

*/