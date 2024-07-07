const express = require("express")
const router = express.Router();
const movieController = require("../controllers/moviesController");

router.get("/allMovies", movieController.allMovies);
router.get("/movie", movieController.movie);
router.get("/recentReleases", movieController.recentReleases);
router.get("/popularMovies", movieController.popularMovies);
router.get("/search", movieController.search);

module.exports = router;