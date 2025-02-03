import React from "react";

const Button = ({ label, className }) => {
  return (
    <button
      className={` shadow-md  ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
