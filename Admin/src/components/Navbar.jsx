import React from "react";
import { FaSignOutAlt, FaHome } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-lg">
      <button
        onClick={handleHome}
        className="text-2xl font-bold flex items-center space-x-2 hover:text-gray-200"
      >
        <FaHome /> <span>Admin Panel</span>
      </button>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 hover:text-gray-200"
      >
        <FaSignOutAlt /> <span>Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;
