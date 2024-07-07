const pool = require("../config/database");
const {FOLLOW_PAGE_LIMIT} = require("../config/constants");
// api/users/create
// api/users/{id}/delete
// api/users/{id}/update
// api/users/{id}
// api/users/{id}/favourites?
// api/users/{id}/following?
// api/users/{id}/followers?

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
  if (uid == null && parseInt(uid,10).toString()===uid) {
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
  if (uid == null && parseInt(uid,10).toString()===uid) {
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
  if (uid == null && parseInt(uid,10).toString()===uid) {
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
  if (uid == null && parseInt(uid,10).toString()===uid) {
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
  if (uid == null && parseInt(uid,10).toString()===uid) {
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
 } catch(err) {
    console.log(err);
    res.status(500).json("Something went wrong");
 } finally {
    client.release();
 }
};

exports.followersByID = async (req, res, next) => {
  const uid = req.params["uid"];
  const { offset } = req.query;
  if (uid == null && parseInt(uid, 10).toString() === uid) {
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
  const { offset } = req.query;
  if (uid == null && parseInt(uid,10).toString()===uid) {
    res.status(400).json("No specified user to update");
    return;
  }
  const client = await pool.connect();
  try{
    const result = await client.query(`
    SELECT m.*, w.date_watched
    FROM watched w
    JOIN movies m ON w.mid = m.mid
    WHERE w.uid = $1
    LIMIT $2 OFFSET $3;`,[uid,FOLLOW_PAGE_LIMIT,offset]);
    if(result.rowCount === 0){
      res.status(404).json("user's watch later list not found");
    }else{
      res.status(200).json(result.rows);
    }
  }catch (err) {
    console.log(err);
    res.send(500).json("Something went wrong retreiving user's Watch Later");
  } finally {
    client.release();
  }  
};
exports.watchLaterByID = async (req, res, next) => {
  const uid = req.params["uid"];
  const { offset } = req.query;
  if (uid == null && parseInt(uid,10).toString()===uid) {
    res.status(400).json("No specified user to update");
    return;
  }
  const client = await pool.connect();
  try{
    const result = await client.query(`
    SELECT m.title, u.username
    FROM watch_later wl
    JOIN movies m ON wl.mid = m.mid
    WHERE wl.uid = $1
    LIMIT $2 OFFSET $3;`,[uid,FOLLOW_PAGE_LIMIT,offset]);
    if(result.rowCount === 0){
      res.status(404).json("user's watch later list not found");
    }else{
      res.status(200).json(result.rows);
    }
  }catch (err) {
    console.log(err);
    res.send(500).json("Something went wrong retreiving user's Watch Later");
  } finally {
    client.release();
  }
};

exports.ratingsByID = async (req, res, next) => {
  const uid = req.params["uid"];
  const { offset } = req.query;
  if (uid == null && parseInt(uid,10).toString()===uid) {
    res.status(400).json("No specified user to update");
    return;
  }
  const client = await pool.connect();
  try {
    const result = await client.query(`
    SELECT m.title, r.*, rv.upvotes, rv.downvotes, u.first_name
    FROM ratings r
    JOIN movies m ON r.mid = m.mid
    JOIN users u ON r.uid = u.uid
    LEFT JOIN reviewer_votes rv ON r.uid = rv.uid AND r.mid = rv.mid
    WHERE
    r.uid = $1 
    ORDER BY rv.upvotes
    LIMIT $2 OFFSET $3`, [uid,FOLLOW_PAGE_LIMIT,offset]);
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

// exports.unfollow = async (req, res, next) => {
//   const { following_uid } = req.query;
//   const follower_uid = req.params["follower_uid"];
//   if (following_uid == null && parseInt(following_uid,10).toString()===following_uid || follower_uid == null && parseInt(follower_uid,10).toString()===follower_uid) {
//     res.status(400).json("No user to unfollow");
//     return;
//   }
//   const client = await pool.connect();
//   try {
//     const result = await client.query(`
//     DELETE FROM user_connections 
//     WHERE following_uid = $1 AND follower_uid = $2;`,[following_uid,follower_uid]);
//     if (result.rowCount == 0) {
//       req.status(404).json("User not found to unfollow");
//     } else {
//       req.status(204);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json("Something went wrong deleting a user");
//   } finally {
//     client.release();
//   }
// };
