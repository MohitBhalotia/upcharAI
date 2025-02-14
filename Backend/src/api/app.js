require("express-async-errors");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/connectDB");

const mongoUrl = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const errorHandler = require("../middlewares/error-handler");
const notFound = require("../middlewares/notFound");

const app = express();
app.use(cors());

const authRouter = require("../routes/authRoute");
const hospitalRouter = require("../routes/hospitalRoute");
const dispensaryRouter = require("../routes/dispensaryRoute");
const cartRouter = require("../routes/cartRoute");
const sosRouter = require("../routes/sosRoute");

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/hospitals", hospitalRouter);
app.use("/api/v1/medicines", dispensaryRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/sos", sosRouter);

app.use(errorHandler);
app.use(notFound);

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
