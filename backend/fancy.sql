-- FANCY FEATURE 1: other users with similar taste

WITH similar_users AS (
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
    (SELECT r.uid, COUNT(*) AS mycount
    FROM ratings r
    WHERE r.uid != 1728
        AND r.mid IN
        (SELECT mid
        FROM ratings
        WHERE uid = 1728)
        AND ABS(r.score - (SELECT score FROM ratings WHERE uid = 1728 AND mid = r.mid)) <= 2
    GROUP BY r.uid
    ORDER BY mycount DESC)
)
SELECT su.uid, SUM(su.mycount) AS similarity_points
FROM similar_users su
GROUP BY su.uid
ORDER BY similarity_points DESC
LIMIT 10;


-- FANCY FEATURE 2: Movies Recommended for you





-- FANCY FEATURE 3: Other films like this


-- genre intersect each other to find one with most in common genre
-- SELECT g.mid, COUNT(*) AS common_genre_count
-- FROM movie_genre g
-- WHERE g.mid IN
--     (SELECT mid
--     FROM movie_genre
--     WHERE mid = x)
--     AND g.mid != x
-- GROUP BY g.mid
-- ORDER BY common_genre_count DESC;