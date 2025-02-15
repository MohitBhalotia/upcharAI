require("express-async-errors");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectCloudinary = require("../src/config/cloudinary");
const connectDB = require("../src/config/connectDB");

const mongoUrl = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const errorHandler = require("../src/middlewares/error-handler");
const notFound = require("../src/middlewares/notFound");

const app = express();
app.use(cors());

const authRouter = require("../src/routes/authRoute");
const hospitalRouter = require("../src/routes/hospitalRoute");
const dispensaryRouter = require("../src/routes/dispensaryRoute");
const cartRouter = require("../src/routes/cartRoute");
const sosRouter = require("../src/routes/sosRoute");
const chatRouter = require("../src/routes/chatRoute");
const reqMedRouter = require("../src/routes/reqMedRoute");
const appointmentRouter = require("../src/routes/appointementRoute");
const orderRouter = require("../src/routes/OrderRoute");
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/hospitals", hospitalRouter);
app.use("/api/v1/medicines", dispensaryRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/sos", sosRouter);
app.use("/api/v1/chat-bot", chatRouter);
app.use("/api/v1/req-medicines", reqMedRouter);
app.use("/api/v1/appointments", appointmentRouter);
app.use("/api/v1/order", orderRouter);

app.use(errorHandler);
app.use(notFound);

const main = async () => {
  try {
    await connectDB(mongoUrl);
    connectCloudinary();
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
main();
