const config = require("config");
const mongoose = require("mongoose");

const MONGO_DB_URI = config.get("MONGO_DB_URI");


mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    mongoose.connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
