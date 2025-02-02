const Hospital = require("../models/hospitalModel");
const getNearbyHospital = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "Longitude and Latitude are required" });
    }

    const hospitals = await Hospital.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [longitude, latitude] }, // Correct order
          distanceField: "distance", // MongoDB will add distance in meters
          maxDistance: 20000, // 5 km in meters
          spherical: true,
        },
      },
    ]);

    res.status(200).json({ hospitals });
  } catch (error) {
    console.error("Error fetching nearby hospitals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = getNearbyHospital;
