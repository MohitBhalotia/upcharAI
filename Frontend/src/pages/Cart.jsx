import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCart, updateCart, removeFromCart } from "../store/slices/cartSlice";
import {getMedicines} from '../store/slices/mediSlice'
const CartPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const medicines = useSelector((state) => state.med.medicines);
  const loading = useSelector((state) => state.cart.loading);

  useEffect(() => {
    dispatch(getCart());
    dispatch(getMedicines());
  }, [dispatch]);

  const getCartAmount = () => {
    return cartItems.reduce((total, item) => {
      const medicine = medicines.find((med) => med._id === item.medicineId);
      return total + (medicine ? (userId ? medicine.subsidized_price : medicine.price) * item.quantity : 0);
    }, 0);
  };

  const handleUpdateQuantity = (medicineId, quantity) => {
    if (quantity > 0) {
      dispatch(updateCart({ medicineId, quantity }));
    }
  };

  const handleRemoveItem = (medicineId) => {
    dispatch(removeFromCart(medicineId));
  };

  if (loading) {
    return <h1 className="text-center text-3xl font-semibold">Loading your cart...</h1>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="space-y-6">
          {cartItems.map((item) => {
            const medicine = medicines.find((med) => med._id === item.medicineId);
            return (
              <div key={item._id} className="flex items-center bg-white border rounded-lg shadow-md p-4 space-x-4">
                <img src={medicine?.image} alt={medicine?.name} className="w-24 h-24 object-contain" />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800">{medicine?.name}</h3>
                  <p className="text-gray-600">₹{userId ? medicine?.subsidized_price : medicine?.price} each</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleUpdateQuantity(item.medicineId, item.quantity - 1)} className="bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300">-</button>
                  <span className="w-10 text-center">{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.medicineId, item.quantity + 1)} className="bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300">+</button>
                </div>
                <div className="ml-4 text-gray-800 font-semibold">
                  ₹{(userId ? medicine?.subsidized_price : medicine?.price) * item.quantity}
                </div>
                <button onClick={() => handleRemoveItem(item.medicineId)} className="text-red-600 hover:text-red-800">Remove</button>
              </div>
            );
          })}
          <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mt-8">
            <span className="font-semibold text-lg">Total Price:</span>
            <span className="text-xl font-bold text-gray-800">₹{getCartAmount()}</span>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      )}
      {cartItems.length > 0 && (
        <div className="mt-6 flex justify-end">
          <Link to="/checkout" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
