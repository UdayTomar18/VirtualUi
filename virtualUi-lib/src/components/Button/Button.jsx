import React from "react";

const alpha = (hex, op) => {
  const r=parseInt(hex.slice(1,3),16),
        g=parseInt(hex.slice(3,5),16),
        b=parseInt(hex.slice(5,7),16);
  return "rgba("+r+","+g+","+b+","+op+")";
};

export const Button = ({ 
  label = "Click me", 
  onClick = () => console.log("Button clicked"), 
  color = "#4CAF50", 
  disabled = false, 
  size = "medium" 
}) => {
  const sizes = {
    small: { padding: "6px 12px", fontSize: "12px" },
    medium: { padding: "10px 20px", fontSize: "14px" },
    large: { padding: "14px 28px", fontSize: "16px" }
  };
  
  const buttonStyle = {
    backgroundColor: disabled ? "#cccccc" : color,
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
    ...sizes[size]
  };
  
  const hoverStyle = {
    backgroundColor: disabled ? "#cccccc" : alpha(color, 0.8)
  };
  
  const [hover, setHover] = React.useState(false);
  
  return (
    <button
      onClick={!disabled ? onClick : null}
      style={hover ? { ...buttonStyle, ...hoverStyle } : buttonStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={disabled}
    >
      {label}
    </button>
  );
};