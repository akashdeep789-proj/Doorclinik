const Booking = require("../models/booking");
const Listing = require("../models/listing");
const Notification = require("../models/notification");
const { adminSockets } = require("../sockets/sockets");

// Create a new booking
module.exports.createBooking = async (req, res) => {
  const { id } = req.params;

  if (!req.user) {
    req.flash("error", "You must be logged in to book an appointment.");
    return res.redirect("/login");
  }

  const listing = await Listing.findById(id).populate("owner");
  if (!listing) {
    req.flash("error", "Doctor not found.");
    return res.redirect("/listings");
  }

  const { appointmentDate, appointmentTime } = req.body.booking || {};

  if (!appointmentDate || !appointmentTime) {
    req.flash("error", "Please select both date and time for your appointment.");
    return res.redirect(`/listings/${id}`);
  }

  // Build start and end date objects
  const startDateObj = new Date(`${appointmentDate}T09:00:00`);
  const endDateObj = new Date(startDateObj);

  if (appointmentTime.includes("Morning")) {
    startDateObj.setHours(9, 0, 0);
    endDateObj.setHours(12, 0, 0);
  } else if (appointmentTime.includes("Afternoon")) {
    startDateObj.setHours(12, 0, 0);
    endDateObj.setHours(15, 0, 0);
  } else if (appointmentTime.includes("Evening")) {
    startDateObj.setHours(15, 0, 0);
    endDateObj.setHours(18, 0, 0);
  }

  // Fast-path check for good UX — catches the common case instantly,
  // without needing to hit the database's conflict error.
  // This is NOT the real safety guarantee (see below) — just a quick UX shortcut.
  const isOverlapping = listing.bookedDates?.some(({ startDate, endDate }) => {
    return (
      (startDateObj >= startDate && startDateObj < endDate) ||
      (endDateObj > startDate && endDateObj <= endDate) ||
      (startDateObj <= startDate && endDateObj >= endDate)
    );
  });

  if (isOverlapping) {
    req.flash("error", "This slot is already booked. Please choose another.");
    return res.redirect(`/listings/${id}`);
  }

  // Create and save booking — the REAL safety guarantee against race conditions.
  // If two requests reach this point simultaneously for the same doctor/date/time,
  // MongoDB's unique index allows only the first write through. The second
  // throws a duplicate-key error (code 11000), which we catch below.
  let booking;
  try {
    booking = new Booking({
      listing: id,
      user: req.user._id,
      appointmentDate,
      appointmentTime,
      startDate: startDateObj,
      endDate: endDateObj,
      status: "pending",
      paymentStatus: "pending",
      amount: 500,
    });
    await booking.save();
  } catch (err) {
    if (err.code === 11000) {
      req.flash("error", "This time slot was just booked by someone else. Please choose another.");
      return res.redirect(`/listings/${id}`);
    }
    throw err; // let wrapAsync/error handler deal with anything unexpected
  }

  // Atomic update to the listing's bookedDates — $push avoids the "lost update"
  // problem that a full document.save() would have if two different bookings
  // for the same doctor happened at nearly the same time.
  await Listing.findByIdAndUpdate(id, {
    $push: { bookedDates: { startDate: startDateObj, endDate: endDateObj } },
  });

  // Notify doctor (Socket + DB) if owner exists
  if (listing.owner) {
    const adminId = listing.owner._id.toString();
    const io = req.app.get("io");

    if (adminSockets.has(adminId)) {
      for (const socketId of adminSockets.get(adminId)) {
        io.to(socketId).emit("notification", {
          message: `New appointment booked with Dr. ${listing.title} by ${req.user.username}`,
          type: "success",
          bookingId: booking._id
        });
      }
    }

    await Notification.create({
      user: listing.owner._id,
      message: `New appointment booked with Dr. ${listing.title} by ${req.user.username}`,
      type: "booking",
      read: false
    });
  }

  req.flash("success", "Appointment booked successfully!");
  res.redirect("/bookings/mine");
};

// Get all bookings of the logged-in user
module.exports.myBookings = async (req, res) => {
  const userId = req.user._id;

  const bookings = await Booking.find({ user: userId })
    .populate({
      path: "listing",
      populate: { path: "owner", select: "username" }
    })
    .sort({ appointmentDate: -1 });

  res.render("bookings/mine", { myBookings: bookings || [] });
};