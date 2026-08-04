const Listing = require("../models/listing.js");

const index = async (req, res) => {
  const searchQuery = req.query.q;
  const category = req.query.category;

  let filter = {};
  if (category) filter.category = category;
  if (searchQuery) filter.title = { $regex: searchQuery, $options: "i" };

  const listings = await Listing.find(filter);

  res.status(200).json({
    success: true,
    data: listings,
  });
};

const showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    return res.status(404).json({ success: false, message: "Listing not found" });
  }

  res.status(200).json({ success: true, data: listing });
};

const createListing = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Image is required!" });
  }

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url: req.file.path, filename: req.file.filename };

  await newListing.save();

  res.status(201).json({ success: true, data: newListing, message: "New Listing created!" });
};

const updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

  if (!listing) {
    return res.status(404).json({ success: false, message: "Listing not found" });
  }

  if (req.file) {
    listing.image = { url: req.file.path, filename: req.file.filename };
    await listing.save();
  }

  res.status(200).json({ success: true, data: listing, message: "Listing Updated!" });
};

const destroyListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);

  if (!deletedListing) {
    return res.status(404).json({ success: false, message: "Listing not found" });
  }

  res.status(200).json({ success: true, message: "Listing Deleted!" });
};

module.exports = {
  index,
  showListing,
  createListing,
  updateListing,
  destroyListing,
};