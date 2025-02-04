import React from "react";

const Button = ({ label, className, ...props }) => {
  return (
    <button className={` shadow-md  ${className}`} {...props}>
      {label}
    </button>
  );
};

export default Button;
