const cors = require('cors');
const express = require('express')
const app = express()
const port = 3001

const app = express()
app.use(cors())
app.use(express.json())
const port = 3001;
const pgp = require('pg-promise')(/* options */)
const {ConnectionString} = require('connection-string');
const path = require('path');

const sslrootcert = path.join(__dirname, 'ca-certificate.crt');

const cs = new ConnectionString('postgresql://doadmin:AVNS_8sl0qMgsAIoFa7iGZPg@cs348-serial-do-user-13354341-0.c.db.ondigitalocean.com:25060/defaultdb?sslmode=require');

cs.setDefaults({
	params: {sslrootcert}
});

const db = pgp(cs.toString());

app.get("/", async (req, res) => {
  try {
    const resp = await db.one("SELECT * FROM test;");
    res.json(resp);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
