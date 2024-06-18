const express = require("express")
const router = express.Router();
const movieController = require("../controllers/moviesController");

router.get("/allMovies", movieController.allMovies);

module.exports = router;