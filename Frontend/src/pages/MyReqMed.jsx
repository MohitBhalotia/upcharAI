import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MyReqMed = () => {
  const [requestedMedicines, setRequestedMedicines] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URI;
  const token = useSelector((state) => state.auth.token);

  const fetchRequestedMedicines = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/req-medicines/get-my-req`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Requested Medicines</h1>
      {requestedMedicines.length === 0 ? (
        <p>No requested medicines found.</p>
      ) : (
        <ul className="space-y-4">
          {requestedMedicines.map((medicine, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-md">
              <p>
                <strong>Medicine Name:</strong> {medicine.mediName}
              </p>
              <p>
                <strong>Quantity:</strong> {medicine.quantity}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReqMed;
