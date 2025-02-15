import React, { useEffect, useState } from "react";
import MedicineCard from "../components/MedicineCard";
import { useDispatch, useSelector } from "react-redux";
import { getMedicines } from "../store/slices/mediSlice";
import Marquee from "react-fast-marquee";
import axios from "axios";
import { toast } from "react-toastify";

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
      toast.warn("Please enter a valid medicine name and quantity.");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/orders/order-medicine`, {
        userId,
        medicineName,
        quantity,
      });

      if (response.status === 201) {
        toast.success("Order placed successfully!");
        setIsModalOpen(false);
      } else {
        throw new Error("Order failed");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Floating Order Medicine Button */}
      {userId ? (
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-4 bg-[#01C38E] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#009B71]"
        >
          Order Medicine
        </button>
      ) : null}

      {/* Heading */}
      <h1 className="text-[#024E56] text-2xl font-extrabold text-center mb-4">
        Our Medicines
      </h1>

      {/* Discount Banner for Non-Logged-in Users */}
      {!userId && (
        <div className="overflow-hidden bg-[#C1FFEE] h-12 mb-6 flex items-center">
          <Marquee
            speed={80}
            className="text-[#024E56] font-semibold text-lg sm:text-lg"
          >
            <div className="flex gap-x-6">
              <span>
                Login using ABHA card & get{" "}
                <span className="text-[#FA4D5E]">30% off</span> on medicines!
              </span>
              <span>Exclusive discounts on essential medicines.</span>
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
          <div className="bg-white p-8 rounded-[24px] shadow-[0_12_0_32px_rgba(1,195,142,0.24)] w-96">
            <h2 className="text-xl font-bold text-[#132D46] text-center mb-4">
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
              className="w-full p-3 border border-gray-300 focus:border-[#01C38E] focus:ring-0 outline-none rounded-md mt-1"
            />

            <label className="block text-gray-700 font-semibold mt-4">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 focus:border-[#01C38E] focus:ring-0 outline-none rounded-md mt-1"
            />

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-[12px] w-32 hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleOrder}
                className="bg-[#01C38E] text-white px-4 py-2 rounded-[12px] w-32 hover:bg-[#009B71]"
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
