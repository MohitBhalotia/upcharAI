import React from "react";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-sm flex flex-col gap-8 ">
        <Button
          onClick={() => navigate("/ai-checkup")}
          label="AI Checkup"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        />
        <Button
          onClick={() => navigate("/doctor-appointment")}
          label="Doctor's Appointment"
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
        />
        <Button
          onClick={() => navigate("/dispensary")}
          label="Dispensary"
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
        />
        <Button
          onClick={() => navigate("/query-bot")}
          label="AI ChatBot"
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
        />
      </div>
    </div>
  );
};

export default Dashboard;
