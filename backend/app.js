if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
app.set("trust proxy", 1);
const cors = require("cors"); // ADD THIS
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const passport = require("passport");

// Config imports
const connectDB = require("./config/db.js");
const configurePassport = require("./config/passport.js");
const {
  createSessionStore,
  getSessionOptions,
} = require("./config/session.js");

// Middleware imports
const {
  handleNotFound,
  errorHandler,
} = require("./middleware/errorHandler.js");

// Route imports
const listingRouter = require("./routes/listing.routes.js");
const reviewRouter = require("./routes/review.routes.js");
const userRouter = require("./routes/user.routes.js");
const wishlistRouter = require("./routes/wishlist.routes.js");
const cartRouter = require("./routes/cart.routes.js");
const adminRouter = require("./admin/routes/admin.routes.js");

const dbUrl = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// CORS — must be registered before routes                    // ADD THIS BLOCK

const allowedOrigins = [
  "http://localhost:3000",
  "https://wanderlust-oe6v.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
// View engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "../public")));

// Session setup
const store = createSessionStore(dbUrl);
const sessionOptions = getSessionOptions(store);
app.use(require("express-session")(sessionOptions));
app.use(flash());

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
configurePassport();

// Local variables middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  res.locals.wishlistCount = req.user?.wishlist?.length || 0;
  res.locals.cartCount = req.user?.cart?.length || 0;
  next();
});

// Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/wishlist", wishlistRouter);
app.use("/cart", cartRouter);
app.use("/admin", adminRouter);
app.use("/", userRouter);

app.get("/home", (req, res) => {
  res.send("Home Page");
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running!",
  });
});

// Error handlers
app.use(handleNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
