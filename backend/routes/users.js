const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// api/users/create
// api/users/{id}/delete
// api/users/{id}/update
// api/users/{id}
// api/users/{id}/favourites
// api/users/{id}/following
// api/users/{id}/followers

router.post("/create", usersController.create);
router.put("/:uid/update", usersController.update);
router.delete("/:uid/delete", usersController.delete);

router.get("/:uid", usersController.byID);
router.get("/:uid/followers", usersController.followersByID)
router.get("/:uid/following", usersController.followingByID)
router.get("/:uid/favourites", usersController.favouritesByID)
router.get("/:uid/watched", usersController.watchedByID);
router.get("/:uid/watch_later", usersController.watchLaterByID);
router.get("/:uid/ratings", usersController.ratingsByID);

module.exports = router;
