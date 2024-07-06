const pool = require("../config/database");

// api/users/create
// api/users/delete
// api/users/update
// api/users/{id}
// api/users/{id}/favourites
// api/users/{id}/following
// api/users/{id}/followers

// Assume all valid inputs(checked on the frontend)
exports.create = async (req, res, next) => {
  const { first_name, last_name, username, email, password } = req.body;
  const query_str =
    "INSERT INTO users (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5)";
  const params = [first_name, last_name, username, email, password];

  const client = await pool.connect();

  try {
    const result = await client.query(query_str, params);
    if (result.rowCount == 0) {
      res.status(500).json("Something went wrong creating a new user");
    }
    res.status(201).json(result.rows[0]);
  } catch (err) {
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
      req.status(404).json("User not found to delete");
    } else {
      req.status(204);
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
  }

};

exports.followingByID = async (req, res, next) => {
  const uid = req.params["uid"];
  if (uid == null) {
    res.status(400).json("No specified user to update");
    return;
  }
};

exports.followersByID = async (req, res, next) => {
  const uid = req.params["uid"];
  if (uid == null) {
    res.status(400).json("No specified user to update");
    return;
  }
};
