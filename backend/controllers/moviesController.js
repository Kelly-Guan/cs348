const pool = require("../config/database");
const {SHRT_LENGTH, MEDM_LENGTH, LONG_LENGTH, MOVIE_PAGE_LIMIT} = require("../config/constants");

exports.allMovies = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM Movies LIMIT 10");
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

exports.movieGenre = async (req, res, next) => {
  const mid = req.params["mid"];
  if(mid == null) {
    res.status(400).json("No movie specified");
    return;
  }
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT genre FROM Genres WHERE mid=$1", [mid]);
    if(result.rowCount == 0) {
      res.status(404).json("Movie not found");
    } else {
      let resp = []
      result.rows.forEach((r) => {
        resp.push(r.genre)
      })
      res.status(200).json(resp);
    }
  } catch(err) {
    console.error(err);
    res.status(404).json("Invalid movie id");
  } finally {
    client.release();
  }
}

exports.movieCast = async (req, res, next) => {
  const mid = req.params["mid"];
  if(mid == null) {
    res.status(400).json("No movie specified");
    return;
  }
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT name FROM movie_cast WHERE mid=$1", [mid]);
    if(result.rowCount == 0) {
      res.status(404).json("Movie not found");
    } else {
      let resp = []
      result.rows.forEach((r) => {
        resp.push(r.name)
      })
      res.status(200).json(resp);
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
  let template_params = [];
  let template_count = 1;
  const { title, genre, rating, runtime, offset } = req.query;
  var query_str = "SELECT * FROM movies m";

  if(genre != null) {
    query_str += " JOIN genres g ON g.mid = m.mid"
  }
  query_str += " WHERE 1=1"; // so that we can append without worrying about and
  if(title != null) {
    query_str += ` AND title ILIKE $${template_count++}`;
    template_params.push(title);
  }
  if(genre != null) {
    query_str += ` AND genre=$${template_count++}`
    template_params.push(genre);
  }
  if(rating != null) {
    let [low, high] = rating.split("-")
    template_params.push(low);
    template_params.push(high);
    query_str += ` AND $${template_count++} <= (SELECT AVG(score) FROM ratings r WHERE r.mid = m.mid) AND (SELECT AVG(score) FROM ratings r WHERE r.mid = m.mid) <= $${template_count++}`;
  }
  // short, medium or long
  if(runtime) {
    if(runtime == "short") query_str += ` AND runtime <= ${SHRT_LENGTH}`
    if(runtime == "medium") query_str += ` AND ${SHRT_LENGTH} <= runtime AND runtime <= ${MEDM_LENGTH}`
    if(runtime == "long") query_str += ` AND ${LONG_LENGTH} <= runtime`;
  }

  query_str += ` LIMIT ${MOVIE_PAGE_LIMIT} OFFSET ${MOVIE_PAGE_LIMIT*(offset == null || isNaN(offset) ? 0 : offset)}`;
 
  const client = await pool.connect();

  try {
    const result = await client.query(query_str, template_params);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Not so bueno search")
  } finally {
    client.release();
  }
}

exports.test = async (req, res, next) => {
  res.send(req.query);
}