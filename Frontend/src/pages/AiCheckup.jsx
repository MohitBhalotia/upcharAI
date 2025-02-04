import React from "react";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
const AiCheckup = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-sm flex flex-col gap-8 ">
        <Button
          onClick={() => navigate("/through-image")}
          label="Through image"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        />
        <Button
          onClick={() => navigate("/through-symptoms")}
          label="Through symptoms"
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
        />
      </div>
    </div>
  );
};

export default AiCheckup;
