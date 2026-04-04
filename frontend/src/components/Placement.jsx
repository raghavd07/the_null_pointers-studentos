import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Placement() {
  const [form, setForm] = useState({
    cgpa: "",
    backlogs: "0",
    internships: "0",
    projects: "0",
    skills: "",
    certifications: "0",
    targetRole: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "100%", padding: "0.6rem 0.8rem", borderRadius: 8,
    background: "#0f172a", border: "1px solid #1e3a5f",
    color: "#e2e8f0", fontSize: "0.9rem", outline: "none",
    boxSizing: "border-box",
  };

  const analyze = async () => {
    setLoading(true);
    setResult(null);

    const cgpa = parseFloat(form.cgpa);
    const backlogs = parseInt(form.backlogs);
    const internships = parseInt(form.internships);
    const projects = parseInt(form.projects);
    const certifications = parseInt(form.certifications);

    // Rule-based score
    let score = 0;
    if (cgpa >= 8.5) score += 30;
    else if (cgpa >= 7.5) score += 22;
    else if (cgpa >= 6.5) score += 14;
    else score += 5;

    if (backlogs === 0) score += 20;
    else if (backlogs <= 2) score += 10;

    score += Math.min(internships * 12, 24);
    score += Math.min(projects * 6, 18);
    score += Math.min(certifications * 4, 12);

    const skillList = form.skills.split(",").map(s => s.trim()).filter(Boolean);
    score += Math.min(skillList.length * 2, 10);
    score = Math.min(score, 100);

    let readiness;
    if (score >= 75) readiness = "HIGH";
    else if (score >= 50) readiness = "MODERATE";
    else readiness = "LOW";

    const data = {
      ...form, score, readiness, skillList,
      cgpa, backlogs, internships, projects, certifications,
    };
    localStorage.setItem("studentos_placement", JSON.stringify(data));

    // Groq AI suggestion
    let aiSuggestion = "";
    try {
      const res = await fetch("http://localhost:5000/analyze-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cgpa, backlogs, internships, projects,
          skills: skillList, certifications,
          targetRole: form.targetRole,
        }),
      });
      const json = await res.json();
      aiSuggestion = json.suggestion || json.message || "";
    } catch (e) {
      aiSuggestion = "AI insight unavailable. Check backend connection.";
    }

    setResult({ ...data, aiSuggestion });
    setLoading(false);
  };

  const colors = { HIGH: "#22c55e", MODERATE: "#f59e0b", LOW: "#ef4444" };
  const bgs = { HIGH: "rgba(34,197,94,0.08)", MODERATE: "rgba(245,158,11,0.08)", LOW: "rgba(239,68,68,0.08)" };

  const fields = [
    { label: "CGPA", key: "cgpa", placeholder: "e.g. 8.2" },
    { label: "Active Backlogs", key: "backlogs", placeholder: "0" },
    { label: "Internships Done", key: "internships", placeholder: "0" },
    { label: "Projects Built", key: "projects", placeholder: "0" },
    { label: "Certifications", key: "certifications", placeholder: "0" },
  ];

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "1.5rem 0" }}>
      <h2 style={{ color: "#93c5fd", fontWeight: 700, fontSize: "1.3rem", marginBottom: "1.5rem" }}>
        💼 Placement Readiness
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        {fields.map(({ label, key, placeholder }) => (
          <div key={key}>
            <label style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block", marginBottom: 4 }}>{label}</label>
            <input
              type="number"
              placeholder={placeholder}
              value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              style={inputStyle}
            />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block", marginBottom: 4 }}>
          Skills (comma separated)
        </label>
        <input
          type="text"
          placeholder="e.g. React, Python, SQL"
          value={form.skills}
          onChange={e => setForm(f => ({ ...f, skills: e.target.value }))}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block", marginBottom: 4 }}>
          Target Role (optional)
        </label>
        <input
          type="text"
          placeholder="e.g. SDE, Data Analyst"
          value={form.targetRole}
          onChange={e => setForm(f => ({ ...f, targetRole: e.target.value }))}
          style={inputStyle}
        />
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={analyze}
        disabled={loading}
        style={{
          width: "100%", padding: "0.75rem", borderRadius: 8,
          background: loading ? "#1e3a5f" : "linear-gradient(135deg, #1d4ed8, #2563eb)",
          color: "#fff", fontWeight: 600, border: "none",
          cursor: loading ? "not-allowed" : "pointer", fontSize: "0.95rem",
          marginBottom: "1.5rem",
        }}
      >
        {loading ? "Analyzing with AI..." : "Analyze Readiness"}
      </motion.button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {/* Score card */}
            <div style={{
              borderRadius: 12, padding: "1.25rem", marginBottom: "1rem",
              background: bgs[result.readiness],
              border: `1px solid ${colors[result.readiness]}33`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{
                  background: colors[result.readiness], color: "#000",
                  fontWeight: 700, fontSize: "0.7rem", padding: "2px 10px",
                  borderRadius: 99, letterSpacing: 1,
                }}>
                  {result.readiness} READINESS
                </span>
                <span style={{ color: colors[result.readiness], fontWeight: 800, fontSize: "1.5rem" }}>
                  {result.score}/100
                </span>
              </div>

              {/* Score bar */}
              <div style={{ background: "#0f172a", borderRadius: 99, height: 8, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.score}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ height: "100%", background: colors[result.readiness], borderRadius: 99 }}
                />
              </div>
            </div>

            {/* AI Suggestion */}
            {result.aiSuggestion && (
              <div style={{
                borderRadius: 12, padding: "1.25rem",
                background: "rgba(15,23,42,0.9)", border: "1px solid #1e3a5f",
              }}>
                <div style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: "0.6rem", letterSpacing: 1 }}>
                  ✨ AI INSIGHT (GROQ)
                </div>
                <p style={{ color: "#cbd5e1", fontSize: "0.88rem", lineHeight: 1.65, margin: 0 }}>
                  {result.aiSuggestion}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}