require("express-async-errors");
require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/connectDB");

const mongoUrl = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const app = express();

const main = async () => {
  try {
    await connectDB(mongoUrl);
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
main();
