const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const userController = require("../controllers/user.controller.js");
const { isLoggedIn } = require("../middleware/auth.js");

router.post("/signup", wrapAsync(userController.signup));

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.get("/user/me", isLoggedIn, userController.getCurrentUser);

module.exports = router;