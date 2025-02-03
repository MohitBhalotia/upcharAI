const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res,next) => {
  console.log(err);
  
  let customError = {
    message: err.message || "Internal Server Error",
    statusCode: err.statusCode || 500,
  };

  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customError.message = `No item with id : ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field`;
  }

  res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandler;
