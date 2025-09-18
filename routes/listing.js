const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controllers/listings.js");
const { isLoggedIn, isOwner, validateListing, isAdmin } = require("../middleware.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// ---------------- LISTINGS ROUTES ----------------

// INDEX - show all listings or search
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// NEW LISTING FORM
router.get("/new", isLoggedIn, listingController.renderNewForm);

// SHOW ALL SPECIALIZATIONS
router.get("/specializations", wrapAsync(listingController.doctorsBySpecialization));

// FILTER DOCTORS BY SPECIALIZATION
router.get("/specialization/:name", wrapAsync(listingController.doctorsBySpecializationByName));

// EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// SHOW / UPDATE / DELETE ROUTE
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

module.exports = router;
