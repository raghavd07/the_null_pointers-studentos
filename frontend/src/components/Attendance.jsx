import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCheckCircle,
  faTriangleExclamation,
  faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";

export default function Attendance() {
  const [form, setForm] = useState({
    attended: "",
    total: "",
    upcoming: "",
    target: "75"
  });

  const [result, setResult] = useState(null);

  const calculate = () => {
    const attended = parseInt(form.attended);
    const total = parseInt(form.total);
    const upcoming = parseInt(form.upcoming);
    const target = parseFloat(form.target) / 100;

    if (isNaN(attended) || isNaN(total) || isNaN(upcoming)) return;

    const currentPct = (attended / total) * 100;
    const diff = currentPct - parseFloat(form.target);

    let status, message, count;

    if (diff >= 5) {
      status = "SAFE";
      count = Math.floor(attended / target - total);
      message = `You can afford to miss ${count} more class${count !== 1 ? "es" : ""}.`;
    } else if (diff >= 0) {
      status = "WARNING";
      count = Math.floor(attended / target - total);
      message = `Thin margin — only ${count} class${count !== 1 ? "es" : ""} to spare. Stay regular.`;
    } else {
      status = "CRITICAL";
      count = Math.ceil((target * total - attended) / (1 - target));
      message = `Attend next ${count} consecutive class${count !== 1 ? "es" : ""} to recover.`;
    }

    const data = {
      attended,
      total,
      upcoming,
      target: form.target,
      status,
      message,
      count,
      currentPct: currentPct.toFixed(1),
    };

    localStorage.setItem("studentos_attendance", JSON.stringify(data));
    setResult(data);
  };

  const colors = {
    SAFE: "#22c55e",
    WARNING: "#f59e0b",
    CRITICAL: "#ef4444"
  };

  const icons = {
    SAFE: faCheckCircle,
    WARNING: faTriangleExclamation,
    CRITICAL: faCircleExclamation
  };

  const inputStyle = {
    width: "100%",
    padding: "0.7rem 0.9rem",
    borderRadius: 10,
    background: "rgba(15,23,42,0.8)",
    border: "1px solid #1e293b",
    color: "#e2e8f0",
    fontSize: "0.9rem",
    outline: "none",
    transition: "0.2s"
  };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "1.5rem 0" }}>

      {/* Header */}
      <h2 style={{
        color: "#93c5fd",
        fontWeight: 700,
        fontSize: "1.35rem",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      }}>
        <FontAwesomeIcon icon={faCalendarCheck} />
        Attendance Tracker
      </h2>

      {/* Inputs */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        marginBottom: "1.2rem"
      }}>
        {[
          { label: "Classes Attended", key: "attended" },
          { label: "Total Classes", key: "total" },
          { label: "Upcoming Classes", key: "upcoming" },
          { label: "Target %", key: "target" },
        ].map(({ label, key }) => (
          <div key={key}>
            <label style={{
              fontSize: "0.75rem",
              color: "#94a3b8",
              marginBottom: 4,
              display: "block"
            }}>
              {label}
            </label>
            <input
              type="number"
              value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              style={inputStyle}
              onFocus={e => e.target.style.border = "1px solid #3b82f6"}
              onBlur={e => e.target.style.border = "1px solid #1e293b"}
            />
          </div>
        ))}
      </div>

      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={calculate}
        style={{
          width: "100%",
          padding: "0.8rem",
          borderRadius: 10,
          background: "linear-gradient(135deg, #2563eb, #3b82f6)",
          color: "#fff",
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
          marginBottom: "1.5rem",
          boxShadow: "0 4px 15px rgba(59,130,246,0.3)"
        }}
      >
        Calculate Attendance
      </motion.button>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              borderRadius: 14,
              padding: "1.3rem",
              background: "rgba(15,23,42,0.8)",
              border: `1px solid ${colors[result.status]}40`,
            }}
          >

            {/* Status Row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.8rem"
            }}>
              <span style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: colors[result.status],
                fontWeight: 700
              }}>
                <FontAwesomeIcon icon={icons[result.status]} />
                {result.status}
              </span>

              <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                {result.currentPct}% / {result.target}%
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{
              height: 8,
              borderRadius: 99,
              background: "#0f172a",
              overflow: "hidden",
              marginBottom: "1rem"
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.currentPct}%` }}
                transition={{ duration: 0.8 }}
                style={{
                  height: "100%",
                  background: colors[result.status]
                }}
              />
            </div>

            {/* Message */}
            <p style={{
              color: colors[result.status],
              fontWeight: 600,
              fontSize: "0.95rem",
              margin: 0
            }}>
              {result.message}
            </p>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}