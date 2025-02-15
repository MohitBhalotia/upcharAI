const { StatusCodes } = require("http-status-codes");
const axios = require("axios");

const getNearbyHospital = async (req, res) => {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Longitude and Latitude are required" });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=20000&type=hospital&key=${apiKey}`;

  try {
    const placeResponse = await axios.get(url);
    const hospitals = placeResponse.data.results;

    // Construct a list of destination coordinates for the Distance Matrix API
    const destinations = hospitals
      .map((h) => `${h.geometry.location.lat},${h.geometry.location.lng}`)
      .join("|");

    const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${latitude},${longitude}&destinations=${destinations}&key=${apiKey}`;
    const distanceResponse = await axios.get(distanceUrl);

    const distances = distanceResponse.data.rows[0].elements;

    const hospitalList = hospitals.map((hospital, index) => ({
      name: hospital.name,
      address: hospital.vicinity,
      rating: hospital.rating || "N/A",
      location: hospital.geometry.location,
      place_id: hospital.place_id,
      distance: distances[index].distance.text, // Distance in readable format (e.g., '4.5 km')
      duration: distances[index].duration.text, // Duration in readable format (e.g., '10 mins')
    }));

    res.status(StatusCodes.OK).json({ hospitals: hospitalList });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ error: "Failed to fetch nearby hospitals" });
  }
};

module.exports = getNearbyHospital;
