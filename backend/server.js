const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const pgp = require("pg-promise")(/* options */);
const db = pgp("postgres://postgres:postgres@127.0.0.1:5432");

app.get("/test", async (req, res) => {
  try {
    const data = await db.any("SELECT * FROM test");
    res.status(200).json(data);
  } catch {
    res.status(500).json("fucked");
  }
});

app.get("/", async (req, res) => {
  try {
    const resp = await db.one("SELECT * FROM anime limit 2;");
    res.json(resp);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json("Internal Server Error");
  }
});

app.listen(3001, () => {
  console.log(`Example app listening on port 3001`);
});
