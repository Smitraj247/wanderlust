const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://smit:wanderlust@cluster0.c6qz2e9.mongodb.net/wanderlust?appName=Cluster0";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to DB");
}

const initDB = async () => {
  await main();
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({ ...obj, owner: "6563a61b1ecb8f4d8e2e9c1a" }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
  mongoose.connection.close();
};

initDB().catch((err) => console.log(err));