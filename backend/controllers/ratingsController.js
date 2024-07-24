const pool = require("../config/database");

exports.allRatings = async (req,res,next) => {
  const limit = req.params["limit"] ?? 20;
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT r.*, u.username, m.poster_link FROM ratings r
      JOIN users u ON r.uid = u.uid
      JOIN movies m ON r.mid = m.mid
      LIMIT $1
    `, [limit]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json("Something went wrong");
  } finally {
    client.release()
  }
}

exports.ratingsByGenre = async(req,res,next) => {
  
  const genre = req.params["genre"];
  const limit = req.query["limit"] ?? 20;

  const client = await pool.connect();
  try {
    const result = await client.query(`
    SELECT r.*,
    m.poster_link,
    m.title,
    u.username,
    COALESCE(rv.upvotes, 0) AS upvotes,
    COALESCE(rv.downvotes, 0) AS downvotes
    FROM
    ratings r
    JOIN movies m ON r.mid = m.mid
    JOIN genres g ON m.mid = g.mid
    JOIN users u ON r.uid = u.uid
    LEFT JOIN reviewer_votes rv ON r.uid = rv.uid AND r.mid = rv.mid
    WHERE g.genre = $1
    LIMIT $2
    `,[genre, limit]);
    res.status(200).json(result.rows);
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
    m.poster_link,
    COALESCE(rv.upvotes, 0) AS upvotes,
    COALESCE(rv.downvotes, 0) AS downvotes
    FROM ratings r
    LEFT JOIN reviewer_votes rv ON r.uid = rv.uid AND r.mid = rv.mid
    LEFT JOIN movies m on r.mid = m.mid
    WHERE r.uid IN (
    SELECT following_uid FROM user_connections
    WHERE follower_uid = $1);
    `,[follower_uid]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json("Something went wrong");
  } finally {
    client.release()
  }
}

exports.ratingsByRatio = async(req,res,next) => {
  const score = req.params["ratio"];
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
    `,[ratio]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json("Something went wrong");
  } finally {
    client.release()
  }
}

exports.ratingsByMovie = async(req,res,next) => {
  const mid = req.params["mid"];
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
    WHERE r.mid = $1;
    `,[mid]);
    res.status(200).json(result.rows);
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
    WHERE r.score = $1;
    `,[score]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json("Something went wrong");
  } finally {
    client.release()
  }
}

exports.ratingsByUser = async(req,res,next) => {
  const user = req.params["user"];
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
    WHERE r.uid = $1;
    `,[user]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json("Something went wrong");
  } finally {
    client.release()
  }
}
exports.recentRatings = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const query_str = `
    SELECT r.*, m.* FROM ratings r
    JOIN movies m on m.mid = r.mid
    ORDER BY r.date_posted DESC LIMIT 10;`;
    const result = await client.query(query_str);
    res.status(200).json({data: result.rows});
  } catch(err) {
    console.error(err);
    res.status(404).json("Something went wrong");
  } finally {
    client.release();
  }
}




exports.addReview = async (req, res, next) => {
  const { uid, mid, score, rating_text, date_posted } = req.body;

  // Validate input data
  // if (typeof uid !== 'number' || typeof mid !== 'number' || typeof score !== 'number' || score < 0 || score > 5 || typeof rating_text !== 'string' || !date_posted) {
  //   return res.status(400).json({ error: 'Invalid input data' });
  // }

  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO ratings (uid, mid, score, rating_text, date_posted)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (uid, mid) DO NOTHING;`;
    const values = [uid, mid, score, rating_text, date_posted];
    await client.query(query, values);
    res.status(200).json({ message: 'Review added successfully' });
  } catch (err) {
    console.error('Error inserting review:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.release();
  }
};