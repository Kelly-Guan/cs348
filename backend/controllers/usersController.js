const pool = require("../config/database");
const { FOLLOW_PAGE_LIMIT } = require("../config/constants");
const { query } = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Assume all valid inputs(checked on the frontend)
exports.create = async (req, res, next) => {
  console.log(req.body);
  const { first_name, last_name, username, email, password } = req.body;

  const hash = await bcrypt.hash(password, saltRounds);

  const query_str =
    "INSERT INTO users (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const params = [first_name, last_name, username, email, hash];

  const client = await pool.connect();
  try {
    const result = await client.query(query_str, params);
    if (result.rowCount == 0) {
      res.status(500).json("Something went wrong creating a new user");
    }
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong creating a new user");
  } finally {
    client.release();
  }
};

exports.delete = async (req, res, next) => {
  const uid = req.params["uid"];
  if (uid == null) {
    res.status(400).json("No specified user to delete");
    return;
  }

  const client = await pool.connect();
  try {
    const result = await client.query("DELETE FROM users WHERE uid=$1", [uid]);
    if (result.rowCount == 0) {
      res.status(404).json("User not found to delete");
    } else {
      res.status(204).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong deleting a user");
  } finally {
    client.release();
  }
};

exports.update = async (req, res, next) => {
  const uid = req.params["uid"];
  if (uid == null) {
    res.status(400).json("No specified user to update");
    return;
  }

  const { first_name, last_name, username, email, password } = req.body;
  const query_str = `UPDATE users SET first_name = $1, last_name = $2, username = $3, email = $4, password = $5
    WHERE uid = $6`;
  const params = [first_name, last_name, username, email, password, uid];

  const client = await pool.connect();

  try {
    const result = await client.query(query_str, params);
    if (result.rowCount == 0) {
      res.status(500).json("Something went wrong updating a user");
    }
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json("Something went wrong updating a user");
  } finally {
    client.release();
  }
};

exports.byID = async (req, res, next) => {
  const uid = req.params["uid"];
  if (uid == null) {
    res.status(400).json("No specified user to update");
    return;
  }

  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM users WHERE uid = $1", [uid]);
    if (result.rowCount === 0) {
      res.status(404).json("user not found");
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    console.log(err);
    res.send(500).json("Something went wrong retreiving user");
  } finally {
    client.release();
  }
};

exports.favouritesByID = async (req, res, next) => {
  const uid = req.params["uid"];
  if (uid == null) {
    res.status(400).json("No specified user to update");
    return;
  }

  const query_str = `SELECT m.*, f.*, u.uid, u.username
    FROM favourites f
    JOIN movies m ON f.mid = m.mid
    JOIN users u ON f.uid = u.uid
    WHERE f.uid = $1`;

  const client = await pool.connect();
  try {
    const result = await client.query(query_str, [uid]);
    if (result.rowCount === 0) {
      res.status(404).json("users favourites not found");
    } else {
      res.status(200).json(result.rows);
    }
  } catch (err) {
    console.log(err);
    res.send(500).json("Something went wrong retreiving users favourties");
  } finally {
    client.release();
  }
};

exports.followingByID = async (req, res, next) => {
  const uid = req.params["uid"];
  let { offset } = req.query;
  if (offset == null) offset = 0;
  if (uid == null) {
    res.status(400).json("No specified user to find");
    return;
  }
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT uc.following_uid, u.username
        FROM user_connections uc
        JOIN users u ON uc.following_uid = u.uid
        WHERE uc.follower_uid = $1 
        LIMIT $2 OFFSET $3`,
      [uid, FOLLOW_PAGE_LIMIT, offset]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong");
  } finally {
    client.release();
  }
};

exports.followersByID = async (req, res, next) => {
  const uid = req.params["uid"];
  let { offset } = req.query;
  if (offset == null) offset = 0;
  if (uid == null) {
    res.status(400).json("No specified user to find");
    return;
  }
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT uc.follower_uid, u.username
        FROM user_connections uc
        JOIN users u ON uc.follower_uid = u.uid
        WHERE uc.following_uid = $1 
        LIMIT $2 OFFSET $3`,
      [uid, FOLLOW_PAGE_LIMIT, offset]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong");
  } finally {
    client.release();
  }
};

exports.watchedByID = async (req, res, next) => {
  const uid = req.params["uid"];
  let { offset } = req.query;
  if (offset == null) offset = 0;
  if (uid == null) {
    res.status(400).json("No specified user to update");
    return;
  }
  const client = await pool.connect();
  try {
    const result = await client.query(
      `
    SELECT m.*, w.date_watched
    FROM watched w
    JOIN movies m ON w.mid = m.mid
    WHERE w.uid = $1
    LIMIT $2 OFFSET $3;`,
      [uid, FOLLOW_PAGE_LIMIT, FOLLOW_PAGE_LIMIT * offset]
    );
    if (result.rowCount === 0) {
      res.status(404).json("user's watch later list not found");
    } else {
      res.status(200).json(result.rows);
    }
  } catch (err) {
    console.log(err);
    res.send(500).json("Something went wrong retreiving user's Watch Later");
  } finally {
    client.release();
  }
};
exports.watchLaterByID = async (req, res, next) => {
  const uid = req.params["uid"];
  const { offset } = req.query;
  if (uid == null) {
    res.status(400).json("No specified user to update");
    return;
  }
  const client = await pool.connect();
  try {
    const result = await client.query(
      `
    SELECT m.title, u.username,m.poster_link
    FROM watch_later wl
    JOIN movies m ON wl.mid = m.mid
    JOIN users u ON  wl.uid = u.uid
    WHERE wl.uid = $1`,[uid]);
    if (result.rowCount === 0) {
      res.status(404).json("user's watch later list not found");
    } else {
      res.status(200).json(result.rows);
    }
  } catch (err) {
    console.log(err);
    res.send(500).json("Something went wrong retreiving user's Watch Later");
  } finally {
    client.release();
  }
};

exports.ratingsByID = async (req, res, next) => {
  const uid = req.params["uid"];
  const { offset } = req.query;
  if (offset == null) offset = 0;
  if (uid == null) {
    res.status(400).json("No specified user to update");
    return;
  }
  const client = await pool.connect();
  try {
    const result = await client.query(
      `
    SELECT m.title, r.*, rv.upvotes, rv.downvotes, u.first_name
    FROM ratings r
    JOIN movies m ON r.mid = m.mid
    JOIN users u ON r.uid = u.uid
    LEFT JOIN reviewer_votes rv ON r.uid = rv.uid AND r.mid = rv.mid
    WHERE r.uid = $1 
    ORDER BY rv.upvotes
    LIMIT $2 OFFSET $3`,
      [uid, FOLLOW_PAGE_LIMIT, FOLLOW_PAGE_LIMIT * offset]
    );
    if (result.rowCount === 0) {
      res.status(404).json("user's ratings not found");
    } else {
      res.status(200).json(result.rows);
    }
  } catch (err) {
    console.log(err);
    // res.send(500).json("Something went wrong retreiving user's ratings");
  } finally {
    client.release();
  }
};

exports.unfollow = async (req, res, next) => {
  const { following_uid, follower_uid } = req.query;

  if (following_uid == null || follower_uid == null) {
    res.status(400).json("No user to unfollow");
    return;
  }
  const client = await pool.connect();
  try {
    const result = await client.query(
      `
    DELETE FROM user_connections 
    WHERE following_uid = $1 AND follower_uid = $2`,
      [following_uid, follower_uid]
    );
    if (result.rowCount == 0) {
      res.status(404).json("User not found to unfollow");
    } else {
      res.status(204).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong deleting a user");
  } finally {
    client.release();
  }
};

exports.follow = async (req, res, next) => {
  const { following_uid, follower_uid } = req.query;
  if (following_uid == null || follower_uid == null) {
    res.status(400).json("No user to unfollow");
    return;
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      `
    INSERT INTO user_connections (following_uid, follower_uid) VALUES ($1, $2) RETURNING *`,
      [following_uid, follower_uid]
    );
    if (result.rowCount == 0) {
      res.status(404).json("User not found to follow");
    } else {
      res.status(201).json(result.rows[0]);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong following a user");
  } finally {
    client.release();
  }
};

exports.auth = async (req, res, next) => {
  const { username, password } = req.body;
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT uid,password FROM users WHERE username=$1 OR email=$1", [
      username,
    ]);
    if (result.rowCount != 1) {
      res.status(404).json("user not found");
    } else {
      var is_password_correct = await bcrypt.compare(password, result.rows[0].password);

      if (is_password_correct || result.rows[0].password == password) {
        res.status(200).json(result.rows[0].uid);
      } else {
        res.status(404).json("Wrong password");
        console.log("password failed")
      }
    }
  } catch (err) {
    res.status(500).json("Something went wrong with auth");
  } finally {
    client.release();
  }
};


exports.similarTasteByID = async (req, res, next) => {
  const uid = req.params["uid"];
  let { offset } = req.query;
  if (offset == null) offset = 0;
  if (uid == null) {
    res.status(400).json("No specified user to update");
    return;
  }
  const client = await pool.connect();
  try {
    const result = await client.query(
      `
      WITH similar_users_ungrouped AS (
        (SELECT f.uid, COUNT(*) AS mycount
        FROM favourites f
        WHERE f.uid != $1
            AND f.mid IN
            (SELECT mid
            FROM favourites
            WHERE uid = $1)
        GROUP BY f.uid
        ORDER BY mycount DESC)
        UNION
        -- users with similar ratings
        (SELECT r.uid, COUNT(*) AS mycount
        FROM ratings r
        WHERE r.uid != $1
            AND r.mid IN
            (SELECT mid
            FROM ratings
            WHERE uid = $1)
            AND ABS(r.score - (SELECT score FROM ratings WHERE uid = $1 AND mid = r.mid)) <= 1
        GROUP BY r.uid
        ORDER BY mycount DESC)
    )
    SELECT su.uid, SUM(su.mycount) AS similarity_points
    FROM similar_users_ungrouped su
    GROUP BY su.uid
    ORDER BY similarity_points DESC
    LIMIT 10;`,
      [uid]
    );
    if (result.rowCount === 0) {
      res.status(404).json("similar users not found");
    } else {
      res.status(200).json(result.rows);
    }
  } catch (err) {
    console.log(err);
    // res.send(500).json("Something went wrong retreiving user's ratings");
  } finally {
    client.release();
  }
};

exports.recommendedByID = async (req, res, next) => {
  const uid = req.params["uid"];
  let { offset } = req.query;
  if (offset == null) offset = 0;
  if (uid == null) {
    res.status(400).json("No specified user to update");
    return;
  }
  const client = await pool.connect();
  try {
    const result = await client.query(
      `
      WITH similar_users_ungrouped AS (
        -- users with similar favourites
        (SELECT f.uid, COUNT(*) AS mycount
        FROM favourites f
        WHERE f.uid != $1
            AND f.mid IN
            (SELECT mid
            FROM favourites
            WHERE uid = $1)
        GROUP BY f.uid
        ORDER BY mycount DESC)
        UNION
        -- users with similar ratings
        (SELECT r.uid, COUNT(*) AS mycount
        FROM ratings r
        WHERE r.uid != $1
            AND r.mid IN
            (SELECT mid
            FROM ratings
            WHERE uid = $1)
            AND ABS(r.score - (SELECT score FROM ratings WHERE uid = $1 AND mid = r.mid)) <= 1
        GROUP BY r.uid
        ORDER BY mycount DESC)
    ),
    similar_users AS (
        SELECT su.uid, SUM(su.mycount) AS similarity_points
        FROM similar_users_ungrouped su
        GROUP BY su.uid
        ORDER BY similarity_points DESC
        LIMIT 10
    ),
    good_recs AS (
        -- selects from favourites where uid in (similar to user $1) and not in ($1's favourites)
        (SELECT f.mid, (similarity_points + 5 - f.rank) AS myscore
        FROM favourites f
        JOIN similar_users su ON su.uid = f.uid
        WHERE f.mid NOT IN
            (SELECT mid
            FROM favourites
            WHERE uid = $1)
        ORDER BY myscore DESC
        LIMIT 10)
        UNION
        -- similar users, their high rating
        (SELECT r.mid, (similarity_points + r.score) AS myscore
        FROM ratings r
        JOIN similar_users su ON su.uid = r.uid
        WHERE r.score >= 4
        ORDER BY myscore DESC
        LIMIT 10)
        UNION
        -- movies with similar genres to our favourite
        (SELECT g.mid, SUM(genre_fav_count) AS myscore
        FROM genres g, 
            (SELECT g.genre, COUNT(*) AS genre_fav_count
            FROM favourites f
            JOIN genres g ON g.mid = f.mid
            WHERE f.uid = $1
            GROUP BY g.genre
            ORDER BY genre_fav_count DESC) AS t
        WHERE g.genre = t.genre
        GROUP BY g.mid
        ORDER BY SUM(genre_fav_count) DESC
        LIMIT 10)
    )

      SELECT * FROM movies m WHERE m.mid IN (SELECT mid FROM good_recs) LIMIT 10`,
      [uid]
    );
    if (result.rowCount === 0) {
      res.status(404).json("recommended films not found");
    } else {
      res.status(200).json(result.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong retrieving user's ratings");
  } finally {
    client.release();
  }
};
