import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (authentication && !token) {
      navigate("/login");
    } else if (!authentication && token) {
      navigate("/dashboard");
    }
  }, [token, navigate, authentication]);

  if ((authentication && !token) || (!authentication && token)) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-200 animate-pulse">
          Loading...
        </h1>
      </div>
    );
  }

  return <div className="py-6 sm:px-4 lg:px-8">{children}</div>;
}
