import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithAbha } from "../store/slices/authSlice";

const LoginAbhaNumber = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [abhaNumber, setAbhaNumber] = useState(import.meta.env.VITE_USER_ABHA);

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 14) setAbhaNumber(value); // Restrict to 14 digits
  };

  
  const loginAbha = async () => {
    dispatch(loginWithAbha(abhaNumber));
  };

  return (
    <div className=" flex flex-col items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80" style={{ boxShadow: "0px 0px 24px rgba(9, 14, 29, 0.12)", border: "none" }}>
        <h2 className="text-2xl font-bold mb-4 text-center text-[#132D46]">Login with ABHA</h2>

        <input
          type="text"
          placeholder="Enter 14-digit ABHA number"
          value={abhaNumber}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#01C38E]"
          maxLength={14}
        />

        <button
          onClick={loginAbha}
          disabled={loading}
          className={`mt-4 w-full py-2 rounded-lg shadow-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#01C38E] hover:bg-[#019C73] text-white"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="mt-2 text-red-500 text-center text-sm">{error}</p>
        )}
      </div>
    </div>
  );
};

export default LoginAbhaNumber;
