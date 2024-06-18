const pool = require("../config/database");

exports.allRatings = async (req,res,next) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT r.*, u.username FROM Ratings r
      JOIN Users u ON r.uid = u.uid
    `);
    res.status(200).json({data: result.rows});
  } catch (err) {
    console.error(err);
    res.status(500).json("Something went wrong");
  } finally {
    client.release()
  }
}