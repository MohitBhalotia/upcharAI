import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userId = useSelector((state) => state.auth.userId);
  const medicines = useSelector((state) => state.med.medicines);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URI;

  const getCartAmount = () => {
    return cartItems.reduce((total, item) => {
      const medicine = medicines.find((med) => med._id === item.medicineId);
      return (
        total +
        (medicine
          ? (userId ? medicine.subsidized_price : medicine.price) *
            item.quantity
          : 0)
      );
    }, 0);
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/order/order-medicine`, {
        cart: cartItems.map((item) => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
        })),
        userId: userId || import.meta.env.VITE_ADMIN_ID,
      });
      setMessage(response.data.msg);
      dispatch(clearCart());
      navigate("/dispensary");
    } catch (error) {
      console.error("Checkout Error:", error);
      setMessage(error.response?.data?.error || "Failed to process order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 mx-auto w-full max-w-[600px] min-h-screen">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-[#132D46]">
        Checkout
      </h1>
      {cartItems.map((item) => {
        const medicine = medicines.find((med) => med._id === item.medicineId);
        return (
          <div key={item.medicineId} className="flex justify-between mb-4">
            <span>{medicine?.name}</span>
            <span>
              ₹
              {(userId ? medicine?.subsidized_price : medicine?.price) *
                item.quantity}
            </span>
          </div>
        );
      })}
      <hr className="my-4" />
      <div className="flex justify-between font-bold text-xl">
        <span>Total:</span>
        <span>₹{getCartAmount()}</span>
      </div>
      <button
        onClick={handleCheckout}
        className="w-full mt-6 bg-[#01C38E] text-white py-3 rounded-lg font-bold hover:bg-[#019973]"
        disabled={loading}
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
      {message && (
        <p className="mt-4 text-center text-lg text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default CheckoutPage;
