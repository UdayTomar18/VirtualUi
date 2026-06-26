import React, { useState } from "react";

export const Profilecard = ({
  name = "Priya Mehta",
  role = "Product Designer",
  company = "Linear",
  location = "San Francisco, CA",
  avatar = "https://i.pravatar.cc/80?img=47",
  coverColor = "#C0DD97",
  online = true,
  followers = "12.4k",
  following = 310,
  projects = 48,
  tags = ["UI/UX", "Figma", "Systems"],
  onMessage = () => {},
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const s = {
    card: {
      width: "300px",
      background: "#fff",
      border: "0.5px solid rgba(0,0,0,0.1)",
      borderRadius: "16px",
      overflow: "hidden",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    },
    cover: {
      height: "88px",
      background: coverColor,
      position: "relative",
    },
    avatarWrap: {
      position: "absolute",
      bottom: "-28px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    avatar: {
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      border: "3px solid #fff",
      objectFit: "cover",
      display: "block",
    },
    dot: {
      position: "absolute",
      bottom: "2px",
      right: "2px",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: online ? "#22c55e" : "#9ca3af",
      border: "2px solid #fff",
    },
    info: {
      textAlign: "center",
      padding: "38px 20px 16px",
    },
    name: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#111",
      margin: "0 0 2px",
    },
    role: {
      fontSize: "13px",
      color: "#666",
      margin: "0 0 8px",
    },
    location: {
      fontSize: "12px",
      color: "#999",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "4px",
    },
    tags: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "6px",
      margin: "12px 20px 0",
    },
    tag: {
      fontSize: "11px",
      padding: "3px 10px",
      borderRadius: "6px",
      background: "#f5f5f5",
      color: "#666",
      border: "0.5px solid rgba(0,0,0,0.08)",
    },
    stats: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      borderTop: "0.5px solid rgba(0,0,0,0.08)",
      borderBottom: "0.5px solid rgba(0,0,0,0.08)",
      margin: "16px 0 0",
    },
    stat: (i) => ({
      textAlign: "center",
      padding: "12px 8px",
      borderLeft: i > 0 ? "0.5px solid rgba(0,0,0,0.08)" : "none",
    }),
    statNum: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#111",
    },
    statLbl: {
      fontSize: "10px",
      color: "#aaa",
      marginTop: "2px",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
    },
    actions: {
      display: "flex",
      gap: "8px",
      padding: "14px 16px",
    },
    followBtn: {
      flex: 1,
      padding: "8px",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: "500",
      cursor: "pointer",
      border: isFollowing ? "0.5px solid #16a34a" : "0.5px solid rgba(0,0,0,0.15)",
      background: isFollowing ? "#dcfce7" : "#fff",
      color: isFollowing ? "#15803d" : "#111",
      transition: "all 0.15s ease",
    },
    msgBtn: {
      padding: "8px 14px",
      borderRadius: "8px",
      fontSize: "13px",
      cursor: "pointer",
      border: "0.5px solid rgba(0,0,0,0.15)",
      background: "#fff",
      color: "#666",
    },
  };

  const stats = [
    { num: followers, lbl: "Followers" },
    { num: following, lbl: "Following" },
    { num: projects, lbl: "Projects" },
  ];

  return (
    <div style={s.card}>
      <div style={s.cover}>
        <div style={s.avatarWrap}>
          <img src={avatar} alt={name} style={s.avatar} />
          <span style={s.dot} />
        </div>
      </div>

      <div style={s.info}>
        <p style={s.name}>{name}</p>
        <p style={s.role}>
          {role} · <span style={{ color: "#aaa" }}>{company}</span>
        </p>
        <div style={s.location}>
          <span>📍</span> {location}
        </div>
      </div>

      <div style={s.tags}>
        {tags.map((t) => (
          <span key={t} style={s.tag}>{t}</span>
        ))}
      </div>

      <div style={s.stats}>
        {stats.map((st, i) => (
          <div key={st.lbl} style={s.stat(i)}>
            <div style={s.statNum}>{st.num}</div>
            <div style={s.statLbl}>{st.lbl}</div>
          </div>
        ))}
      </div>

      <div style={s.actions}>
        <button style={s.followBtn} onClick={() => setIsFollowing(!isFollowing)}>
          {isFollowing ? "Following ✓" : "Follow"}
        </button>
        <button style={s.msgBtn} onClick={onMessage}>💬</button>
      </div>
    </div>
  );
};

export default Profilecard;