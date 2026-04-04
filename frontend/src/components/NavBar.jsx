import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faGraduationCap,
  faBriefcase,
  faMoon,
  faBookOpen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const TABS = [
  { id: "attendance", label: "Attendance", icon: faCalendarCheck },
  { id: "cgpa", label: "CGPA", icon: faGraduationCap },
  { id: "placement", label: "Placement", icon: faBriefcase },
  { id: "sleepiness", label: "Sleepiness", icon: faMoon },
  { id: "studyplan", label: "Study Plan", icon: faBookOpen },
];

export default function Navbar({ user, activeTab, setActiveTab, onLogout }) {
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <>
      {/* 🔥 Topbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.9rem 2rem",
          backdropFilter: "blur(12px)",
          background: "rgba(15, 23, 42, 0.7)",
          borderBottom: "1px solid rgba(59,130,246,0.2)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Left */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: 800,
              color: "#93c5fd",
              letterSpacing: 0.5,
            }}
          >
            StudentOS
          </h2>

          <span
            style={{
              fontSize: "0.8rem",
              color: "#94a3b8",
              background: "rgba(2,6,23,0.6)",
              border: "1px solid rgba(59,130,246,0.2)",
              padding: "0.25rem 0.75rem",
              borderRadius: 99,
            }}
          >
            Hello {user?.name || "Student"} {user?.studentId ? `· ${user.studentId}` : ""}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "transparent",
            border: "1px solid rgba(59,130,246,0.2)",
            color: "#94a3b8",
            padding: "0.4rem 1rem",
            borderRadius: 8,
            fontSize: "0.85rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#ef4444";
            e.currentTarget.style.color = "#ef4444";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)";
            e.currentTarget.style.color = "#94a3b8";
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          Logout
        </button>
      </div>

      {/* 🔥 Tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.4rem",
          padding: "0.6rem 2rem",
          background: "rgba(15, 23, 42, 0.6)",
          borderBottom: "1px solid rgba(59,130,246,0.2)",
          overflowX: "auto",
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const isHovered = hoveredTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.45rem 1.1rem",
                borderRadius: 10,
                cursor: "pointer",
                whiteSpace: "nowrap",

                background: isActive
                  ? "rgba(59,130,246,0.15)"
                  : isHovered
                  ? "rgba(2,6,23,0.8)"
                  : "transparent",

                border: isActive
                  ? "1px solid rgba(59,130,246,0.35)"
                  : isHovered
                  ? "1px solid rgba(59,130,246,0.2)"
                  : "1px solid transparent",

                color: isActive
                  ? "#93c5fd"
                  : isHovered
                  ? "#e2e8f0"
                  : "#64748b",

                fontSize: "0.85rem",
                fontWeight: isActive ? 600 : 500,
                transition: "all 0.2s ease",
              }}
            >
              <FontAwesomeIcon icon={tab.icon} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </>
  );
}