import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithNumber } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [number, setNumber] = useState(import.meta.env.VITE_ADMIN_NUMBER);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userId } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginWithNumber(number));
  };

  if (userId) {
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Enter your phone number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-500 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
