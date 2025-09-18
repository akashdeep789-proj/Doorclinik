const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// ------------------ PATIENT ROUTES ------------------
router.route("/patient/signup")
  .get((req, res) => userController.renderSignupForm({ ...req, role: "patient" }, res))
  .post(wrapAsync((req, res, next) => userController.signup(req, res, next, "patient")));

router.route("/patient/login")
  .get((req, res) => userController.renderLoginForm({ ...req, role: "patient" }, res))
  .post(
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/patient/login", failureFlash: true }),
    (req, res) => userController.login(req, res, "patient")
  );

// ------------------ DOCTOR ROUTES ------------------
router.route("/doctor/signup")
  .get((req, res) => userController.renderSignupForm({ ...req, role: "doctor" }, res))
  .post(wrapAsync((req, res, next) => userController.signup(req, res, next, "doctor")));

router.route("/doctor/login")
  .get((req, res) => userController.renderLoginForm({ ...req, role: "doctor" }, res))
  .post(
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/doctor/login", failureFlash: true }),
    (req, res) => userController.login(req, res, "doctor")
  );


// ------------------ LOGOUT ------------------
router.get("/logout", userController.logout);

module.exports = router;
