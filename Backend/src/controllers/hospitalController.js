const { StatusCodes } = require("http-status-codes");
const axios = require("axios");

const getNearbyHospital = async (req, res) => {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Longitude and Latitude are required" });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=20000&type=hospital&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const hospitals = response.data.results.map((hospital) => ({
      name: hospital.name,
      address: hospital.vicinity,
      rating: hospital.rating || "N/A",
      location: hospital.geometry.location,
      place_id: hospital.place_id,
    }));

    res.status(StatusCodes.OK).json({ hospitals });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ error: "Failed to fetch nearby hospitals" });
  }
};

module.exports = getNearbyHospital; 