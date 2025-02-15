import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Requests = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const sendArrivalMessage = async (userId, medicine) => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/req-medicines/send-message?userId=${userId}`,
        { medicine },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Message sent successfully!");
    } catch (err) {
      alert("Failed to send message: " + err.message);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/req-medicines/get-all-req`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMedicines(response.data.medicines);
      } catch (err) {
        setError(err.message || "Failed to fetch requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [token]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Medicine Requests</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User Name</th>
            <th className="py-2 px-4 border-b">Medicine Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border-b">{medicine.userName}</td>
              <td className="py-2 px-4 border-b">{medicine.mediName}</td>
              <td className="py-2 px-4 border-b">{medicine.quantity}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  onClick={() =>
                    sendArrivalMessage(medicine.userId, medicine.mediName)
                  }
                >
                  Notify Arrival
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
