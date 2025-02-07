import React from 'react';

const MedicineCard = ({medicine}) => {
  const { name, image, price, subsidized_price, quantity }=medicine
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
            <span className="font-semibold">Subsidized Price:</span> ₹{subsidized_price}
          </p>
        </div>

        {/* Quantity Available */}
        <p className="mt-2 text-gray-600">
          <span className="font-semibold">Available Quantity:</span> {quantity}
        </p>

        {/* Action Button */}
        <div className="mt-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
