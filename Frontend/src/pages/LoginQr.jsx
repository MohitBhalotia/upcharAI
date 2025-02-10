import React, { useState, useEffect, useRef } from "react";
import QrScanner from "qr-scanner"; // Import qr-scanner
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithQR } from "../store/slices/authSlice";

const LoginQr = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const userId = useSelector((state) => state.auth.userId); // Moved outside of handleScan
  const [scanning, setScanning] = useState(false);
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

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-white text-2xl font-semibold text-center mb-6">
          Login
        </h1>

        {/* QR Scanner Section */}
        <div className="mb-6">
          {!scanning ? (
            <button
              onClick={() => setScanning(true)}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Scan QR Code
            </button>
          ) : (
            <div>
              <video ref={videoRef} style={{ width: "100%", height: "auto" }} />
              <p className="text-white text-center mt-2">Scanning QR Code...</p>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && <p className="text-red-500 text-center">{error.message}</p>}

        {/* Stop Scanning Button */}
        {scanning && (
          <div className="mt-4">
            <button
              onClick={() => setScanning(false)}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Stop Scanning
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginQr;
