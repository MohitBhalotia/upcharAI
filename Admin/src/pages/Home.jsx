import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <p className="text-5xl font-bold mb-8">Admin Panel</p>
      <Link to={"/login"}>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Home;
