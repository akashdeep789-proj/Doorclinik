const Listing = require("../models/listing");
const Specialization = require("../models/specialization");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// ---------------- Show all listings / search ----------------
module.exports.index = async (req, res) => {
  const { q } = req.query;

  let allListings;
  if (q) {
    allListings = await Listing.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } }
      ]
    });
  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index", { allListings, query: q || "" });
};

// ---------------- Admin dashboard ----------------
module.exports.adminDashboard = async (req, res) => {
  const allListings = await Listing.find({ owner: req.user._id });
  res.render("admin/dashboard", { allListings });
};

// ---------------- Render new form ----------------
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

// ---------------- Show single listing ----------------
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show", { listing });
};

// ---------------- Create new listing ----------------
module.exports.createListing = async (req, res) => {
  const response = await geocodingClient
    .forwardGeocode({ query: req.body.listing.location, limit: 1 })
    .send();

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  if (req.file) {
    newListing.image = { url: req.file.path, filename: req.file.filename };
  }
  newListing.geometry = response.body.features[0].geometry;

  const savedListing = await newListing.save();

  // Add to specialization
  let spec = await Specialization.findOne({ name: savedListing.specialization });
  if (!spec) {
    spec = new Specialization({ name: savedListing.specialization, doctors: [] });
  }
  if (!spec.doctors.includes(savedListing._id)) {
    spec.doctors.push(savedListing._id);
  }
  await spec.save();

  req.flash("success", "New Doctor Added!");
  // Redirect to show all specializations page
  res.redirect("/listings/specializations");
};

// ---------------- Render edit form ----------------
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  const originalImageUrl = listing.image?.url?.replace("/upload", "/upload/w_250");
  res.render("listings/edit", { listing, originalImageUrl });
};

// ---------------- Update listing ----------------
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const oldListing = await Listing.findById(id);

  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

  if (req.file) {
    listing.image = { url: req.file.path, filename: req.file.filename };
  }

  if (req.body.listing.location) {
    const response = await geocodingClient
      .forwardGeocode({ query: req.body.listing.location, limit: 1 })
      .send();
    listing.geometry = response.body.features[0].geometry;
  }

  // Update specialization if changed
  if (req.body.listing.specialization && oldListing.specialization !== req.body.listing.specialization) {
    await Specialization.updateOne(
      { name: oldListing.specialization },
      { $pull: { doctors: listing._id } }
    );

    let spec = await Specialization.findOne({ name: req.body.listing.specialization });
    if (!spec) {
      spec = new Specialization({ name: req.body.listing.specialization, doctors: [] });
    }
    if (!spec.doctors.includes(listing._id)) {
      spec.doctors.push(listing._id);
    }
    await spec.save();
  }

  await listing.save();
  req.flash("success", "Listing Updated");
  res.redirect("/listings/specializations");
};

// ---------------- Delete listing ----------------
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);

  if (deletedListing && deletedListing.specialization) {
    await Specialization.updateOne(
      { name: deletedListing.specialization },
      { $pull: { doctors: deletedListing._id } }
    );
  }

  req.flash("success", "Listing Deleted");
  res.redirect("/listings/specializations");
};

// ---------------- Show all doctors by specialization page ----------------
module.exports.doctorsBySpecialization = async (req, res) => {
  const specs = await Specialization.find({}).populate("doctors");
  res.render("listings/bySpecialization", { specs });
};

// ---------------- Show doctors filtered by specialization dynamically ----------------
module.exports.doctorsBySpecializationByName = async (req, res) => {
  const { name } = req.params;
  const spec = await Specialization.findOne({ name }).populate("doctors");
  const allListings = spec?.doctors || [];
  res.render("listings/index", { allListings, query: name });
};
