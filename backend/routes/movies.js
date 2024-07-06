const express = require("express")
const router = express.Router();
const movieController = require("../controllers/moviesController");

router.get("/allMovies", movieController.allMovies);
router.get("/movie", movieController.movie);


module.exports = router;