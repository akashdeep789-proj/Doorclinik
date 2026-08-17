// init/index.js
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const User = require("../models/user");
const Listing = require("../models/listing");
const Specialization = require("../models/specialization");
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

    let existingListing = await Listing.findOne({ title: doctorData.title });
    
    if (existingListing) {
      // UPDATE existing listing image
      existingListing.image = doctorData.image;
      await existingListing.save();
      console.log(`Updated image for listing: ${doctorData.title}`);
    } else {
      // CREATE new listing if it doesn't exist
      existingListing = new Listing({
        ...doctorData,
        owner: doctorUser._id,
      });
      await existingListing.save();
      console.log(`Created listing: ${doctorData.title}`);
    }

    let spec = await Specialization.findOne({ name: existingListing.specialization });
    if (!spec) {
      spec = new Specialization({ name: existingListing.specialization, doctors: [] });
    }
    if (!spec.doctors.includes(existingListing._id)) {
      spec.doctors.push(existingListing._id);
    }
    await spec.save();
  }

  console.log("Seeding and updates complete.");
  await mongoose.disconnect();
}

seedDB().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});