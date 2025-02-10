import React, { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../store/slices/cartSlice";

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  let userId = useSelector((state) => state.auth.userId);
  if (!userId) {
    userId = import.meta.env.VITE_ADMIN_ID;
  }
  useEffect(() => {
    dispatch(getCart());
  }, []);
  return (
    <div>
      <FaShoppingCart className="text-4xl relative" />
      <div className="absolute top-[6px] right-[140px] bg-yellow-400 rounded-full px-2">
        {cartItems.length}
      </div>
    </div>
  );
};

export default CartIcon;
