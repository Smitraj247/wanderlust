const User = require("../models/user.js");

const addOrRemove = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(req.user._id);
  const cart = user.cart || [];
  const index = cart.findIndex((c) => c.toString() === id);
  if (index === -1) {
    user.cart.push(id);
    req.flash("success", "Added to cart!");
  } else {
    cart.splice(index, 1);
    user.cart = cart;
    req.flash("success", "Removed from cart!");
  }
  await user.save();
  res.redirect("back");
};

const index = async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart");
  const listings = (user.cart || []).filter((l) => l != null);
  res.render("cart/index.ejs", { listings });
};

const remove = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(req.user._id, { $pull: { cart: id } });
  req.flash("success", "Removed from cart!");
  res.redirect("back");
};

module.exports = {
  addOrRemove,
  index,
  remove,
};
