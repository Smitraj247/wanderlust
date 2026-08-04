const passport = require("passport");
const User = require("../models/user.js");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Login after signup failed" });
      }
      return res.status(201).json({
        success: true,
        message: "Welcome to Wanderlust!",
        user: { id: registeredUser._id, username: registeredUser.username, email: registeredUser.email },
      });
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ success: false, message: info?.message || "Invalid username or password" });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        success: true,
        message: "Welcome back to Wanderlust",
        user: { id: user._id, username: user.username, email: user.email },
      });
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    res.status(200).json({ success: true, message: "You are logged out!" });
  });
};

const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }
  res.status(200).json({
    success: true,
    user: { id: req.user._id, username: req.user.username, email: req.user.email },
  });
};

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
};