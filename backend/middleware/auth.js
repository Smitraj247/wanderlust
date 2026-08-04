const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create listing!");
    return res.redirect("/login");
  }
  next();
};

const saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to access the admin panel.");
    return res.redirect("/login");
  }
  if (!req.user.isAdmin) {
    req.flash("error", "You do not have permission to access the admin panel.");
    return res.redirect("/listings");
  }
  next();
};

module.exports = {
  isLoggedIn,
  saveRedirectUrl,
  isAdmin,
};
