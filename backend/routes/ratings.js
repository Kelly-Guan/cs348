const express = require("express")
const router = express.Router();
const ratingsController = require("../controllers/ratingsController");

router.get("/allRatings", ratingsController.allRatings);
router.get("/ratingsByGenre/:genre", ratingsController.ratingsByGenre);
router.get("/ratingsByRatio/:ratio", ratingsController.ratingsByRatio);
router.get("/ratingsByFriends/:follower_uid", ratingsController.ratingsByFriends);

module.exports = router;