import React from "react";
import Button from "./ui/Button";
import CartIcon from "./CartIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import ArrowLeftIcon from "../../public/images/backButton.svg";
// Import images
import upcharLogo from "../../public/images/upcharLogo.png";
import userIcon from "../../public/images/user.png";
import ambulanceIcon from "../../public/images/ambulance.png";

const Navbar = () => {
  const location = useLocation();
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-[#132D46] py-4 px-6 md:px-10 rounded-bl-[32px] rounded-br-[32px] flex flex-col items-center relative">
      {/* Logo and Description Section */}
      <header className="flex flex-col items-center text-center w-full mb-4 md:mb-0">
        <Link to="/">
          <img src={upcharLogo} alt="Upchar AI Logo" className="w-28 md:w-36" />
        </Link>
        <p className="mt-2 text-sm md:text-lg text-[#979797] max-w-xs md:max-w-md">
          Your one-stop healthcare solution powered by AI and smart health
          kiosks
        </p>
      </header>

      {/* User, Cart, and Back Icons */}
      <div className="absolute top-4 left-6 md:left-10 flex items-center gap-3 md:gap-6">
        <button onClick={handleBack} className="text-white">
          <img src={ArrowLeftIcon} className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        {userId && (
          <Link to={"/profile"}>
            <img
              src={userIcon}
              alt="User Icon"
              className="w-6 h-6 md:w-8 md:h-8"
            />
          </Link>
        )}
        {location.pathname === "/dispensary" && (
          <Link to="/cart">
            <CartIcon />
          </Link>
        )}
      </div>

      {/* Logout and SOS Buttons */}
      <div className="absolute top-4 right-6 md:right-10 flex items-center gap-4">
        {userId ? (
          <Button
            className="text-white font-bold bg-gray-600 px-4 py-2 md:px-6 md:py-3 rounded-3xl text-sm md:text-base"
            label="Logout"
            onClick={handleLogout}
          />
        ) : !location.pathname.startsWith("/login") &&
          location.pathname !== "/" ? (
          <Link to="/login">
            <Button
              className="text-white font-bold bg-gray-600 px-4 py-2 md:px-6 md:py-3 rounded-3xl text-sm md:text-base"
              label="Login"
            />
          </Link>
        ) : null}
        <Link to="/sos">
          <Button
            className="text-white font-bold bg-[#FA4D5E] px-6 py-3 md:px-10 md:py-4 rounded-3xl flex items-center gap-2 text-sm md:text-base"
            label={
              <>
                <img
                  src={ambulanceIcon}
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
