const User = require("../models/user");
const admin = require("../firebase"); // ✅ Firebase Admin SDK

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

        // ✅ Step 1: Register user in MongoDB (existing logic)
        const newUser = new User({ email, username, role });
        const registeredUser = await User.register(newUser, password);

        // ✅ Step 2: Also register in Firebase Auth
        try {
            await admin.auth().createUser({
                email: email,
                password: password,
                displayName: username,
            });
            console.log(`🔥 Firebase user created successfully: ${email}`);
        } catch (firebaseError) {
            console.error("⚠️ Firebase Error:", firebaseError.message);
        }

        // ✅ Step 3: Continue with your normal login redirect
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", `Welcome ${role}, you are signed up!`);
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
