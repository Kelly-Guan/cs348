const express = require("express")
const router = express.Router();
const ratingsController = require("../controllers/ratingsController");

router.get("/allRatings", ratingsController.allRatings);

module.exports = router;