import React, { useState } from "react";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const buttons = [
    { path: "/login-qr", label: "Scan Ayushmaan Card", icon: "scan" },
    { path: "/login-number", label: "Enter ABHA Number", icon: "pin" },
  ];

  const handleClick = (btn) => {
    setSelected(btn.icon);
    setTimeout(() => navigate(btn.path), 300);
  };

  return (
    <div className="min-w-100 bg-gray-50 px-8 py-4 flex justify-center items-center">
      <div className="flex justify-center w-md min-w-120 flex-col gap-6 bg-[#ffffff] p-12 rounded-2xl">
        <h1 className="text-[#024E56] text-2xl font-semibold text-center">
          Login
        </h1>
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => handleClick(btn)}
            onMouseEnter={() => setHovered(btn.icon)}
            onMouseLeave={() => setHovered(null)}
          >
            <Button
              className={`w-full min-w-100 text-xl rounded-2xl px-4 py-4 font-bold flex justify-center items-center gap-4 transition-all duration-300 
                ${
                  selected === btn.icon
                    ? " outline-4 outline-[#009B71] bg-[#CBCBCB] shadow-[0_0_0_4px_rgba(1,195,142,0.4)]"
                    : hovered === btn.icon
                    ? " outline-4 outline-[#01C38E] shadow-[0_0_0_32px_rgba(1,195,142,1)]"
                    : "bg-white text-[#024E56] shadow-[0px_12px_32px_0px_rgba(9,14,29,0.18)]  hover:outline-1 hover:outline-[#024E56] hover:bg-[#6A6E79] hover:shadow-[0_0_0_8px_rgba(1,195,142,0.4)]"
                }
              `}
              label={
                <>
                  <img
                    src={`./src/assets/${
                      selected === btn.icon
                        ? btn.icon + "_select"
                        : hovered === btn.icon
                        ? btn.icon + "_select"
                        : btn.icon
                    }.svg`}
                    className="w-22 h-22"
                    alt={btn.label}
                  />
                  <span className="text-left">{btn.label}</span>
                  <img
                    src={`./src/assets/${
                      selected === btn.icon
                        ? "next_select"
                        : hovered === btn.icon
                        ? "next_select"
                        : "next"
                    }.svg`}
                    className="w-6 h-6 ml-auto"
                    alt="Next"
                  />
                </>
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Login;
