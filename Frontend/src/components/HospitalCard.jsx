import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import checkout from "../../public/images/checkout.svg";

const HospitalCard = ({ hospital }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
      {/* Hospital Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {hospital.hospital_name}
        </h2>
        <p className="text-sm text-gray-500">
          {hospital.district}, {hospital.state}
        </p>
      </div>

      {/* Hospital Address */}
      <p className="text-gray-600 mb-2">{hospital.address}</p>

      {/* Hospital Distance */}
      <p className="text-gray-500 mb-4">
        Distance: {(hospital.distance / 1000).toFixed(2)} Km
      </p>

      {/* Doctors List */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700 mb-3">Doctors:</h3>
        <div className="grid grid-cols-2 gap-4">
          {hospital.doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="flex flex-col items-center bg-gray-100 p-4 rounded-lg"
            >
              <span className="font-medium text-gray-700">{doctor.name}</span>
              <span className="text-gray-500">{doctor.speciality}</span>
              <Link
                to={`/book-appointment/${doctor._id}`}
                className="mt-2 px-4 py-2 bg-[#01C38E] text-sm text-white rounded-lg flex items-center gap-2 hover:bg-[#009B71] transition duration-300"
              >
                Book Appointment
                <img src={checkout} alt="checkout icon" className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
