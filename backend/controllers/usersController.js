const pool = require("../config/database");
const { FOLLOW_PAGE_LIMIT } = require("../config/constants");
const { query } = require("express");
const bcrypt = require("bcrypt")
const saltRounds = 10;

// Assume all valid inputs(checked on the frontend)
exports.create = async (req, res, next) => {
  const { first_name, last_name, username, email, password } = req.body;


  const hash = await bcrypt.hash(password, saltRounds)
  
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
  const { offset } = req.query;
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
  const { offset } = req.query;
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
    SELECT m.title, u.username
    FROM watch_later wl
    JOIN movies m ON wl.mid = m.mid
    WHERE wl.uid = $1
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
    res.send(500).json("Something went wrong retreiving user's ratings");
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
    const result = await client.query(`
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
  const {username, password} = req.body;
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT password FROM users WHERE username=$1 OR email=$1", [username]);
    if(result.rowCount != 1) {
      res.status(404).json("user not found");
    } else {
      var is_password_correct = await bcrypt.compare(password, result.rows[0].password)

      if(is_password_correct) {res.status(200).json("");}
      else {res.status(404).json("");}
    }
  } catch (err) {

  } finally {
    client.release();
  }
};


