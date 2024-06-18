const express = require("express")
const router = express.Router();
const movieController = require("../controllers/moviesController");

router.get("/homeTopFive", movieController.homeTopFive)

module.exports = router;