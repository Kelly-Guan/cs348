const pool = require("../config/database");

exports.allRatings = async (req,res,next) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT r.*, u.username, m.poster_link FROM ratings r
      JOIN users u ON r.uid = u.uid
      JOIN movies m ON r.mid = m.mid
    `);
    res.status(200).json({data: result.rows});
  } catch (err) {
    console.error(err);
    res.status(500).json("Something went wrong");
  } finally {
    client.release()
  }
}
exports.ratingsByGenre = async(req,res,next) => {
  const genre = req.params["genre"];
  const client = await pool.connect();
  try {
    const result = await client.query(`
    SELECT r.*,
    COALESCE(rv.upvotes, 0) AS upvotes,
    COALESCE(rv.downvotes, 0) AS downvotes
    FROM
    ratings r
    JOIN movies m ON r.mid = m.mid
    JOIN genres g ON m.mid = g.mid
    LEFT JOIN reviewer_votes rv ON r.uid = rv.uid AND r.mid = rv.mid
    WHERE g.genre = $1
    `,[genre]);
    res.status(200).json({data: result.rows});
  } catch (err) {
    console.error(err);
    res.status(500).json("Something went wrong");
  } finally {
    client.release()
  }
}

exports.ratingsByFriends = async(req,res,next) => {
  const follower_uid = req.params["follower_uid"];
  const client = await pool.connect();
  try {
    const result = await client.query(`
    SELECT r.*,
    COALESCE(rv.upvotes, 0) AS upvotes,
    COALESCE(rv.downvotes, 0) AS downvotes
    FROM ratings r
    LEFT JOIN reviewer_votes rv ON r.uid = rv.uid AND r.mid = rv.mid
    WHERE r.uid IN (
    SELECT following_uid FROM user_connections
    WHERE follower_uid = $1);
    `,[follower_uid]);
    res.status(200).json({data: result.rows});
  } catch (err) {
    console.error(err);
    res.status(500).json("Something went wrong");
  } finally {
    client.release()
  }
}

exports.ratingsByScore = async(req,res,next) => {
  const score = req.params["score"];
  const client = await pool.connect();
  try {
    const result = await client.query(`
    SELECT
    r.*,
    COALESCE(rv.upvotes, 0) AS upvotes,
    COALESCE(rv.downvotes, 0) AS downvotes
    FROM
    ratings r
    LEFT JOIN reviewer_votes rv ON (r.uid = rv.uid AND r.mid = rv.mid)
    WHERE rv.downvotes>0 AND rv.upvotes/rv.downvotes >= $1;
    `,[score]);
    res.status(200).json({data: result.rows});
  } catch (err) {
    console.error(err);
    res.status(500).json("Something went wrong");
  } finally {
    client.release()
  }
}
