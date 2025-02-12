import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, addToCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom"; // For navigating to cart

const MedicineCard = ({ medicine }) => {
  const { _id, name, image, price, subsidized_price, quantity, description } =
    medicine;
  const dispatch = useDispatch();
  const navigate = useNavigate(); // To navigate to cart page
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isQuantityChanged, setIsQuantityChanged] = useState(false);

  // Fetch userId and cart from Redux store
  const userId = useSelector((state) => state.auth.userId);
  const cart = useSelector((state) => state.cart.cartItems) || [];
  const cartLoading = useSelector((state) => state.cart.loading);

  // Fetch cart when component mounts
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // Find the existing quantity of the current medicine in the cart
  const cartItem = cart.find((item) => item.medicineId === _id);
  const existingCartQuantity = cartItem ? cartItem.quantity : 0;

  // Set cart quantity from the store when available
  useEffect(() => {
    if (existingCartQuantity > 0) {
      setCartQuantity(existingCartQuantity);
    }
  }, [existingCartQuantity]);

  // Add or update item in the cart (send only the difference)
  const addCart = () => {
    const quantityDifference = cartQuantity - existingCartQuantity;

    if (quantityDifference !== 0) {
      dispatch(addToCart({ medicineId: _id, quantity: quantityDifference }));
      setIsQuantityChanged(false); // Reset confirmation state
      alert("Cart updated!");
    }
  };

  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    setCartQuantity(newQuantity);
    setIsQuantityChanged(true);
  };

  return (
    <div className="max-w-sm bg-[#132D46] rounded-[16px] shadow-[0px_8px_16px_0px_rgba(9,14,29,0.12)] overflow-hidden">
      {/* Image Section */}
      <div className="p-3">
        <img src={image} alt={name} className="w-full h-48 object-contain" />
      </div>

      {/* Inner Content */}
      <div className="bg-white p-4 rounded-[12px] w-full flex flex-col gap-2">
        <h3 className="text-2xl font-semibold text-[#132D46] truncate w-full">
          {name}
        </h3>

        <p className="inline-block border border-[#132D46] text-[#132D46] px-2 py-1 rounded-lg text-sm font-normal w-fit">
          Available: {quantity}
        </p>

        <p className="text-sm  text-gray-600 line-clamp-1">
          {description}
        </p>

        <div>
          <p className="text-sm text-gray-500">Price</p>
          <p className="text-2xl font-bold text-[#132D46]">
            {userId ? (
              <>
                <span className="line-through text-red-500 text-lg">
                  ₹{price}
                </span>
                <span className="text-green-600 ml-2">₹{subsidized_price}</span>
              </>
            ) : (
              <> ₹{price} </>
            )}
          </p>
        </div>

        <div className="flex justify-between items-center w-full">
          {cartItem ? (
            <>
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#132D46] text-[#132D46] rounded-md overflow-hidden">
                <button
                  className="bg-[#C1FFEE] px-2 py-1"
                  onClick={() =>
                    handleQuantityChange(Math.max(cartQuantity - 1, 1))
                  }
                  disabled={cartQuantity <= 1}
                >
                  -
                </button>
                <input
                  type="text"
                  value={cartQuantity}
                  readOnly
                  className="w-8 text-center border-none bg-transparent text-[#132D46]"
                />
                <button
                  className="bg-[#C1FFEE] px-2 py-1"
                  onClick={() =>
                    handleQuantityChange(Math.min(cartQuantity + 1, quantity))
                  }
                  disabled={cartQuantity >= quantity}
                >
                  +
                </button>
              </div>

              {/* Show "Confirm" button if quantity changed, otherwise "Go to Cart" */}
              <button
                onClick={isQuantityChanged ? addCart : () => navigate("/cart")}
                className="px-4 py-2 rounded-lg text-white bg-[#01C38E]"
                disabled={quantity === 0 || cartLoading}
              >
                {cartLoading
                  ? "Processing..."
                  : isQuantityChanged
                  ? "Confirm"
                  : "Go to Cart"}
              </button>
            </>
          ) : (
            // Show "Add to Cart" button if item is NOT in cart
            <button
              onClick={addCart}
              className="px-4 py-2 rounded-lg text-white bg-[#01C38E] w-full"
              disabled={quantity === 0 || cartLoading}
            >
              {cartLoading ? "Adding..." : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
