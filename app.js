if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Listing = require("./models/listing.js"); // ✅ add Listing model

// Socket.io setup
const { setupSocketIO, adminSockets } = require("./sockets/sockets");
setupSocketIO(io);
app.set("io", io);
app.set("adminSockets", adminSockets);

// ===== Automatically create uploads folder if it doesn't exist =====
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Created folder: ${uploadDir}`);
}

// ===== Automatic cleanup of old uploads (older than 24h) =====
const MAX_FILE_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours
function cleanupUploads() {
  if (!fs.existsSync(uploadDir)) return;
  fs.readdir(uploadDir, (err, files) => {
    if (err) return console.error("Cleanup error:", err);
    files.forEach(file => {
      const filePath = path.join(uploadDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return console.error(err);
        if (Date.now() - stats.mtimeMs > MAX_FILE_AGE_MS) {
          fs.unlink(filePath, err => {
            if (err) console.error("Failed to delete file:", filePath, err);
            else console.log("Deleted old upload:", filePath);
          });
        }
      });
    });
  });
}
cleanupUploads();
setInterval(cleanupUploads, 60 * 60 * 1000);

// Routers
const reportRoutes = require("./routes/reports");
const ambulanceRouter = require("./routes/ambulance");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const adminRouter = require("./routes/admin.js");
const bookingRouter = require("./routes/booking.js");
const socialRoutes = require("./routes/social");

// Helmet
const helmet = require("helmet");

// MongoDB Atlas connection
const dbUrl = process.env.ATLASDB_URL;
mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("DB Error:", err));

// View engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// Helmet CSP config
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://api.mapbox.com",
        "https://cdnjs.cloudflare.com",
        "https://cdn.jsdelivr.net",
        "blob:",
      ],
      workerSrc: ["'self'", "blob:"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://api.mapbox.com",
        "https://fonts.googleapis.com",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
      ],
      connectSrc: [
        "'self'",
        "https://*.tiles.mapbox.com",
        "https://events.mapbox.com",
        "https://api.mapbox.com",
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https://res.cloudinary.com",
        "https://images.unsplash.com",
        "https://plus.unsplash.com",
      ],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com", "data:"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// Session store with MongoDB Atlas
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});

app.use(
  session({
    store,
    secret: process.env.SECRET || "thisshouldbeabettersecret",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);

app.use(flash());

// Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Locals for templates
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user || null;
  next();
});


app.get("/", async (req, res, next) => {
  try {
    const query = req.query.q || null;
    let allListings = [];

    if (query) {
      // simple search (you can improve with regex later)
      allListings = await Listing.find({
        title: { $regex: query, $options: "i" },
      });
    } else {
      allListings = await Listing.find({});
    }

    res.render("listings/index", { allListings, query });
  } catch (err) {
    next(err);
  }
});

// Routes
app.use("/ai-report", reportRoutes);
app.use("/ambulance", ambulanceRouter);
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/listings/:id/bookings", bookingRouter);
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/", socialRoutes);

// 404 handler
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  res.status(statusCode).render("error.ejs", { err });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
