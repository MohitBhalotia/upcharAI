import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <p className="text-center mt-20 text-5xl font-bold">Admin Panel</p>
      <Link to={"/login"}>
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Home;
