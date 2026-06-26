import React from "react";
import { useState } from "react";

export const Button = ({
  label = "Click Me",
  onClick = () => {},
  backgroundColor = "#6c63ff",
  color = "#ffffff",
  hoverBackgroundColor = "#574fd6",
  hoverColor = "#ffffff",
  fontSize = "15px",
  paddingX = "24px",
  paddingY = "11px",
  borderRadius = "8px",
  border = "none",
  fontFamily = "'Segoe UI', sans-serif",
  fontWeight = "600",
  disabled = false,
  loading = false,
  icon = null,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: `${paddingY} ${paddingX}`,
    backgroundColor: disabled
      ? "#cccccc"
      : hovered
      ? hoverBackgroundColor
      : backgroundColor,
    color: hovered ? hoverColor : color,
    fontSize,
    fontFamily,
    fontWeight,
    border,
    borderRadius,
    cursor: disabled || loading ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    transform: pressed && !disabled ? "scale(0.96)" : "scale(1)",
    boxShadow:
      hovered && !disabled
        ? "0 6px 20px rgba(108,99,255,0.35)"
        : "0 2px 8px rgba(0,0,0,0.12)",
    transition: "all 0.2s ease",
    outline: "none",
    userSelect: "none",
    letterSpacing: "0.03em",
  };

  const spinnerStyle = {
    width: "13px",
    height: "13px",
    border: `2px solid ${color}44`,
    borderTop: `2px solid ${color}`,
    borderRadius: "50%",
    animation: "btn-spin 0.65s linear infinite",
  };

  return (
    <>
      <style>
        {`
          @keyframes btn-spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <button
        style={style}
        onClick={!disabled && !loading ? onClick : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setPressed(false);
        }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        disabled={disabled}
        aria-disabled={disabled || loading}
        aria-label={label}
      >
        {loading ? (
          <span style={spinnerStyle}></span>
        ) : (
          icon && <span>{icon}</span>
        )}

        {loading ? "Loading..." : label}
      </button>
    </>
  );
};

export default Button;