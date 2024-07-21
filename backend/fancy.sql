-- for all of them, can add a quick score check

-- FANCY FEATURE 1: other users with similar taste

-- the users that are similar to user 1728
WITH similar_users_ungrouped AS (
    -- users with similar favourites
    (SELECT f.uid, COUNT(*) AS mycount
    FROM favourites f
    WHERE f.uid != 1728
        AND f.mid IN
        (SELECT mid
        FROM favourites
        WHERE uid = 1728)
    GROUP BY f.uid
    ORDER BY mycount DESC)
    UNION
    -- users with similar ratings
    (SELECT r.uid, COUNT(*) AS mycount
    FROM ratings r
    WHERE r.uid != 1728
        AND r.mid IN
        (SELECT mid
        FROM ratings
        WHERE uid = 1728)
        AND ABS(r.score - (SELECT score FROM ratings WHERE uid = 1728 AND mid = r.mid)) <= 1
    GROUP BY r.uid
    ORDER BY mycount DESC)
)
SELECT su.uid, SUM(su.mycount) AS similarity_points
FROM similar_users_ungrouped su
GROUP BY su.uid
ORDER BY similarity_points DESC
LIMIT 10;




-- FANCY FEATURE 2: Movies Recommended for you

-- similar users, their favourites
WITH similar_users_ungrouped AS (
    -- users with similar favourites
    (SELECT f.uid, COUNT(*) AS mycount
    FROM favourites f
    WHERE f.uid != 6539
        AND f.mid IN
        (SELECT mid
        FROM favourites
        WHERE uid = 6539)
    GROUP BY f.uid
    ORDER BY mycount DESC)
    UNION
    -- users with similar ratings
    (SELECT r.uid, COUNT(*) AS mycount
    FROM ratings r
    WHERE r.uid != 6539
        AND r.mid IN
        (SELECT mid
        FROM ratings
        WHERE uid = 6539)
        AND ABS(r.score - (SELECT score FROM ratings WHERE uid = 6539 AND mid = r.mid)) <= 1
    GROUP BY r.uid
    ORDER BY mycount DESC)
),
similar_users AS (
    SELECT su.uid, SUM(su.mycount) AS similarity_points
    FROM similar_users su
    GROUP BY su.uid
    ORDER BY similarity_points DESC
    LIMIT 10
),
good_recs AS (
    -- selects from favourites where uid in (similar to user 6539) and not in (6539's favourites)
    (SELECT f.mid, (similarity_points + 5 - f.rank) AS myscore
    FROM favourites f
    JOIN similar_users su ON su.uid = f.uid
    WHERE f.mid NOT IN
        (SELECT mid
        FROM favourites
        WHERE uid = 6539)
    ORDER BY similarity_points DESC
    LIMIT 10)
    UNION
    -- similar users, their high rating
    (SELECT r.mid, (similarity_points + r.score) AS myscore
    FROM ratings r
    JOIN similar_users su ON su.uid = r.uid
    WHERE r.score >= 4
    ORDER BY similarity_points DESC
    LIMIT 10)
    UNION
    -- movies with similar genres to our favourite
    (SELECT g.mid, SUM(genre_fav_count) AS myscore
    FROM genres g, 
        (SELECT g.genre, COUNT(*) AS genre_fav_count
        FROM favourites f
        JOIN genres g ON g.mid = f.mid
        WHERE f.uid = 6539
        GROUP BY g.genre
        ORDER BY genre_fav_count DESC) AS t
    WHERE g.genre = t.genre
    GROUP BY g.mid
    ORDER BY SUM(genre_fav_count) DESC
    LIMIT 10)
)
SELECT *
FROM good_recs
ORDER BY myscore DESC
LIMIT 10;



-- FANCY FEATURE 3: Other films like this

WITH similar_films AS (
    -- number of favourites that 32162 shares with another
    (SELECT f2.mid, COUNT(*) AS myscore
    FROM favourites f1, favourites f2
    WHERE f1.uid = f2.uid
        AND f1.mid = 11163
        AND f2.mid != 11163
    GROUP BY f2.mid
    ORDER BY myscore DESC
    LIMIT 10)
    UNION
    -- similar genres
    (SELECT g.mid, COUNT(*) AS myscore
    FROM genres g
    WHERE g.genre IN
        (SELECT genre
        FROM genres
        WHERE mid = 22547)
        AND g.mid != 22547
    GROUP BY g.mid
    ORDER BY myscore DESC
    LIMIT 3)
)
SELECT *
FROM similar_films
ORDER BY myscore DESC
LIMIT 10;