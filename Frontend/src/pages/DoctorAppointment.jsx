import React, { useState } from "react";
import Button from "../components/ui/Button";
import axios from "axios";
import HospitalCard from "../components/HospitalCard";
import { useSelector } from "react-redux";

const DoctorAppointment = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URI;
  const [hospitals, setHospitals] = useState([]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
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
  const token = useSelector((state) => state.auth.token);

  const sendToBackend = async (latitude, longitude) => {
    try {
      const res = await axios.get(
        `${backendUrl}/hospitals/get-nearby-hospitals?latitude=${latitude}&longitude=${longitude}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHospitals(res.data.hospitals||[]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#ffffff] py-8 px-2 flex items-center justify-center">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Find Nearby Doctors
        </h1>
        <div className="flex justify-center">
          <Button
            onClick={getLocation}
            className="bg-[#01C38E] px-10 py-4 rounded-[8px] text-white font-semibold"
            label={"Locate"}
          />
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {hospitals.length > 0 ? (
            hospitals.map((hospital) => (
              <HospitalCard key={hospital.place_id} hospital={hospital} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-2">
              No hospitals found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
