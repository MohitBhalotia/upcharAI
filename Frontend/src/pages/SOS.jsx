import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SOS = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true); // Show popup immediately
  const [calling, setCalling] = useState(false);
  const [calledNumber, setCalledNumber] = useState(""); // Store the number being called

  const handleEmergencyCall = async () => {
    try {
      setCalling(true);
      
      // Make API call
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/sos/sos-call`
      );
      
      if (response.data.success) {
        setCalledNumber(response.data.number); // Store the emergency number
      } else {
        alert("Failed to place the call.");
        setCalling(false);
      }
      
    } catch (error) {
      alert("Error placing the emergency call.");
      console.error(error);
      setCalling(false);
    }
  };

  const handleCutCall = () => {
    setCalling(false);
    setShowPopup(false);
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-red-100">
      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            {!calling ? (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Are you sure you want to call emergency services?
                </h2>
                <div className="flex justify-around">
                  <button
                    onClick={handleEmergencyCall}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-red-600">
                  📞 Calling Emergency...
                </h2>
                {calledNumber && (
                  <p className="mt-2 text-gray-600">Dialing: {calledNumber}</p>
                )}
                <div className="animate-pulse mt-4">
                  <span className="text-red-500 font-bold">Connecting...</span>
                </div>
                <button
                  onClick={handleCutCall}
                  className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Cut Call
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SOS;
