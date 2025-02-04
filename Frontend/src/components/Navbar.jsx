import React from "react";
import Button from "./ui/Button";
import { Link } from "react-router-dom";

const Navbar = () => {
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
      <Button
        className={
          "absolute top-6 right-8 px-10 py-4 rounded-3xl text-white bg-red-600"
        }
        label={"SOS"}
      ></Button>
    </div>
  );
};

export default Navbar;
