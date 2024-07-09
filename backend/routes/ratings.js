const express = require("express")
const router = express.Router();
const ratingsController = require("../controllers/ratingsController");

router.get("/allRatings", ratingsController.allRatings);
router.get("/ratingsByGenre/:genre", ratingsController.ratingsByGenre);

//below needs fix
router.get("/ratingsByFriends/:follower_uid", ratingsController.ratingsByFriends);
router.get("/ratingsByScore/:score", ratingsController.ratingsByScore);

module.exports = router;