import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import cross from "../../public/images/cross.svg";
import phone1 from "../../public/images/phone01.svg";
import phone2 from "../../public/images/phone02.svg";
import phone3 from "../../public/images/phone03.svg";
import phone4 from "../../public/images/phone04.svg";
const SOS = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const [calling, setCalling] = useState(false);
  const [calledNumber, setCalledNumber] = useState("");
  const [currentImage, setCurrentImage] = useState(phone4);
  const images = [phone4, phone3, phone2, phone1];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        return images[(currentIndex + 1) % images.length];
      });
    }, 600); // Faster animation
    return () => clearInterval(interval);
  }, []);

  const handleEmergencyCall = async () => {
    try {
      setCalling(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/sos/sos-call`
      );
      if (response.data.success) {
        setCalledNumber(response.data.number);
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
    navigate("/");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-red-100">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div
            className={`p-12 rounded-[24px] shadow-[0_12_0_32px_rgba(1,195,142,0.24)] w-96 text-center space-y-10 ${
              calling ? "bg-[#FA4D5E]" : "bg-white"
            } `}
          >
            {!calling ? (
              <>
                <h2 className="text-xl font-semibold flex flex-col items-center gap-y-6">
                  <img
                    src={currentImage}
                    alt="phone animation"
                    className="w-14 h-14 transition-all duration-600"
                  />
                  Are you sure you want to call emergency services?
                </h2>
                <div className="flex justify-around space-x-6">
                  <button
                    onClick={handleEmergencyCall}
                    className="bg-[#FA4D5E] text-white px-6 py-3 rounded-[16px] hover:bg-red-700 transition w-36"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="bg-gray-400 text-white px-6 py-3 rounded-[16px] hover:bg-gray-500 transition w-36"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {calledNumber && (
                  <p className="mt-6 text-white">Dialing: {calledNumber}</p>
                )}
                <div className="animate-pulse mt-8">
                  <span className="text-white text-2xl font-bold">
                    Connecting...
                  </span>
                </div>
                <div className="flex items-center justify-center mt-8">
                  <button
                    onClick={handleCutCall}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                  >
                    <img src={cross} alt="Cut Call" className="w-10 h-10" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SOS;
