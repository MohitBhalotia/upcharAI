import React from "react";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-4">
      {/* Button Section */}
      <div className="flex justify-center items-center">
        <div className="flex justify-center w-md flex-col gap-10 bg-[#132D46] p-20 rounded-2xl">
          <Link to={"/dispensary"}>
            <Button
              className={
                "bg-white w-full text-xl rounded-2xl px-10 py-4 font-bold text-[#132D46]"
              }
              label={"Basic Dispensary"}
            />
          </Link>
          <Link to={"/login"}>
            <Button
              className={
                "bg-white w-full text-xl rounded-2xl px-10 py-4 font-bold text-[#132D46]"
              }
              label={"Login"}
            />
          </Link>
          <Link to={"/first-aid"}>
            <Button
              className={
                "bg-white w-full text-xl rounded-2xl px-10 py-4 font-bold text-[#132D46]"
              }
              label={"First AID Tutorials"}
            />
          </Link>
          <Link to={"/abha"}>
            <Button
              className={
                "bg-white w-full text-xl rounded-2xl px-10 py-4 font-bold text-[#132D46]"
              }
              label={"ABHA"}
            />
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-12 text-center text-gray-600">
        <p>&copy; 2025 Upchar AI - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Home;
