const admin = require("firebase-admin");

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : require("./firebase_key.json"); // local dev fallback

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;