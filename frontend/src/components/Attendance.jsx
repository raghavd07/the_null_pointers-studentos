import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

export default function Attendance() {
  const [form, setForm] = useState({ attended: "", total: "", upcoming: "", target: "75" });
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
      attended, total, upcoming,
      target: form.target, status, message, count,
      currentPct: currentPct.toFixed(1),
    };
    localStorage.setItem("studentos_attendance", JSON.stringify(data));
    setResult(data);
  };

  const colors = { SAFE: "#22c55e", WARNING: "#f59e0b", CRITICAL: "#ef4444" };
  const bgs = { SAFE: "rgba(34,197,94,0.08)", WARNING: "rgba(245,158,11,0.08)", CRITICAL: "rgba(239,68,68,0.08)" };

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "1.5rem 0" }}>
      <h2 style={{ color: "#93c5fd", fontWeight: 700, fontSize: "1.3rem", marginBottom: "1.5rem" }}>
        <FontAwesomeIcon icon={faCalendarCheck} style={{ marginRight: "0.5rem" }} />
        Attendance Tracker
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        {[
          { label: "Classes Attended", key: "attended" },
          { label: "Total Classes Held", key: "total" },
          { label: "Upcoming Classes", key: "upcoming" },
          { label: "Target %", key: "target" },
        ].map(({ label, key }) => (
          <div key={key}>
            <label style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block", marginBottom: 4 }}>{label}</label>
            <input
              type="number"
              value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              style={{
                width: "100%", padding: "0.6rem 0.8rem", borderRadius: 8,
                background: "#0f172a", border: "1px solid #1e3a5f",
                color: "#e2e8f0", fontSize: "0.95rem", outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={calculate}
        style={{
          width: "100%", padding: "0.75rem", borderRadius: 8,
          background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
          color: "#fff", fontWeight: 600, border: "none", cursor: "pointer",
          fontSize: "0.95rem", marginBottom: "1.5rem",
        }}
      >
        Calculate
      </motion.button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              borderRadius: 12, padding: "1.25rem",
              background: bgs[result.status],
              border: `1px solid ${colors[result.status]}33`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span style={{
                background: colors[result.status], color: "#000",
                fontWeight: 700, fontSize: "0.7rem", padding: "2px 10px",
                borderRadius: 99, letterSpacing: 1,
              }}>
                {result.status}
              </span>
              <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                Current: <strong style={{ color: "#e2e8f0" }}>{result.currentPct}%</strong>
                &nbsp;/ Target: <strong style={{ color: "#e2e8f0" }}>{result.target}%</strong>
              </span>
            </div>
            <p style={{ color: colors[result.status], fontWeight: 600, fontSize: "1rem", margin: 0 }}>
              {result.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}