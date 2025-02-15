import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import appointIcon from "../../public/images/appointIcon.svg";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URI;
  const token = useSelector((state) => state.auth.token);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${backendUrl}/appointments/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-[#132D46] text-2xl font-extrabold text-center mb-6">
        My Appointments
      </h1>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found.</p>
      ) : (
        <div className="space-y-6">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="bg-[#132D46] p-2 rounded-[24px] shadow-xl transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="flex items-center bg-white p-6 rounded-[16px] shadow-md mb-2">
                <img
                  src={appointIcon}
                  alt="Hospital Icon"
                  className="w-6 h-6 mr-2"
                />
                <h2 className="text-[#132D46] text-lg font-bold">
                  {appointment.hospitalName}
                </h2>
              </div>
              <div className="bg-white p-6 rounded-[16px] shadow-lg border border-gray-200 transition duration-300 hover:shadow-xl space-y-2">
                <p className="text-gray-700 text-base">
                  <strong>Date:</strong> {appointment.date}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Doctor:</strong> {appointment.doctorName}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Reason:</strong> {appointment.reason}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Address:</strong> {appointment.address}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Booked At:</strong>{" "}
                  {new Date(appointment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
