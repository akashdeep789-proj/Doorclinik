// init/index.js
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const User = require("../models/user");
const Listing = require("../models/listing");
const Specialization = require("../models/specialization"); // adjust path if your model file is named differently
const { data: sampleDoctors } = require("./data.js");

const dbUrl = process.env.ATLASDB_URL;

async function seedDB() {
  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB Atlas for seeding");

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

    const existingListing = await Listing.findOne({ title: doctorData.title });
    if (existingListing) {
      console.log(`Listing already exists, skipping: ${doctorData.title}`);
      continue;
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