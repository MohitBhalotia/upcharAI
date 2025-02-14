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
      <h1 className="text-center text-2xl font-bold">Loading your cart...</h1>
    );
  }

  return (
    <div className="p-4 mx-auto w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] min-h-screen">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-[#132D46]">
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
                className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md py-4 px-8 rounded-lg w-full"
              >
                <img
                  src={medicine?.image}
                  alt={medicine?.name}
                  className="w-24 h-24 object-contain"
                />
                <div className="flex flex-col flex-grow text-center md:text-left">
                  <h3 className="text-sm font-semibold text-gray-800 px-5">
                    {medicine?.name}
                  </h3>
                  <span className="text-xs text-gray-500 px-5">
                    ₹{userId ? medicine?.subsidized_price : medicine?.price}{" "}
                    each
                  </span>
                </div>
                <div className="flex items-center space-x-4 md:space-x-6 mt-4 md:mt-0">
                  <span className="text-xl font-bold text-gray-900">
                    ₹
                    {(userId ? medicine?.subsidized_price : medicine?.price) *
                      item.quantity}
                  </span>
                  <div className="flex items-center space-x-2">
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
                  <button
                    onClick={() => handleRemoveItem(item.medicineId)}
                    className="text-[#FA4D5E] text-sm font-semibold hover:scale-105 transition-transform"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}

          <div className="space-y-2 p-4 bg-white shadow-md rounded-lg w-full max-w-lg mx-auto text-center">
            <div className="flex justify-between text-gray-600 text-base">
              <span>Subtotal:</span>
              <span className="text-gray-900 font-bold">
                ₹{getCartAmount()}
              </span>
            </div>
            <div className="flex justify-between text-gray-600 text-base">
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
              className="bg-[#01C38E] text-white px-6 py-3 rounded-lg shadow-md text-center font-bold text-lg hover:bg-blue-700 w-full max-w-lg"
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
