import React from "react";

import  { useState } from "react";

export const Card = ({
  image = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  category = "Travel",
  title = "Into the Wild Mountains",
  description = "A breathtaking journey through untouched alpine landscapes, where every step reveals a new perspective on the world below.",
  author = "Elena Vasquez",
  authorAvatar = "https://i.pravatar.cc/40?img=47",
  date = "Apr 24, 2026",
  readTime = "5 min read",
  likes = 128,
  bookmarked = false,
  accentColor = "#ff6b35",
  onLike = () => {},
  onBookmark = () => {},
  onReadMore = () => {},
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [saved, setSaved] = useState(bookmarked);
  const [imgHovered, setImgHovered] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(c => liked ? c - 1 : c + 1);
    onLike();
  };

  const handleBookmark = () => {
    setSaved(!saved);
    onBookmark();
  };

  const styles = {
    card: {
      width: "360px",
      borderRadius: "20px",
      overflow: "hidden",
      background: "#0d0d0d",
      boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: "relative",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    imageWrap: {
      position: "relative",
      height: "220px",
      overflow: "hidden",
      cursor: "pointer",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
      transform: imgHovered ? "scale(1.06)" : "scale(1)",
      display: "block",
    },
    imageOverlay: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)",
    },
    category: {
      position: "absolute",
      top: "16px",
      left: "16px",
      background: accentColor,
      color: "#fff",
      fontSize: "10px",
      fontFamily: "'Courier New', monospace",
      fontWeight: "700",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      padding: "5px 12px",
      borderRadius: "4px",
    },
    body: {
      padding: "24px",
    },
    title: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#f5f0e8",
      lineHeight: "1.3",
      marginBottom: "12px",
      letterSpacing: "-0.02em",
    },
    description: {
      fontSize: "13px",
      color: "#888",
      lineHeight: "1.7",
      marginBottom: "20px",
      fontFamily: "'Georgia', serif",
    },
    divider: {
      height: "1px",
      background: "#222",
      marginBottom: "16px",
    },
    meta: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "20px",
    },
    avatar: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      objectFit: "cover",
      border: `2px solid ${accentColor}`,
    },
    authorName: {
      fontSize: "13px",
      color: "#f5f0e8",
      fontWeight: "600",
      fontFamily: "'Courier New', monospace",
    },
    metaRight: {
      marginLeft: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "2px",
    },
    metaText: {
      fontSize: "11px",
      color: "#555",
      fontFamily: "'Courier New', monospace",
    },
    actions: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    iconBtn: (active, hoverColor) => ({
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      background: "none",
      border: "1.5px solid #2a2a2a",
      borderRadius: "8px",
      padding: "8px 14px",
      cursor: "pointer",
      fontSize: "12px",
      color: active ? hoverColor : "#666",
      fontFamily: "'Courier New', monospace",
      transition: "all 0.2s ease",
    }),
    readBtn: {
      marginLeft: "auto",
      background: accentColor,
      border: "none",
      borderRadius: "8px",
      padding: "9px 18px",
      color: "#fff",
      fontSize: "12px",
      fontFamily: "'Courier New', monospace",
      fontWeight: "700",
      letterSpacing: "0.05em",
      cursor: "pointer",
      transition: "opacity 0.2s ease",
    },
  };

  return (
    <div style={styles.card}>
      <div
        style={styles.imageWrap}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
      >
        <img src={image} alt={title} style={styles.image} />
        <div style={styles.imageOverlay} />
        <span style={styles.category}>{category}</span>
      </div>

      <div style={styles.body}>
        <div style={styles.title}>{title}</div>
        <div style={styles.description}>{description}</div>
        <div style={styles.divider} />

        <div style={styles.meta}>
          <img src={authorAvatar} alt={author} style={styles.avatar} />
          <div>
            <div style={styles.authorName}>{author}</div>
          </div>
          <div style={styles.metaRight}>
            <span style={styles.metaText}>{date}</span>
            <span style={styles.metaText}>{readTime}</span>
          </div>
        </div>

        <div style={styles.actions}>
          <button style={styles.iconBtn(liked, "#e74c3c")} onClick={handleLike}>
            {liked ? "♥" : "♡"} {likeCount}
          </button>
          <button style={styles.iconBtn(saved, accentColor)} onClick={handleBookmark}>
            {saved ? "⊟" : "⊞"} {saved ? "Saved" : "Save"}
          </button>
          <button
            style={styles.readBtn}
            onMouseOver={e => e.target.style.opacity = "0.85"}
            onMouseOut={e => e.target.style.opacity = "1"}
            onClick={onReadMore}
          >
            Read →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;