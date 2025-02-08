import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getMedicines } from "../store/slices/mediSlice";
import { useSelector, useDispatch } from "react-redux"; // Assuming you're using Redux to store the medicines

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]); // Default to empty array
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true); // Track loading state
  const backendUrl = import.meta.env.VITE_BACKEND_URI;

  const dispatch = useDispatch();

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item of cartItems) {
      let itemInfo = medicines.find(
        (medicine) => medicine._id === item.medicineId
      );
      totalAmount += itemInfo.price * item.quantity;
    }
    return totalAmount;
  };

  // Fetch cart items when the component mounts
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${backendUrl}/cart/get-cart`);
      const fetchedCart = response.data.cart || []; // Ensure it's an array
      setCartItems(fetchedCart);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setLoading(false); // Handle the loading state even if the fetch fails
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const fetchMedicines = async () => {
      dispatch(getMedicines());
    };
    fetchMedicines();
  }, [dispatch]);

  const medicines = useSelector((state) => state.med.medicines); // Assuming the medicines are stored in the Redux store

  // Update quantity of a cart item
  const updateQuantity = async (medicineId, quantity) => {
    try {
      const response = await axios.patch(`${backendUrl}/cart/update-cart`, {
        medicineId,
        quantity,
      });
      fetchCart();
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  // Remove item from cart
  const removeItem = async (medicineId) => {
    try {
      await axios.delete(`${backendUrl}/cart/remove-from-cart/${medicineId}`);
      fetchCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="container mx-auto p-6 bg-gray-50">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Loading your cart...
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Your Cart
      </h1>

      {/* Cart Items */}
      {cartItems && cartItems.length > 0 ? (
        <div className="space-y-6">
          {cartItems.map((item) => {
            // Find the corresponding medicine using the medicineId
            const medicine = medicines.find(
              (med) => med._id === item.medicineId
            );
            return (
              <div
                key={item._id}
                className="flex items-center bg-white border rounded-lg shadow-md p-4 space-x-4"
              >
                <img
                  src={medicine?.image}
                  alt={medicine?.name}
                  className="w-24 h-24 object-contain"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {medicine?.name}
                  </h3>
                  <p className="text-gray-600">₹{medicine?.price} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.medicineId,
                        Math.max(item.quantity - 1, 1)
                      )
                    }
                    className="bg-gray-200 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.medicineId,
                        Math.max(e.target.value, 1)
                      )
                    }
                    className="w-16 text-center border border-gray-300 rounded-md"
                    min="1"
                    max={medicine?.quantity} // Max is the available stock quantity
                  />
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.medicineId,
                        Math.min(item.quantity + 1, medicine?.quantity)
                      )
                    }
                    className="bg-gray-200 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="ml-4 text-gray-800 font-semibold">
                  ₹{medicine?.price * item.quantity}
                </div>

                {/* Remove Item Button */}
                <button
                  onClick={() => removeItem(item.medicineId)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            );
          })}
          {/* Total Price */}
          <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mt-8">
            <span className="font-semibold text-lg">Total Price:</span>
            <span className="text-xl font-bold text-gray-800">
              ₹{getCartAmount()}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      )}

      {/* Proceed to Checkout Button */}
      {cartItems.length > 0 && (
        <div className="mt-6 flex justify-end">
          <Link
            to="/checkout"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
