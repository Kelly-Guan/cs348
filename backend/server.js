const cors = require("cors");
const express = require("express");
const morgan = require("morgan")
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

const moviesRoutes = require("./routes/movies");
const ratingsRoutes = require("./routes/ratings");
const usersRoutes = require("./routes/users");

app.use("/api/movies", moviesRoutes)
app.use("/api/ratings", ratingsRoutes)
app.use("/api/users", usersRoutes);

app.listen(process.env.API_PORT, () => {
  console.log(`Limelight listening on port ${process.env.API_PORT}`);
});
