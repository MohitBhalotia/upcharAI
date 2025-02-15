import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center  p-6">
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        <button
          onClick={() => handleNavigation("my-profile")}
          className="bg-blue-500 text-white p-4 rounded-2xl shadow-md hover:bg-blue-600 transition"
        >
          My Profile
        </button>
        <button
          onClick={() => handleNavigation("my-orders")}
          className="bg-green-500 text-white p-4 rounded-2xl shadow-md hover:bg-green-600 transition"
        >
          My Orders
        </button>
        <button
          onClick={() => handleNavigation("my-appointments")}
          className="bg-purple-500 text-white p-4 rounded-2xl shadow-md hover:bg-purple-600 transition"
        >
          My Appointments
        </button>
        <button
          onClick={() => handleNavigation("my-requests")}
          className="bg-orange-500 text-white p-4 rounded-2xl shadow-md hover:bg-orange-600 transition"
        >
          My Requested Medicines
        </button>
      </div>
    </div>
  );
};

export default Profile;
