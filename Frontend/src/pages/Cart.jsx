import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCart, updateCart, removeFromCart } from "../store/slices/cartSlice";
import { getMedicines } from "../store/slices/mediSlice";

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
      return (
        total +
        (medicine
          ? (userId ? medicine.subsidized_price : medicine.price) *
            item.quantity
          : 0)
      );
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
    return (
      <h1 className="text-center text-2xl font-semibold">
        Loading your cart...
      </h1>
    );
  }

  return (
    <div className="max-w-xs mx-auto p-4 bg-gray-50">
      <h1 className="text-2xl font-semibold text-center mb-6 text-[#132D46]">
        Your Cart
      </h1>
      {cartItems.length > 0 ? (
        <div className="space-y-6">
          {cartItems.map((item) => {
            const medicine = medicines.find(
              (med) => med._id === item.medicineId
            );
            return (
              <div
                key={item._id}
                className="relative flex items-center bg-white shadow-md p-4 rounded-lg space-x-4 min-h-[100px]"
              >
                <img
                  src={medicine?.image}
                  alt={medicine?.name}
                  className="w-24 h-24 object-contain"
                />
                <div className="flex-grow flex flex-col justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {medicine?.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    ₹{userId ? medicine?.subsidized_price : medicine?.price}{" "}
                    each
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    ₹
                    {(userId ? medicine?.subsidized_price : medicine?.price) *
                      item.quantity}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.medicineId)}
                  className="absolute top-2 right-2 text-[#FA4D5E] text-sm font-semibold hover:scale-105 transition-transform"
                >
                  Delete
                </button>
                <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.medicineId, item.quantity - 1)
                    }
                    className="bg-[#C1FFEE] px-3 py-1 rounded-md hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-lg font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.medicineId, item.quantity + 1)
                    }
                    className="bg-[#C1FFEE] px-3 py-1 rounded-md hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}

          <div className="space-y-2 p-4 bg-white shadow-md rounded-lg">
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Subtotal:</span>
              <span className="text-gray-900 font-bold">
                ₹{getCartAmount()}
              </span>
            </div>
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Discount:</span>
              <span className="text-gray-900 font-bold">-₹0</span>
            </div>
            <hr className="border-t border-gray-300" />
            <div className="flex justify-between text-xl font-extrabold text-gray-900">
              <span>Total:</span>
              <span>₹{getCartAmount()}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Link
              to="/checkout"
              className="bg-[#01C38E] text-white w-full py-3 rounded-lg shadow-md text-center font-bold text-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
