import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-700">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
        <button onClick={() => navigate('/orders')} className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">Orders</button>
        <button onClick={() => navigate('/appointments')} className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">Appointments</button>
        <button onClick={() => navigate('/requests')} className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition">Requests</button>
        <button onClick={() => navigate('/medicines')} className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition">Medicines</button>
      </div>
    </div>
  );
};

export default Dashboard;