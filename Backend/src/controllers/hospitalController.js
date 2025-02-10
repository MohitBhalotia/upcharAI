const { StatusCodes } = require("http-status-codes");
const Hospital = require("../models/hospitalModel");

const getNearbyHospital = async (req, res) => {
  // Destructure latitude and longitude from req.query
  let { latitude, longitude } = req.query;

  // Check if latitude and longitude are provided
  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Longitude and Latitude are required" });
  }

  // Parse latitude and longitude as floats
  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);

  // Perform geospatial query using $geoNear
  const hospitals = await Hospital.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: [longitude, latitude] }, // Correct order
        distanceField: "distance", // MongoDB will add distance in meters
        maxDistance: 20000, // 20 km in meters
        spherical: true, // Use spherical model for distance calculation
      },
    },
  ]);
  if (hospitals.length === 0) {
    res.status(StatusCodes.OK).json({ msg: "No nearby hospitals found" });
  }
  // Return the hospitals found
  res.status(StatusCodes.OK).json({ hospitals });
};

module.exports = getNearbyHospital;
