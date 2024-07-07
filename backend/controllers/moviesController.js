const pool = require("../config/database");

exports.allMovies = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM Movies");
    res.status(200).json({data: result.rows});
  } catch (err) {
    console.error(err);
    res.status(500).json("Something went wrong");
  } finally {
    client.release()
  }
}

// Request movie by id
exports.movie = async (req, res, next) => {
  const mid = req.query.mid;
  if(mid == null) {
    res.status(400).json("No movie specified");
    return;
  }
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM Movies WHERE mid=$1", [mid]);
    if(result.rowCount == 0) {
      res.status(404).json("Movie not found");
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch(err) {
    console.error(err);
    res.status(404).json("Invalid movie id");
  } finally {
    client.release();
  }
}

exports.recentReleases = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const query_str = `
    SELECT * FROM movies
    ORDER BY release_date DESC LIMIT 10;`;
    const result = await client.query(query_str);
    res.status(200).json({data: result.rows});
  } catch(err) {
    console.error(err);
    res.status(404).json("Something went wrong");
  } finally {
    client.release();
  }
}

exports.popularMovies = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const query_str = `
    SELECT m.mid, m.title, m.release_date, AVG(r.score) AS aggregate_rating
    FROM movies m
    JOIN ratings r ON m.mid = r.mid
    GROUP BY m.mid, m.title, m.release_date
    ORDER BY m.release_date, aggregate_rating DESC
    LIMIT 10;
  `;
    const result = await client.query(query_str);
    res.status(200).json({data: result.rows});
  } catch(err) {
    console.error(err);
    res.status(404).json("Something went wrong");
  } finally {
    client.release();
  }
}

// optional queries: genre, rating, runtime, title

exports.search = async (req, res, next) => {

}

exports.test = async (req, res, next) => {
  res.send(req.query);
}