import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CGPA() {
  const [subjects, setSubjects] = useState([{ name: "", grade: "", credits: "" }]);
  const [result, setResult] = useState(null);

  const gradePoints = { "O": 10, "A+": 9, "A": 8, "B+": 7, "B": 6, "C": 5, "F": 0 };

  const addSubject = () => setSubjects(s => [...s, { name: "", grade: "", credits: "" }]);
  const removeSubject = (i) => setSubjects(s => s.filter((_, idx) => idx !== i));
  const update = (i, field, val) =>
    setSubjects(s => s.map((sub, idx) => idx === i ? { ...sub, [field]: val } : sub));

  const calculate = () => {
    let totalPoints = 0, totalCredits = 0;
    const breakdown = subjects.map(sub => {
      const gp = gradePoints[sub.grade] ?? 0;
      const cr = parseFloat(sub.credits) || 0;
      totalPoints += gp * cr;
      totalCredits += cr;
      return { ...sub, gp };
    });
    const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    const data = { cgpa, totalCredits, breakdown };
    localStorage.setItem("studentos_cgpa", JSON.stringify(data));
    setResult(data);
  };

  const cgpaColor = (c) => {
    const n = parseFloat(c);
    return n >= 8.5 ? "#22c55e" : n >= 7 ? "#f59e0b" : "#ef4444";
  };

  const inputStyle = {
    width: "100%", padding: "0.55rem 0.7rem", borderRadius: 8,
    background: "#0f172a", border: "1px solid #1e3a5f",
    color: "#e2e8f0", fontSize: "0.88rem", outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ maxWidth: 580, margin: "0 auto", padding: "1.5rem 0" }}>
      <h2 style={{ color: "#93c5fd", fontWeight: 700, fontSize: "1.3rem", marginBottom: "1.5rem" }}>
        🎓 CGPA Calculator
      </h2>

      {/* Header row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr auto", gap: "0.5rem", marginBottom: "0.4rem" }}>
        {["Subject", "Grade", "Credits", ""].map((h, i) => (
          <span key={i} style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>{h}</span>
        ))}
      </div>

      {/* Subject rows */}
      {subjects.map((sub, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr auto", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "center" }}>
          <input
            placeholder="e.g. Maths"
            value={sub.name}
            onChange={e => update(i, "name", e.target.value)}
            style={inputStyle}
          />
          <select
            value={sub.grade}
            onChange={e => update(i, "grade", e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="">Grade</option>
            {Object.keys(gradePoints).map(g => (
              <option key={g} value={g}>{g} ({gradePoints[g]})</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Cr"
            value={sub.credits}
            onChange={e => update(i, "credits", e.target.value)}
            style={inputStyle}
          />
          <button
            onClick={() => removeSubject(i)}
            disabled={subjects.length === 1}
            style={{
              background: "transparent", border: "none", color: "#ef4444",
              cursor: subjects.length === 1 ? "not-allowed" : "pointer",
              fontSize: "1rem", opacity: subjects.length === 1 ? 0.3 : 1,
            }}
          >✕</button>
        </div>
      ))}

      {/* Controls */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem", marginBottom: "1.5rem" }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={addSubject}
          style={{
            flex: 1, padding: "0.65rem", borderRadius: 8,
            background: "#0f172a", border: "1px solid #1e3a5f",
            color: "#93c5fd", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem",
          }}
        >
          + Add Subject
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={calculate}
          style={{
            flex: 1, padding: "0.65rem", borderRadius: 8,
            background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
            color: "#fff", fontWeight: 600, border: "none", cursor: "pointer", fontSize: "0.9rem",
          }}
        >
          Calculate CGPA
        </motion.button>
      </div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              borderRadius: 12, padding: "1.25rem",
              background: "rgba(15,23,42,0.8)", border: "1px solid #1e3a5f",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: 4 }}>YOUR CGPA</div>
              <div style={{ fontSize: "3rem", fontWeight: 800, color: cgpaColor(result.cgpa) }}>
                {result.cgpa}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                Total Credits: {result.totalCredits}
              </div>
            </div>

            {/* Breakdown */}
            <div style={{ borderTop: "1px solid #1e3a5f", paddingTop: "0.75rem" }}>
              {result.breakdown.map((sub, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "0.3rem 0", fontSize: "0.82rem", color: "#94a3b8",
                  borderBottom: i < result.breakdown.length - 1 ? "1px solid #0f172a" : "none"
                }}>
                  <span>{sub.name || `Subject ${i + 1}`}</span>
                  <span style={{ color: "#e2e8f0" }}>{sub.grade} · {sub.credits} cr · {sub.gp} pts</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}