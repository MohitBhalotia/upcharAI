import React, { useState, useEffect, useRef } from "react";
import QrScanner from "qr-scanner"; // Import qr-scanner
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithQR } from "../store/slices/authSlice";
import scan1 from "../assets/scan1.svg";
import scan2 from "../assets/scan2.svg";

const LoginQr = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const userId = useSelector((state) => state.auth.userId); // Moved outside of handleScan
  const [scanning, setScanning] = useState(false);
  const [scanImage, setScanImage] = useState(scan1);
  const videoRef = useRef(null);
  const scannerRef = useRef(null); // Store QR scanner instance

  useEffect(() => {
    if (scanning && videoRef.current) {
      scannerRef.current = new QrScanner(
        videoRef.current,
        async (result) => {
          handleScan(result);
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      scannerRef.current.start();
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current = null; // Cleanup
      }
    };
  }, [scanning]);

  // Function to handle QR code scan result
  const handleScan = async (result) => {
    if (!result) return;

    try {
      const data = JSON.parse(result.data); // Access scanned QR code data
      dispatch(loginWithQR(data)); // Dispatch login action
    } catch (error) {
      console.error("Invalid QR Code Data:", error);
    }
    setScanning(false); // Stop scanning after successful scan
  };

  // Redirect if logged in
  useEffect(() => {
    if (userId) {
      navigate("/dashboard");
    }
  }, [userId, navigate]);

  useEffect(() => {
    // Change scan image every second
    const interval = setInterval(() => {
      setScanImage((prev) => (prev === scan1 ? scan2 : scan1));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="bg-gray-50 flex justify-center items-center px-8 py-4">
      <div className="bg-[#132D46] p-12 rounded-2xl shadow-[0px_12px_32px_0px_rgba(9,14,29,0.12)] w-full max-w-md flex flex-col gap-6">
        {!scanning && (
          <div className="flex justify-center">
            <img
              src={scanImage}
              alt="Scanning Animation"
              className="w-24 h-24"
            />
          </div>
        )}

        {/* QR Scanner Section */}
        <div className="mb-6">
          {!scanning ? (
            <button
              onClick={() => setScanning(true)}
              className="bg-white w-full min-w-40 text-xl rounded-2xl px-10 py-4 font-bold text-[#024E56] flex justify-center items-center gap-2 shadow-[0px_12px_32px_0px_rgba(9,14,29,0.12)]"
            >
              Start Scanning
            </button>
          ) : (
            <div className="flex flex-col items-center">
              <video ref={videoRef} className="w-full rounded-lg" />
              <p className="text-white text-center mt-2">Scanning QR Code...</p>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && <p className="text-red-500 text-center">{error.message}</p>}

        {/* Stop Scanning Button */}
        {scanning && (
          <button
            onClick={() => setScanning(false)}
            className="bg-[#FA4D5E] w-full min-w- text-xl rounded-2xl px-10 py-4 font-bold text-[#ffffff] flex justify-center items-center gap-2 shadow-[0px_12px_32px_0px_rgba(9,14,29,0.12)]"
          >
            Stop Scanning
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginQr;
