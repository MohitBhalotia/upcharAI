import React, { useState } from "react";
import axios from "axios";

const MedicineCard = ({ medicine }) => {
  const { _id, name, image, price, subsidized_price, quantity } = medicine;
  const backendUrl = import.meta.env.VITE_BACKEND_URI;
  const [cartQuantity, setCartQuantity] = useState(1); // Track selected quantity

  const addToCart = async (medicineId) => {
    const cartItem = {
      medicineId,
      quantity: cartQuantity,
    };

    try {
      const response = await axios.post(`${backendUrl}/cart/add-to-cart`, {
        cart: [cartItem],
      });

      if (response.status === 201) {
        alert(response.data.msg);
      } else throw Error();
    } catch (error) {
      console.log("Error adding to cart:", error);
      alert("Failed to add medicine to cart.");
    }
  };

  return (
    <div className="max-w-sm rounded-lg border bg-white border-gray-200 shadow-md overflow-hidden">
      {/* Image Section */}
      <img src={image} alt={name} className="w-full h-48 object-contain" />

      {/* Card Content */}
      <div className="p-4">
        {/* Medicine Name */}
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>

        {/* Price and Subsidized Price */}
        <div className="mt-4">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Price:</span> ₹{price}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Subsidized Price:</span> ₹
            {subsidized_price}
          </p>
        </div>

        {/* Quantity Available */}
        <p className="mt-2 text-gray-600">
          <span className="font-semibold">Available Quantity:</span> {quantity}
        </p>

        {/* Quantity Selector */}
        <div className="mt-4 flex items-center">
          <button
            className="bg-gray-200 px-2 py-1 rounded-l-md"
            onClick={() => setCartQuantity(Math.max(cartQuantity - 1, 1))}
          >
            -
          </button>
          <input
            type="number"
            value={cartQuantity}
            min="1"
            max={quantity}
            onChange={(e) =>
              setCartQuantity(Math.min(e.target.value, quantity))
            }
            className="w-16 text-center border-gray-300 rounded-md"
          />
          <button
            className="bg-gray-200 px-2 py-1 rounded-r-md"
            onClick={() =>
              setCartQuantity(Math.min(cartQuantity + 1, quantity))
            }
          >
            +
          </button>
        </div>

        {/* Action Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => addToCart(_id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
