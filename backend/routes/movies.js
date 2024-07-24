const express = require("express")
const router = express.Router();
const movieController = require("../controllers/moviesController");

router.get("/allMovies", movieController.allMovies);
router.get("/movie", movieController.movie);
router.get("/movieGenre/:mid", movieController.movieGenre);
router.get("/movieCast/:mid", movieController.movieCast);
router.get("/recentReleases", movieController.recentReleases);
router.get("/popularMovies", movieController.popularMovies);
router.get("/search", movieController.search);
router.get("/moviesLikeThis/:mid", movieController.moviesLikeThis);

router.get("/watchedByFriends", movieController.watchedByFriends);

module.exports = router;