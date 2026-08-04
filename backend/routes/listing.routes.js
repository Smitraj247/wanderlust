const express = require("express");
const router = express.Router();
const multer = require("multer");
const wrapAsync = require("../utils/wrapAsync.js");
const { storage } = require("../config/cloudinary.js");
const { isLoggedIn } = require("../middleware/auth.js");
const { isOwner } = require("../middleware/authorization.js");
const { validateListing } = require("../middleware/validation.js");
const listingController = require("../controllers/listing.controller.js");

const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
