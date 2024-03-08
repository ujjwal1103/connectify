// Button.js

import React from "react";
import PropTypes from "prop-types";

const Button = ({
  children,
  onClick,
  className,
  size,
  color,
  variant,
  unsetStyle=false,
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "py-1 px-2 text-xs";
      case "large":
        return "py-3 px-6 text-sm";
      default:
        return "py-2 px-4 text-base";
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return "bg-blue-500 text-white";
      case "secondary":
        return "bg-gray-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "outlined":
        return "border border-solid";
      case "contained":
        return "shadow";
      default:
        return "";
    }
  };

  return (
    <button
      onClick={onClick}
      className={
        unsetStyle
          ? ""
          : `rounded focus:outline-none ${getSizeClasses()} ${getColorClasses()} ${getVariantClasses()} ${className}`
      }
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf(["primary", "secondary"]),
  variant: PropTypes.oneOf(["contained", "outlined"]),
};

export default Button;
