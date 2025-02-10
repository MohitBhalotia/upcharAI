import React, { useEffect } from "react";
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
    <div className="relative">
      <img src="./src/assets/cart.png" className="w-8 h-8"/>
      <div className="absolute top-[6px] right-[140px] bg-yellow-400 rounded-full px-2">
        {cartItems.length}
      </div>
    </div>
  );
};

export default CartIcon;
