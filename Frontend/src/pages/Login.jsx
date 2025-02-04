import React from "react";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-white text-2xl font-semibold text-center mb-6">Login</h1>
        
        <div className="space-y-4">
          <Button
            onClick={() => navigate("/login-qr")}
            label="Scan Ayushmaan Card"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          />
          <Button
            onClick={() => navigate("/login-number")}
            label="Enter Number"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
