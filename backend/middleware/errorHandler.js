const ExpressError = require("../utils/ExpressError.js");

const handleNotFound = (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
};

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

module.exports = {
  handleNotFound,
  errorHandler,
};
