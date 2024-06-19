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