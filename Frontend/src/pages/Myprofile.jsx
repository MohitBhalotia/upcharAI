import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import personalUserIcon from "../../public/images/personalUser.svg";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URI;
  const token = useSelector((state) => state.auth.token);

  const getUser = useCallback(async () => {
    if (!token) return setError("Authentication token is missing.");
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
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-[#132D46] text-2xl font-extrabold text-center mb-4">
        User Profile
      </h1>
      {error && <div className="mb-4 text-red-600 text-center">⚠ {error}</div>}

      <div className="bg-[#132D46] p-2 rounded-[24px] shadow-xl transition-all duration-300 hover:shadow-3xl hover:translate-y-2">
        <div className="bg-white p-6 rounded-[16px] flex items-center mb-2">
          <img
            src={personalUserIcon}
            alt="Personal Information Icon"
            className="w-8 h-8 mr-2"
          />
          <h2 className="text-[#132D46] text-xl font-semibold">
            Personal Information
          </h2>
        </div>
        <div className="bg-white p-6 rounded-[18px]">
          <div className="space-y-2">
            {[
              ["Name", name],
              [
                "Gender",
                gender === "M" ? "Male" : gender === "F" ? "Female" : "N/A",
              ],
              ["Date of Birth", dob],
              ["District", district_name],
              ["Mobile", mobile],
              ["Address", address],
              ["HID", hid],
              ["HIDN", hidn],
            ].map(([label, value], index) => (
              <p key={index} className="text-[#132D46] text-lg font-base">
                <strong>{label}:</strong> {value || "N/A"}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
