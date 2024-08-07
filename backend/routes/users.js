const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// api/users/create
// api/users/{id}/delete
// api/users/{id}/update
// api/users/{id}
// api/users/{id}/favourites
// api/users/{id}/following?offset={}
// api/users/{id}/followers?offset={}

// basic crud
router.post("/create", usersController.create);
router.post("/follow", usersController.follow);
router.put("/:uid/update", usersController.update);
router.delete("/:uid/delete", usersController.delete);
router.delete("/unfollow", usersController.unfollow);


router.get("/hasVotedOn", usersController.hasVotedOn);

router.post("/auth", usersController.auth);

// user related gets
router.get("/:uid", usersController.byID);
router.get("/:uid/followers", usersController.followersByID);
router.get("/:uid/following", usersController.followingByID);
router.get("/:uid/favourites", usersController.favouritesByID);
router.get("/:uid/watched", usersController.watchedByID);
router.get("/:uid/watch_later", usersController.watchLaterByID);
router.get("/:uid/ratings", usersController.ratingsByID);
router.get("/:uid/similarTaste", usersController.similarTasteByID);
router.get("/:uid/recommendedForYou", usersController.recommendedByID);
router.get("/search/:username", usersController.search);




module.exports = router;
