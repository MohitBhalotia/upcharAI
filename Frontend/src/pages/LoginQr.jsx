import React, { useState, useEffect, useRef } from "react";
import QrScanner from "qr-scanner"; // Import qr-scanner
import { useDispatch } from "react-redux";
import { loginWithQR } from "../store/slices/authSlice";
const LoginQr = () => {
  const [scanning, setScanning] = useState(false); // Control scanning state
  const videoRef = useRef(null); // Ref for video element
  const dispatch = useDispatch();

  useEffect(() => {
    let qrScanner;

    if (scanning && videoRef.current) {
      qrScanner = new QrScanner(videoRef.current, handleScan, {
        highlightScanRegion: true, // Highlight scan area (optional)
        highlightCodeOutline: true, // Highlight QR code outline (optional)
      });

      qrScanner.start();

      return () => qrScanner.stop(); // Clean up scanner on unmount
    }

    return () => {
      if (qrScanner) qrScanner.stop(); // Stop the scanner if not scanning
    };
  }, [scanning]);

  // Function to handle QR code scan result
  const handleScan = async (result) => {
    if (result) {
      const data = JSON.parse(result.data); // Access scanned QR code data
      dispatch(loginWithQR(data)); // Send data to backend
      setScanning(false); // Stop scanning after successful scan
    }
  };

  // Function to send scanned data to the backend

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
              onClick={() => setScanning(true)} // Start scanning
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
              onClick={() => setScanning(false)} // Stop scanning
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
