const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth.js");
const wishlistController = require("../controllers/wishlist.controller.js");

router.get("/", isLoggedIn, wishlistController.index);
router.post("/:id", isLoggedIn, wishlistController.addOrRemove);
router.delete("/:id", isLoggedIn, wishlistController.remove);

module.exports = router;
