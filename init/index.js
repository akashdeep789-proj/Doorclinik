// init/index.js
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const User = require("../models/user");
const Listing = require("../models/listing");
const Specialization = require("../models/specialization");
const { data: sampleDoctors } = require("./data.js");

// Fallback to local MongoDB URI if ATLASDB_URL is not set
const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/doorclinik";

async function seedDB() {
  await mongoose.connect(dbUrl);
  console.log(`Connected to Database at ${dbUrl} for seeding`);

  // CLEAR OLD DATA TO PREVENT STALE MAPPING
  await Listing.deleteMany({});
  await Specialization.deleteMany({});
  console.log("Cleared old listings and specializations.");

  for (const doctorData of sampleDoctors) {
    const usernameSlug = doctorData.title
      .toLowerCase()
      .replace(/^dr\.\s*/, "")
      .replace(/[^a-z0-9]+/g, "");

    const username = `dr_${usernameSlug}`;
    const email = `${username}@doorclinik-demo.com`;

    let doctorUser = await User.findOne({ username });
    if (!doctorUser) {
      doctorUser = await User.register(
        new User({ username, email, role: "doctor" }),
        "DemoPass123!"
      );
      console.log(`Created doctor user: ${username}`);
    }

    const newListing = new Listing({
      ...doctorData,
      owner: doctorUser._id,
    });
    await newListing.save();
    console.log(`Created listing: ${doctorData.title}`);

    let spec = await Specialization.findOne({ name: newListing.specialization });
    if (!spec) {
      spec = new Specialization({ name: newListing.specialization, doctors: [] });
    }
    if (!spec.doctors.includes(newListing._id)) {
      spec.doctors.push(newListing._id);
    }
    await spec.save();
  }

  console.log("Seeding complete.");
  await mongoose.disconnect();
}

seedDB().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});