import React, { useState } from "react";
import Button from "../components/ui/Button";
import axios from "axios";
import HospitalCard from "../components/HospitalCard";

const DoctorAppointment = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URI;
  const [hospitals, setHospitals] = useState([]); // State to store the hospital data

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Successfully fetched location
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          // Send location to the backend
          sendToBackend(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Could not fetch location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const sendToBackend = async (latitude, longitude) => {
    try {
      const res = await axios.get(
        `${backendUrl}/hospitals/get-nearby-hospitals?latitude=${latitude}&longitude=${longitude}`
      );
      setHospitals(res.data.hospitals); // Store the hospital data in state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Find Nearby Doctors
        </h1>
        <Button onClick={getLocation} className={'bg-yellow-500 px-10 py-4 '} label={"Find Nearby Doctors"} />
        <div className="mt-8 space-y-6">
          {hospitals.length > 0 ? (
            hospitals.map((hospital) => (
              <HospitalCard key={hospital._id} hospital={hospital} />
            ))
          ) : (
            <p className="text-center text-gray-500">No hospitals found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
