require("express-async-errors");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/connectDB");

const mongoUrl = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const errorHandler = require("./src/middlewares/error-handler");
const notFound = require("./src/middlewares/notFound");

const app = express();
app.use(cors());

const authRouter = require("./src/routes/authRoute");
const hospitalRouter = require("./src/routes/hospitalRoute");
const dispensaryRouter = require("./src/routes/dispensaryRoute");
const userRouter = require("./src/routes/userRoute");

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/hospitals", hospitalRouter);
app.use("/api/v1/medicines", dispensaryRouter);
app.use("/api/v1/user", userRouter);

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
