const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../../config/cloudinary.js");
const { isAdmin } = require("../../middleware/auth.js");
const { validateListing } = require("../../middleware/validation.js");
const wrapAsync = require("../../utils/wrapAsync.js");
const adminController = require("../controllers/admin.controller.js");

const upload = multer({ storage });

router.use(isAdmin);

router.get("/", wrapAsync(adminController.dashboard));

router
  .route("/listings")
  .get(wrapAsync(adminController.listingsIndex))
  .post(
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(adminController.createListing)
  );

router.get("/listings/new", adminController.renderNewListing);

router
  .route("/listings/:id")
  .get(wrapAsync(adminController.listingsShow))
  .put(
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(adminController.updateListing)
  )
  .delete(wrapAsync(adminController.destroyListing));

router.get("/listings/:id/edit", wrapAsync(adminController.renderEditListing));

router.get("/reviews", wrapAsync(adminController.reviewsIndex));
router.delete("/reviews/:reviewId", wrapAsync(adminController.destroyReview));

router.get("/users", wrapAsync(adminController.usersIndex));
router.delete("/users/:userId", wrapAsync(adminController.destroyUser));

module.exports = router;
