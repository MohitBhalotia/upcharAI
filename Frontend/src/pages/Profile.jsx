import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

// Import images
import user from "../../public/images/user.svg";
import userSelect from "../../public/images/user_selected.svg";
import order from "../../public/images/order.svg";
import orderSelect from "../../public/images/order_selected.svg";
import appoint from "../../public/images/appoint.svg";
import appointSelect from "../../public/images/appoint_selected.svg";
import reqmed from "../../public/images/reqmed.svg";
import reqmedSelect from "../../public/images/reqmed_selected.svg";
import next from "../../public/images/next.svg";
import nextSelect from "../../public/images/next_select.svg";

const Profile = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const buttons = [
    {
      path: "my-profile",
      label: "My Profile",
      icon: user,
      iconSelect: userSelect,
    },
    {
      path: "my-orders",
      label: "My Orders",
      icon: order,
      iconSelect: orderSelect,
    },
    {
      path: "my-appointments",
      label: "My Appointments",
      icon: appoint,
      iconSelect: appointSelect,
    },
    {
      path: "my-requests",
      label: "My Requests",
      icon: reqmed,
      iconSelect: reqmedSelect,
    },
  ];

  const handleNavigation = (btn) => {
    setSelected(btn.label);
    setTimeout(() => navigate(btn.path), 300);
  };

  return (
    <div className="px-8 py-4 flex flex-col items-center">
      <div className="grid gap-6 w-full max-w-md p-4 rounded-2xl">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(btn)}
            onMouseEnter={() => setHovered(btn.label)}
            onMouseLeave={() => setHovered(null)}
          >
            <Button
              className={`w-full min-w-100 text-xl px-4 py-4 font-bold flex items-center gap-4 rounded-2xl transition-all duration-300 ${
                selected === btn.label
                  ? "outline-4 outline-[#009B71] bg-[#CBCBCB] shadow-[0_0_0_4px_rgba(1,195,142,0.4)]"
                  : hovered === btn.label
                  ? "outline-4 outline-[#01C38E] shadow-[0_0_0_32px_rgba(1,195,142,1)]"
                  : "bg-white text-[#024E56] shadow-md hover:bg-[#6A6E79] hover:text-white"
              }`}
              label={
                <>
                  <img
                    src={
                      selected === btn.label || hovered === btn.label
                        ? btn.iconSelect
                        : btn.icon
                    }
                    className="w-22 h-22"
                    alt={btn.label}
                  />
                  <span className="flex-grow text-left">{btn.label}</span>
                  <img
                    src={
                      selected === btn.label || hovered === btn.label
                        ? nextSelect
                        : next
                    }
                    className="w-6 h-6"
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

export default Profile;
