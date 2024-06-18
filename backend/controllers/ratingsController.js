const pool = require("../config/database");

exports.allRatings = async (res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM Ratings");
    res.status(200).json({data: result.rows});
  } catch (err) {
    console.error(err);
    res.status(500).json("Something went wrong");
  } finally {
    client.release()
  }
}