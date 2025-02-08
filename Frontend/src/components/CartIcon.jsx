import React from 'react'
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = () => {
  return (
    <div>
        <FaShoppingCart className="text-3xl relative"/>
        <div className='absolute top-[6px] right-[140px] bg-yellow-400 rounded-full px-1'>
            10
        </div>
    </div>
  )
}

export default CartIcon