const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    return res.status(401).json({
      success: false,
      message: "You must be logged in to do that.",
    });
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
    return res.status(401).json({
      success: false,
      message: "You must be logged in to access the admin panel.",
    });
  }
  if (!req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: "You do not have permission to access the admin panel.",
    });
  }
  next();
};

module.exports = {
  isLoggedIn,
  saveRedirectUrl,
  isAdmin,
};
