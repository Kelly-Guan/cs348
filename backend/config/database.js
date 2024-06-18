require("dotenv").config();
const pg = require("pg");

const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  max: process.env.DB_POOL,
});

module.exports = pool;