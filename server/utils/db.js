require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Server Connecting to DB");
  } catch (error) {
    console.error("Database connection Failed");
    process.exit(1);
  }
};

module.exports = connectDB;
