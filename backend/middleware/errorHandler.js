const ExpressError = require("../utils/ExpressError.js");

const handleNotFound = (req, res, next) => {
  console.log("404 on:", req.method, req.originalUrl);
  next(new ExpressError(404, "Page not Found !"));
};

const errorHandler = (err, req, res, next) => {
  console.log(" ERROR:", err);
  let { statusCode = 500, message = "Something Went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
};

module.exports = {
  handleNotFound,
  errorHandler,
};
