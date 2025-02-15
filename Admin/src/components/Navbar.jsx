import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-lg">
      <div className="text-2xl font-bold">Admin Panel</div>
      <button className="flex items-center space-x-2 hover:text-gray-200">
        <FaSignOutAlt /> <span>Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;