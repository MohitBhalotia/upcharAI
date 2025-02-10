const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Medicine = require("./src/models/medicineModel"); // Import your Mongoose model
const medicines = require("./medicines.json");
dotenv.config(); // Load environment variables
const mongoURI = process.env.MONGO_URI;

const populateDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    // Insert medicines
    await Medicine.deleteMany();
    await Medicine.insertMany(medicines);
    console.log("Medicines added successfully!");
    process.exit();
  } catch (error) {
    console.error("Error populating database:", error);
    process.exit(1);
  }
};

populateDB();
