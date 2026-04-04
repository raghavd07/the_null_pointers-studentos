import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faPlus,
  faCalculator,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

export default function CGPA() {
  const [subjects, setSubjects] = useState([{ name: "", grade: "", credits: "" }]);
  const [result, setResult] = useState(null);

  const gradePoints = {
    S: 10, A: 9, B: 8, C: 7,
    D: 6, E: 5, P: 4, F: 0
  };

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
    width: "100%",
    padding: "0.65rem 0.8rem",
    borderRadius: 10,
    background: "rgba(15,23,42,0.8)",
    border: "1px solid #1e293b",
    color: "#e2e8f0",
    fontSize: "0.88rem",
    outline: "none",
    transition: "0.2s"
  };

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", padding: "1.5rem 0" }}>

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
        <FontAwesomeIcon icon={faGraduationCap} />
        CGPA Calculator
      </h2>

      {/* Table Header */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1.2fr 1fr auto",
        gap: "0.5rem",
        marginBottom: "0.5rem"
      }}>
        {["Subject", "Grade", "Credits", ""].map((h, i) => (
          <span key={i} style={{
            fontSize: "0.7rem",
            color: "#64748b",
            textTransform: "uppercase"
          }}>
            {h}
          </span>
        ))}
      </div>

      {/* Subjects */}
      {subjects.map((sub, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.2fr 1fr auto",
            gap: "0.5rem",
            marginBottom: "0.6rem",
            alignItems: "center"
          }}
        >
          <input
            placeholder="Subject"
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
              <option key={g} value={g}>
                {g} ({gradePoints[g]})
              </option>
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
              background: "transparent",
              border: "none",
              color: "#ef4444",
              cursor: subjects.length === 1 ? "not-allowed" : "pointer",
              opacity: subjects.length === 1 ? 0.3 : 1
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </motion.div>
      ))}

      {/* Buttons */}
      <div style={{ display: "flex", gap: "0.8rem", marginTop: "1rem", marginBottom: "1.5rem" }}>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={addSubject}
          style={{
            flex: 1,
            padding: "0.7rem",
            borderRadius: 10,
            background: "rgba(15,23,42,0.8)",
            border: "1px solid #1e293b",
            color: "#93c5fd",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem"
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Subject
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={calculate}
          style={{
            flex: 1,
            padding: "0.7rem",
            borderRadius: 10,
            background: "linear-gradient(135deg, #2563eb, #3b82f6)",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(59,130,246,0.3)",
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem"
          }}
        >
          <FontAwesomeIcon icon={faCalculator} />
          Calculate
        </motion.button>

      </div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              borderRadius: 16,
              padding: "1.4rem",
              background: "rgba(15,23,42,0.85)",
              border: "1px solid rgba(59,130,246,0.2)"
            }}
          >

            {/* CGPA Highlight */}
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                YOUR CGPA
              </div>

              <div style={{
                fontSize: "3rem",
                fontWeight: 800,
                color: cgpaColor(result.cgpa)
              }}>
                {result.cgpa}
              </div>

              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                Total Credits: {result.totalCredits}
              </div>
            </div>

            {/* Breakdown */}
            <div style={{ borderTop: "1px solid #1e293b", paddingTop: "0.8rem" }}>
              {result.breakdown.map((sub, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.4rem 0",
                  fontSize: "0.85rem",
                  color: "#94a3b8"
                }}>
                  <span>{sub.name || `Subject ${i + 1}`}</span>
                  <span style={{ color: "#e2e8f0" }}>
                    {sub.grade} · {sub.credits}cr · {sub.gp}
                  </span>
                </div>
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}