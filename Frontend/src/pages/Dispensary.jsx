import React, { useEffect, useState } from "react";
import MedicineCard from "../components/MedicineCard";
import { useDispatch, useSelector } from "react-redux";
import { getMedicines } from "../store/slices/mediSlice";
import Marquee from "react-fast-marquee";
import axios from "axios";

const Dispensary = () => {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.med.medicines) || [];
  const userId = useSelector((state) => state.auth.userId);
  const backendUrl = import.meta.env.VITE_BACKEND_URI;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getMedicines());
  }, [dispatch]);

  const handleOrder = async () => {
    if (!medicineName || quantity < 1) {
      alert("Please enter a valid medicine name and quantity.");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/orders/place-order`, {
        userId,
        medicineName,
        quantity,
      });

      if (response.status === 201) {
        alert("Order placed successfully!");
        setIsModalOpen(false); // Close modal on success
      } else {
        throw new Error("Order failed");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Floating Order Medicine Button */}
      {userId ? (
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
        >
          Order Medicine
        </button>
      ) : null}

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Our Medicines
      </h1>

      {/* Discount Banner for Non-Logged-in Users */}
      {!userId && (
        <div className="overflow-hidden bg-amber-500 mb-10">
          <Marquee
            speed={80}
            className="text-red-600 font-semibold my-6 text-xl sm:text-xl"
          >
            <div className="flex gap-x-120">
              <span> Login using ABHA card & get 30% off on medicines! </span>
              <span> Exclusive discounts on essential medicines. </span>
            </div>
          </Marquee>
        </div>
      )}

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {medicines.length > 0 ? (
          medicines.map((item) => (
            <MedicineCard key={item._id} medicine={item} />
          ))
        ) : (
          <p className="text-center text-gray-600">No medicines available.</p>
        )}
      </div>

      {/* Order Medicine Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Order Medicine
            </h2>

            <label className="block text-gray-700 font-semibold">
              Medicine Name
            </label>
            <input
              type="text"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              placeholder="Enter medicine name"
              className="w-full p-2 border rounded-md mt-1"
            />

            <label className="block text-gray-700 font-semibold mt-4">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full p-2 border rounded-md mt-1"
            />

            {/* Buttons */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleOrder}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dispensary;
