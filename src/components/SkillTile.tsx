import { useState } from "react";

type SkillTileProps = {
  name: string;
  icon: string;
  level: number;
  xp?: number;
  tooltipLines: string[];
};

export default function SkillTile({
  name,
  icon,
  level,
  xp,
  tooltipLines
}: SkillTileProps) {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        width: 64,
        height: 64,
        border: "1px solid #444",
        background: "#2b2b2b",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        userSelect: "none"
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
      onTouchEnd={() => setHover(false)}
    >
      <img src={icon} alt={name} style={{ width: 32, height: 32 }} />

      {/* Level overlay */}
      <span
        style={{
          position: "absolute",
          bottom: 4,
          right: 6,
          color: "#ffd700",
          fontWeight: "bold",
          fontSize: 14,
          textShadow: "0 1px 0 #000"
        }}
      >
        {level}
      </span>

      {/* Tooltip */}
      {hover && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 72,
            transform: "translateX(-50%)",
            background: "#111",
            border: "1px solid #555",
            borderRadius: 6,
            padding: "8px 10px",
            minWidth: 160,
            zIndex: 1000,
            boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
            pointerEvents: "none"
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: 6,
              color: "#ffd700"
            }}
          >
            {titleCase(name)}
          </div>

          {xp !== undefined && (
            <div style={{ marginBottom: 6, color: "#ddd" }}>
              XP:{" "}
              <span style={{ fontFamily: "monospace" }}>
                {formatNumber(xp)}
              </span>
            </div>
          )}

          <div style={{ color: "#ddd", marginBottom: tooltipLines.length ? 6 : 0 }}>
            Level: <span style={{ fontFamily: "monospace" }}>{level}</span>
          </div>

          {tooltipLines.map((line, idx) => (
            <div key={idx} style={{ color: "#bbb", fontSize: 12 }}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatNumber(n: number) {
  return n.toLocaleString("en-GB");
}
