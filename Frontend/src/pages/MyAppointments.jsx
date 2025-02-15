import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URI;
  const token = useSelector((state) => state.auth.token);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${backendUrl}/appointments/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle different possible response structures
      if (response.data.appointment) {
        setAppointments([response.data.appointment]); // Wrap single appointment in an array
      } else if (response.data.appointments) {
        setAppointments(response.data.appointments); // Use array if available
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appointment, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-300"
            >
              <p>
                <strong>Date:</strong> {appointment.date}
              </p>
              <p>
                <strong>Doctor:</strong> {appointment.doctorName}
              </p>
              <p>
                <strong>Reason:</strong> {appointment.reason}
              </p>
              <p>
                <strong>Hospital:</strong> {appointment.hospitalName}
              </p>
              <p>
                <strong>Address:</strong> {appointment.address}
              </p>
              <p>
                <strong>Booked At:</strong>{" "}
                {new Date(appointment.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
