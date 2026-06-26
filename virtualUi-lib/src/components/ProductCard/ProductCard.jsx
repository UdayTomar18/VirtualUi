import React, { useState } from "react";

const alpha = (hex, op) => {
  const r=parseInt(hex.slice(1,3),16),
        g=parseInt(hex.slice(3,5),16),
        b=parseInt(hex.slice(5,7),16);
  return "rgba("+r+","+g+","+b+","+op+")";
};

export const ProductCard = ({ 
  title = "Premium Headphones", 
  price = 199.99, 
  discount = 0, 
  rating = 4.5, 
  imageUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  accentColor = "#3b82f6"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
  
  const discountPrice = discount > 0 
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price * (1 - discount/100))
    : null;
  
  return (
    <div 
      style={{
        width: "280px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 6px " + alpha("#000000", 0.1),
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered ? "0 8px 15px " + alpha("#000000", 0.15) : "0 4px 6px " + alpha("#000000", 0.1),
        backgroundColor: "#ffffff",
        position: "relative"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: "relative" }}>
        <img 
          src={imageUrl} 
          alt={title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px"
          }}
        />
        <button
          onClick={() => setIsLiked(!isLiked)}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 4px " + alpha("#000000", 0.1)
          }}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill={isLiked ? accentColor : "none"} 
            stroke={isLiked ? accentColor : "#6b7280"} 
            strokeWidth="2"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
        {discount > 0 && (
          <div style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            backgroundColor: accentColor,
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "bold"
          }}>
            -{discount}%
          </div>
        )}
      </div>
      
      <div style={{ padding: "16px" }}>
        <h3 style={{
          margin: "0 0 8px 0",
          fontSize: "18px",
          fontWeight: "600",
          color: "#1f2937",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
          {title}
        </h3>
        
        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill={i < Math.floor(rating) ? "#f59e0b" : (i < rating ? "#f59e0b" : "#e5e7eb")} 
              stroke="#f59e0b" 
              strokeWidth="1"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
          <span style={{ 
            marginLeft: "6px", 
            fontSize: "14px", 
            color: "#6b7280" 
          }}>
            {rating.toFixed(1)}
          </span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: accentColor
          }}>
            {discountPrice || formattedPrice}
          </span>
          {discountPrice && (
            <span style={{
              fontSize: "14px",
              color: "#6b7280",
              textDecoration: "line-through"
            }}>
              {formattedPrice}
            </span>
          )}
        </div>
        
        <button 
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "10px 16px",
            backgroundColor: isHovered ? alpha(accentColor, 0.9) : accentColor,
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.2s ease"
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};