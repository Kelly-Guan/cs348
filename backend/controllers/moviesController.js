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