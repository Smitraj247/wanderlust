const Listing = require("../../models/listing.js");
const Review = require("../../models/review.js");
const User = require("../../models/user.js");

const dashboard = async (req, res) => {
  const totalListings = await Listing.countDocuments();
  const totalReviews = await Review.countDocuments();
  const totalUsers = await User.countDocuments();
  const recentListings = await Listing.find({})
    .populate("owner")
    .sort({ _id: -1 })
    .limit(5);
  const recentReviews = await Review.find({})
    .populate("author")
    .sort({ createdAt: -1 })
    .limit(5);

  res.render("admin/dashboard.ejs", {
    totalListings,
    totalReviews,
    totalUsers,
    recentListings,
    recentReviews,
  });
};

const listingsIndex = async (req, res) => {
  const searchQuery = req.query.q;
  const category = req.query.category;
  let filter = {};
  if (category) filter.category = category;
  if (searchQuery) filter.title = { $regex: searchQuery, $options: "i" };

  const listings = await Listing.find(filter).populate("owner").sort({ _id: -1 });
  res.render("admin/listings/index.ejs", { listings, searchQuery, category });
};

const listingsShow = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/admin/listings");
  }
  res.render("admin/listings/show.ejs", { listing });
};

const renderNewListing = (req, res) => {
  res.render("admin/listings/new.ejs");
};

const createListing = async (req, res) => {
  if (!req.file) {
    req.flash("error", "Image is required!");
    return res.redirect("/admin/listings/new");
  }
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url: req.file.path, filename: req.file.filename };
  await newListing.save();
  req.flash("success", "Listing created!");
  res.redirect("/admin/listings");
};

const renderEditListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/admin/listings");
  }
  let originalImageUrl = listing.image?.url;
  if (originalImageUrl) originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("admin/listings/edit.ejs", { listing, originalImageUrl });
};

const updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    listing.image = { url: req.file.path, filename: req.file.filename };
    await listing.save();
  }
  req.flash("success", "Listing updated!");
  res.redirect(`/admin/listings/${id}`);
};

const destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted!");
  res.redirect("/admin/listings");
};

const reviewsIndex = async (req, res) => {
  const reviewDocs = await Review.find({})
    .populate("author")
    .sort({ createdAt: -1 })
    .lean();
  const reviewIds = reviewDocs.map((r) => r._id);
  const listingsWithReviews = await Listing.find({ reviews: { $in: reviewIds } })
    .select("title _id reviews")
    .lean();
  const reviewToListing = {};
  for (const list of listingsWithReviews) {
    for (const rid of list.reviews) {
      reviewToListing[rid.toString()] = { title: list.title, _id: list._id };
    }
  }
  for (const r of reviewDocs) {
    r.listingRef = reviewToListing[r._id.toString()] || null;
  }
  res.render("admin/reviews/index.ejs", { reviews: reviewDocs });
};

const destroyReview = async (req, res) => {
  const { reviewId } = req.params;
  const listing = await Listing.findOne({ reviews: reviewId });
  if (listing) {
    await Listing.findByIdAndUpdate(listing._id, { $pull: { reviews: reviewId } });
  }
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted!");
  res.redirect("/admin/reviews");
};

const usersIndex = async (req, res) => {
  const users = await User.find({}).sort({ _id: -1 });
  res.render("admin/users/index.ejs", { users });
};

const destroyUser = async (req, res) => {
  const { userId } = req.params;
  if (userId === req.user._id.toString()) {
    req.flash("error", "You cannot delete your own account!");
    return res.redirect("/admin/users");
  }
  const userToDelete = await User.findById(userId);
  if (userToDelete.isAdmin) {
    req.flash("error", "Cannot delete another admin user!");
    return res.redirect("/admin/users");
  }
  await Listing.deleteMany({ owner: userId });
  await Review.deleteMany({ author: userId });
  await User.findByIdAndDelete(userId);
  req.flash("success", "User deleted!");
  res.redirect("/admin/users");
};

module.exports = {
  dashboard,
  listingsIndex,
  listingsShow,
  renderNewListing,
  createListing,
  renderEditListing,
  updateListing,
  destroyListing,
  reviewsIndex,
  destroyReview,
  usersIndex,
  destroyUser,
};
