const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongoServer;

// Runs once before all tests start
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// Runs once after all tests finish
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Runs after EACH individual test — clears all data so tests don't interfere with each other
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});