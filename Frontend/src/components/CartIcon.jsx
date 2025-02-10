import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../store/slices/cartSlice";

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  
  useEffect(() => {
    dispatch(getCart()); // Fetch cart only when component mounts
  }, [dispatch]);

  return (
    <div className="relative">
      {/* Import image correctly or place it in public/assets/ */}
      <img src="./src/assets/cart.png" alt="Cart" className="w-8 h-8" />
      
      {/* Show badge only if cart is not empty */}
      {cartItems.length > 0 && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-2 py-1">
          {cartItems.length}
        </div>
      )}
    </div>
  );
};

export default CartIcon;
