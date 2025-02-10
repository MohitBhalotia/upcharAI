import React from "react";
import Button from "./ui/Button";
import CartIcon from './CartIcon'
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const userId = useSelector((state) => state.auth.userId);

  return (
    <div className="bg-[#132D46] py-4 px-6 md:px-10 rounded-bl-[32px] rounded-br-[32px] flex flex-col items-center relative">
      {/* Logo and Description Section */}
      <header className="flex flex-col items-center text-center w-full mb-4 md:mb-0">
        <Link to="/">
          <img
            src="./src/assets/upcharLogo.png"
            alt="Upchar AI Logo"
            className="w-28 md:w-36"
          />
        </Link>
        <p className="mt-2 text-sm md:text-lg text-[#979797] max-w-xs md:max-w-md">
          Your one-stop healthcare solution powered by AI and smart health kiosks
        </p>
      </header>

      {/* User and Cart Icons */}
      <div className="absolute top-4 left-6 md:left-10 flex flex-col md:flex-row items-center gap-2 md:gap-6">
        {userId && (
          <img
            src="./src/assets/user.png"
            alt="User Icon"
            className="w-6 h-6 md:w-8 md:h-8"
          />
        )}
        {location.pathname === "/dispensary" && (
          <Link to="/cart">
            <CartIcon />
          </Link>
        )}
      </div>

      {/* SOS Button */}
      <div className="absolute top-4 right-6 md:right-10">
        <Link to="/sos">
          <Button
            className="text-white font-bold bg-[#FA4D5E] px-6 py-3 md:px-10 md:py-4 rounded-3xl flex items-center gap-2 text-sm md:text-base"
            label={
              <>
                <img
                  src="./src/assets/ambulance.png"
                  alt="Ambulance Icon"
                  className="w-5 h-5 md:w-6 md:h-6"
                />
                SOS
              </>
            }
          ></Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
