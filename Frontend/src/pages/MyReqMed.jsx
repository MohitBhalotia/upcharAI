import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import medIcon from "../../public/images/medIcon.svg";

const MyReqMed = () => {
  const [requestedMedicines, setRequestedMedicines] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URI;
  const token = useSelector((state) => state.auth.token);

  const fetchRequestedMedicines = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/req-medicines/get-my-req`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequestedMedicines(response.data.requestedMedicines);
    } catch (error) {
      console.error("Failed to fetch requested medicines:", error);
    }
  };

  useEffect(() => {
    fetchRequestedMedicines();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-[#132D46] text-3xl font-extrabold text-center mb-6">
        My Requests
      </h1>
      {requestedMedicines.length === 0 ? (
        <p className="text-center text-gray-500">
          No requested medicines found.
        </p>
      ) : (
        <div className="space-y-6">
          {requestedMedicines.map((medicine, index) => (
            <div
              key={index}
              className="bg-[#132D46] p-2 rounded-[24px] shadow-2xl transition-transform duration-300 hover:shadow-3xl hover:-translate-y-1"
            >
              <div className="bg-white p-6 rounded-[16px] mb-2 shadow-md flex items-center">
                <img
                  src={medIcon}
                  alt="Medicine Icon"
                  className="w-6 h-6 mr-2"
                />
                <h2 className="text-[#132D46] text-lg font-bold text-center">
                  Ordered Medicine
                </h2>
              </div>
              <div className="bg-white p-6 rounded-[16px] border border-gray-200 shadow-lg transition-shadow duration-300 hover:shadow-xl space-y-2">
                <p className="text-gray-700 text-base">
                  <strong>Medicine Name:</strong> {medicine.mediName}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Quantity:</strong> {medicine.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReqMed;
