import React from "react";
import Button from "./ui/Button";

const HospitalCard = ({ hospital, onCallReception }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{hospital.name}</h2>
      </div>
      <p className="text-gray-600 mb-2">{hospital.address}</p>
      <p className="text-gray-500 mb-4">Distance: {hospital.distance}</p>
      <Button
        onClick={() => onCallReception(hospital.phoneNumber)}
        label={"Call Reception"}
        className="w-full bg-[#01C38E] text-white px-6 py-3 rounded-xl hover:bg-[#009B71] transition duration-300"
      />
    </div>
  );
};

export default HospitalCard;
