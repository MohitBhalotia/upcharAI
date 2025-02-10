import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.userId); // Ensure userId is correctly fetched

  useEffect(() => {
    if (authentication && !userId) {
      navigate("/login");
    } else if (!authentication && userId) {
      navigate("/dashboard");
    }
    setLoading(false);
  }, [userId, navigate, authentication]);

  return loading ? (
    <div className="min-h-[600px] flex items-center justify-center bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-200 animate-pulse">
        Loading...
      </h1>
    </div>
  ) : (
    <div className="min-h-[600px]  py-6 sm:px-4 lg:px-8">
      {children}
    </div>
  );
}
