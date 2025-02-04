const Hospital = require("../models/hospitalModel");

const getNearbyHospital = async (req, res) => {
  try {
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

    // Return the hospitals found
    res.status(200).json({ hospitals });
  } catch (error) {
    console.error("Error fetching nearby hospitals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getNearbyHospital;
