// Placeholder in-memory store for OTPs (later can use DB or Redis)
const otpStore = {};

module.exports.renderBookForm = (req, res) => {
  res.render('ambulance/bookambulance');
};

module.exports.sendOtp = (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  otpStore[phone] = otp;

  console.log(`OTP for ${phone}: ${otp}`); // For testing; later use Twilio
  res.json({ message: 'OTP sent', success: true });
};

module.exports.verifyOtp = (req, res) => {
  const { phone, otp } = req.body;
  if (otpStore[phone] && otpStore[phone] == otp) {
    res.json({ message: 'OTP verified', success: true });
    delete otpStore[phone]; // OTP used
  } else {
    res.status(400).json({ message: 'Invalid OTP', success: false });
  }
};

module.exports.bookAmbulance = (req, res) => {
  const { name, phone, location } = req.body;
  // Save booking in DB (create AmbulanceBooking model later)
  console.log(`Booking: ${name}, ${phone}, ${location}`);
  req.flash('success', 'Ambulance booked successfully!');
  res.redirect('/ambulance/book');
};
