import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StudyPlan() {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAllData = () => {
    const user = JSON.parse(localStorage.getItem("studentos_user") || "{}");
    const attendance = JSON.parse(localStorage.getItem("studentos_attendance") || "{}");
    const cgpa = JSON.parse(localStorage.getItem("studentos_cgpa") || "{}");
    const placement = JSON.parse(localStorage.getItem("studentos_placement") || "{}");
    const sleepiness = JSON.parse(localStorage.getItem("studentos_sleepiness") || "{}");
    return { user, attendance, cgpa, placement, sleepiness };
  };

  const generate = async () => {
    setLoading(true);
    setError("");
    setPlan("");

    const data = getAllData();

    try {
      const res = await fetch("http://localhost:5000/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setPlan(json.plan || json.message || "No plan returned.");
    } catch (e) {
      setError("Could not reach backend. Make sure the server is running on port 5000.");
    }

    setLoading(false);
  };

  const data = getAllData();
  const hasData = Object.keys(data.attendance).length > 0 ||
    Object.keys(data.cgpa).length > 0 ||
    Object.keys(data.placement).length > 0 ||
    Object.keys(data.sleepiness).length > 0;

  const statCards = [
    {
      label: "Attendance",
      value: data.attendance.currentPct ? `${data.attendance.currentPct}%` : "—",
      status: data.attendance.status,
      colors: { SAFE: "#22c55e", WARNING: "#f59e0b", CRITICAL: "#ef4444" },
    },
    {
      label: "CGPA",
      value: data.cgpa.cgpa || "—",
      status: null,
    },
    {
      label: "Placement",
      value: data.placement.score ? `${data.placement.score}/100` : "—",
      status: data.placement.readiness,
      colors: { HIGH: "#22c55e", MODERATE: "#f59e0b", LOW: "#ef4444" },
    },
    {
      label: "Stress Score",
      value: data.sleepiness.score !== undefined ? `${data.sleepiness.score}/100` : "—",
      status: data.sleepiness.level,
      colors: { "WELL RESTED": "#22c55e", "FATIGUED": "#f59e0b", "BURNOUT RISK": "#ef4444" },
    },
  ];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "1.5rem 0" }}>
      <h2 style={{ color: "#93c5fd", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.5rem" }}>
        📚 AI Study Plan
      </h2>
      <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
        Pulls all your saved module data and generates a personalised plan via Groq AI.
      </p>

      {/* Snapshot cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
        {statCards.map(({ label, value, status, colors }) => (
          <div key={label} style={{
            borderRadius: 10, padding: "0.9rem 1rem",
            background: "#0f172a", border: "1px solid #1e3a5f",
          }}>
            <div style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
              {label}
            </div>
            <div style={{
              fontSize: "1.3rem", fontWeight: 700,
              color: status && colors ? colors[status] : "#e2e8f0",
            }}>
              {value}
            </div>
            {status && (
              <div style={{ fontSize: "0.68rem", color: status && colors ? colors[status] : "#94a3b8", marginTop: 2 }}>
                {status}
              </div>
            )}
          </div>
        ))}
      </div>

      {!hasData && (
        <div style={{
          borderRadius: 10, padding: "1rem", marginBottom: "1.5rem",
          background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
          color: "#f59e0b", fontSize: "0.85rem",
        }}>
          ⚠️ No module data found. Fill in Attendance, CGPA, Placement, and Sleepiness first for a better plan.
        </div>
      )}

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={generate}
        disabled={loading}
        style={{
          width: "100%", padding: "0.8rem", borderRadius: 8,
          background: loading ? "#1e3a5f" : "linear-gradient(135deg, #1d4ed8, #2563eb)",
          color: "#fff", fontWeight: 600, border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "0.95rem", marginBottom: "1.5rem",
        }}
      >
        {loading ? "Generating Plan..." : "✨ Generate My Study Plan"}
      </motion.button>

      {error && (
        <div style={{
          borderRadius: 10, padding: "1rem", marginBottom: "1rem",
          background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
          color: "#ef4444", fontSize: "0.85rem",
        }}>
          {error}
        </div>
      )}

      <AnimatePresence>
        {plan && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              borderRadius: 12, padding: "1.5rem",
              background: "rgba(15,23,42,0.9)", border: "1px solid #1e3a5f",
            }}
          >
            <div style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: "0.75rem", letterSpacing: 1 }}>
              ✨ YOUR PERSONALISED PLAN (GROQ AI)
            </div>
            <div style={{
              color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.75,
              whiteSpace: "pre-wrap",
            }}>
              {plan}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}