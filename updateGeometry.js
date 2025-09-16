// updateGeometry.js

// Load environment variables if not in production
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

// Import required modules
const mongoose = require("mongoose");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const Listing = require("./models/listing.js");

// Initialize Mapbox geocoding client
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// MongoDB connection URL
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB and start the update process
main().then(() => console.log("Connected to DB for updating geometry"))
     .catch(err => console.log(err));

// Main function to connect and call update
async function main() {
  await mongoose.connect(MONGO_URL);
  await updateAllListings();
}

// Function to update geometry data for all listings
async function updateAllListings() {
  const listings = await Listing.find({});
  console.log(`Found ${listings.length} listings. Starting update`);

  for (let listing of listings) {
    if (!listing.geometry || !listing.geometry.coordinates || listing.geometry.coordinates.length === 0) {
      console.log(`Fetching geometry for: ${listing.title}`);
      try {
        const geoData = await geocodingClient
          .forwardGeocode({
            query: listing.location,
            limit: 1,
          })
          .send();

        if (geoData.body.features.length > 0) {
          listing.geometry = geoData.body.features[0].geometry;
          await listing.save();
          console.log(`Updated geometry for: ${listing.title}`);
        } else {
          console.log(`No geometry found for: ${listing.title}`);
        }
      } catch (err) {
        console.log(`Error updating ${listing.title}:`, err.message);
      }
    } else {
      console.log(`Already has geometry: ${listing.title}`);
    }
  }

  console.log("Done updating all listings");
  mongoose.connection.close();
}
