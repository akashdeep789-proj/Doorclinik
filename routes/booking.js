const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, validateBooking } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");
const bookingController = require("../controllers/bookings");

router.post("/", isLoggedIn, validateBooking, wrapAsync(bookingController.createBooking));
router.get("/mine", isLoggedIn, wrapAsync(bookingController.myBookings));

module.exports = router;