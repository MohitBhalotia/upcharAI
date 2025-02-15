import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/medicines/get-medicines?userId=${import.meta.env.VITE_ADMIN_NUMBER}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMedicines(response.data.medicines);
      } catch (err) {
        setError(err.message || "Failed to fetch medicines");
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, [token]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Medicines</h1>
      <table className="min-w-full border border-gray-200 rounded-md overflow-hidden shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{medicine.name}</td>
              <td className="py-2 px-4 border-b">{medicine.price}</td>
              <td className="py-2 px-4 border-b">{medicine.quantity}</td>
              <td className="py-2 px-4 border-b space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 block mx-auto">Add Medicine</button>
    </div>
  );
};

export default Medicines;