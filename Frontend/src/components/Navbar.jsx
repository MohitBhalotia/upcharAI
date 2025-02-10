import React from "react";
import Button from "./ui/Button";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import CartIcon from "./CartIcon";
import { useSelector } from "react-redux";
const Navbar = () => {
  const userId = useSelector((state) => state.auth.userId);
  const location = useLocation();

  return (
    <div>
      {/* Header Section */}
      <header className="flex justify-center items-center mb-8 relative">
        {/* Left Section (Upchar AI Title) */}
        <div className="flex flex-col items-center ">
          <h1 className="text-3xl font-bold text-[#132D46]">
            <Link to={"/"}>Upchar AI</Link>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Your one-stop healthcare solution powered by AI and smart health
            kiosks
          </p>
        </div>
      </header>
      <div className="flex gap-10 items-center absolute top-6 right-8">
        {userId ? <CgProfile className=" text-3xl" /> : null}
        {location.pathname === "/dispensary" ? (
          <Link to={"/cart"}>
            <CartIcon />
          </Link>
        ) : null}
        <Button
          className={"text-white bg-red-600 px-10 py-4 rounded-3xl"}
          label={"SOS"}
        ></Button>
      </div>
    </div>
  );
};

export default Navbar;
