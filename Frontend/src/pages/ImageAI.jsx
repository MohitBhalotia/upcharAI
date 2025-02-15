import React, { useState, useRef } from 'react';
import axios from 'axios';

const ImageAI = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Camera access denied or not available');
    }
  };

  const captureImage = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('file', blob, 'captured_image.png');
      try {
        const response = await axios.post('http://localhost:6000/predict-via-image', formData);
        setResult(response.data.prediction);
      } catch (err) {
        setError('Error uploading image or receiving prediction');
      }
    }, 'image/png');
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Skin Disease Detector</h1>
      <video ref={videoRef} autoPlay className="w-full max-w-md rounded shadow" />
      <canvas ref={canvasRef} className="hidden" width={640} height={480}></canvas>
      <button onClick={startCamera} className="m-2 p-2 bg-blue-500 text-white rounded">Start Camera</button>
      <button onClick={captureImage} className="m-2 p-2 bg-green-500 text-white rounded">Capture Image</button>
      {result && <p className="mt-4 text-green-700 font-semibold">{result}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default ImageAI;
