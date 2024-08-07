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
    SELECT m.mid, m.title, m.release_date, m.runtime, m.description, m.poster_link,  AVG(r.score) AS aggregate_rating
    FROM movies m
    JOIN ratings r ON m.mid = r.mid
    GROUP BY m.mid, m.title, m.release_date, m.description, m.poster_link, m.runtime
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

exports.watchedByFriends = async (req, res, next) => {
  const uid = req.cookies.signedInUser;
  if(uid === undefined) {
    res.status(405).json("User is not logged in");
    return;
  }

  const client = await pool.connect();

  try {

    const query_str = `SELECT m*, AVG(r.score) AS aggregate_rating
    FROM movies m
    JOIN ratings r ON m.mid = r.mid
    
    `

  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong finding movies your firend likes");
  } finally{client.release()}

}


//TODO: Needs Fixing

exports.moviesLikeThis = async (req, res, next) => {
  const client = await pool.connect();
  const mid = req.params["mid"];
  try {
    const query_str = `
    WITH similar_films AS (
      -- number of favourites that $1 shares with another
      (SELECT f2.mid, COUNT(*) AS myscore
      FROM favourites f1, favourites f2
      WHERE f1.uid = f2.uid
          AND f1.mid = $1
          AND f2.mid != $1
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
          WHERE mid = $1)
          AND g.mid != $1
      GROUP BY g.mid
      ORDER BY myscore DESC
      LIMIT 3)
  )
  SELECT *
  FROM similar_films
  ORDER BY myscore DESC
  LIMIT 10;
  `;
    const result = await client.query(query_str,[mid]);
    res.status(200).json({data: result.rows});
  } catch(err) {
    console.error(err);
    res.status(404).json("Something went wrong");
  } finally {
    client.release();
  }
}