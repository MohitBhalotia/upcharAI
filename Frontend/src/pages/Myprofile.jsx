import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URI;
  const token = useSelector((state) => state.auth.token);

  // Memoized API call
  const getUser = useCallback(async () => {
    if (!token) {
      setError("Authentication token is missing.");
      return;
    }

    try {
      const response = await axios.get(`${backendUrl}/auth/get-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
      setError("");
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setError("Failed to load user data. Please try again later.");
    }
  }, [backendUrl, token]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const { name, gender, dob, hid, hidn, district_name, mobile, address } = user;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>

      {error && (
        <div className="mb-4 text-red-600 text-center">
          ⚠️ {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Personal Information</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {name || "N/A"}</p>
          <p><strong>Gender:</strong> {gender === "M" ? "Male" : gender === "F" ? "Female" : "N/A"}</p>
          <p><strong>Date of Birth:</strong> {dob || "N/A"}</p>
          <p><strong>District:</strong> {district_name || "N/A"}</p>
          <p><strong>Mobile:</strong> {mobile || "N/A"}</p>
          <p><strong>Address:</strong> {address || "N/A"}</p>
          <p><strong>HID:</strong> {hid || "N/A"}</p>
          <p><strong>HIDN:</strong> {hidn || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
