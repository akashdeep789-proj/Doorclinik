const express = require('express');
const router = express.Router();
const ambulanceController = require('../controllers/ambulanceController');

// Show booking form
router.get('/book', ambulanceController.renderBookForm);

// Handle OTP send
router.post('/send-otp', ambulanceController.sendOtp);

// Handle OTP verification
router.post('/verify-otp', ambulanceController.verifyOtp);

// Handle final booking
router.post('/book', ambulanceController.bookAmbulance);

module.exports = router;
