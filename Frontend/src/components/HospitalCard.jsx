import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing

const HospitalCard = ({ hospital }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
      {/* Hospital Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{hospital.hospital_name}</h2>
        <p className="text-sm text-gray-500">{hospital.district}, {hospital.state}</p>
      </div>

      {/* Hospital Address */}
      <p className="text-gray-600 mb-2">{hospital.address}</p>
      
      {/* Hospital Distance */}
      <p className="text-gray-500 mb-4">Distance: {(hospital.distance/1000).toFixed(2)} Km</p>
      
      {/* Doctors List */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700 mb-3">Doctors:</h3>
        <ul className="space-y-3">
          {hospital.doctors.map((doctor) => (
            <li key={doctor._id} className="flex justify-between items-center">
              <div>
                <span className="font-medium text-gray-700">{doctor.name}</span> -{" "}
                <span className="text-gray-500">{doctor.speciality}</span>
              </div>
              <Link
                to={`/book-appointment/${doctor._id}`}
                className="text-sm text-blue-500 hover:text-blue-700 transition duration-300"
              >
                Book Appointment
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HospitalCard;
