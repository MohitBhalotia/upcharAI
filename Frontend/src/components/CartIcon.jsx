import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../store/slices/cartSlice";

// Consider moving this image to the "public" directory for easier access
import cartIcon from "../../public/images/cart.png";

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(getCart()); // Fetch cart items when the component mounts
  }, [dispatch]);

  return (
    <div className="relative">
      <img src={cartIcon} alt="Cart" className="w-8 h-8" />

      {/* Badge to show the number of cart items */}
      {cartItems.length > 0 && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-2 py-1">
          {cartItems.length}
        </div>
      )}
    </div>
  );
};

export default CartIcon;
