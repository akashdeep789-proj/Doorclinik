const User = require("../models/user");

// ---------------- Render Forms ----------------
module.exports.renderSignupForm = (req, res) => {
    const { role } = req; // set from routes
    res.render("users/signup.ejs", { role });
};

module.exports.renderLoginForm = (req, res) => {
    const { role } = req; // set from routes
    res.render("users/login.ejs", { role });
};

// ---------------- Signup ----------------
module.exports.signup = async (req, res, next, role) => {
    try {
        let { username, email, password, adminCode } = req.body;

        // Optional admin check
        if (adminCode && adminCode === process.env.ADMIN_CODE) {
            role = "admin";
        }

        const newUser = new User({ email, username, role });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", `Welcome ${role}, you are signed up!`);
            // After signup → go to login page instead of listings
            res.redirect(`/${role}/login`);
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect(`/${role}/signup`);
    }
};

// ---------------- Login ----------------
module.exports.login = async (req, res, role) => {
    req.flash("success", `Welcome back, ${role}!`);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// ---------------- Logout ----------------
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};
