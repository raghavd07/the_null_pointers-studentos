import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sleepiness() {
  const [form, setForm] = useState({
    sleepHours: "",
    studyHours: "",
    screenTime: "",
    caffeineIntake: "0",
    exercised: "no",
    mood: "neutral",
  });
  const [result, setResult] = useState(null);

  const inputStyle = {
    width: "100%", padding: "0.6rem 0.8rem", borderRadius: 8,
    background: "#0f172a", border: "1px solid #1e3a5f",
    color: "#e2e8f0", fontSize: "0.9rem", outline: "none",
    boxSizing: "border-box",
  };

  const analyze = () => {
    const sleep = parseFloat(form.sleepHours);
    const study = parseFloat(form.studyHours);
    const screen = parseFloat(form.screenTime);
    const caffeine = parseInt(form.caffeineIntake);
    const exercised = form.exercised === "yes";

    if (isNaN(sleep) || isNaN(study) || isNaN(screen)) return;

    // Stress/sleepiness score
    let score = 0;

    if (sleep < 5) score += 35;
    else if (sleep < 6) score += 25;
    else if (sleep < 7) score += 15;
    else if (sleep >= 8) score -= 10;

    if (study > 10) score += 20;
    else if (study > 7) score += 12;
    else if (study > 5) score += 6;

    if (screen > 6) score += 15;
    else if (screen > 4) score += 8;

    score += Math.min(caffeine * 5, 20);
    if (exercised) score -= 15;

    if (form.mood === "anxious") score += 10;
    else if (form.mood === "tired") score += 8;
    else if (form.mood === "good") score -= 5;

    score = Math.max(0, Math.min(100, score));

    let level, emoji, advice;
    if (score >= 70) {
      level = "BURNOUT RISK";
      emoji = "🔴";
      advice = "You're running on fumes. Sleep is non-negotiable — aim for 7–8 hrs tonight. Drop screen time and take breaks every 45 mins.";
    } else if (score >= 45) {
      level = "FATIGUED";
      emoji = "🟡";
      advice = "You're pushing it. Try a 20-min nap, reduce caffeine after 3pm, and get off screens an hour before bed.";
    } else {
      level = "WELL RESTED";
      emoji = "🟢";
      advice = "You're in good shape! Keep the sleep schedule consistent and stay hydrated.";
    }

    const data = { ...form, score, level, advice, sleep, study, screen, caffeine, exercised };
    localStorage.setItem("studentos_sleepiness", JSON.stringify(data));
    setResult(data);
  };

  const colors = { "BURNOUT RISK": "#ef4444", "FATIGUED": "#f59e0b", "WELL RESTED": "#22c55e" };
  const bgs = { "BURNOUT RISK": "rgba(239,68,68,0.08)", "FATIGUED": "rgba(245,158,11,0.08)", "WELL RESTED": "rgba(34,197,94,0.08)" };

  return (
    <div style={{ maxWidth: 540, margin: "0 auto", padding: "1.5rem 0" }}>
      <h2 style={{ color: "#93c5fd", fontWeight: 700, fontSize: "1.3rem", marginBottom: "1.5rem" }}>
        😴 Sleepiness & Stress Check
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        {[
          { label: "Sleep Hours (last night)", key: "sleepHours", placeholder: "e.g. 6" },
          { label: "Study Hours (today)", key: "studyHours", placeholder: "e.g. 5" },
          { label: "Screen Time (hrs)", key: "screenTime", placeholder: "e.g. 4" },
          { label: "Coffees / Energy Drinks", key: "caffeineIntake", placeholder: "0" },
        ].map(({ label, key, placeholder }) => (
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

      {/* Exercised */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block", marginBottom: 6 }}>
          Did you exercise today?
        </label>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {["yes", "no"].map(opt => (
            <button
              key={opt}
              onClick={() => setForm(f => ({ ...f, exercised: opt }))}
              style={{
                flex: 1, padding: "0.55rem", borderRadius: 8,
                background: form.exercised === opt ? "#1d4ed8" : "#0f172a",
                border: `1px solid ${form.exercised === opt ? "#3b82f6" : "#1e3a5f"}`,
                color: form.exercised === opt ? "#fff" : "#94a3b8",
                fontWeight: 600, cursor: "pointer", fontSize: "0.85rem",
                textTransform: "capitalize",
              }}
            >
              {opt === "yes" ? "✅ Yes" : "❌ No"}
            </button>
          ))}
        </div>
      </div>

      {/* Mood */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block", marginBottom: 6 }}>
          Current Mood
        </label>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {[
            { val: "good", label: "😊 Good" },
            { val: "neutral", label: "😐 Neutral" },
            { val: "tired", label: "😩 Tired" },
            { val: "anxious", label: "😰 Anxious" },
          ].map(({ val, label }) => (
            <button
              key={val}
              onClick={() => setForm(f => ({ ...f, mood: val }))}
              style={{
                flex: 1, minWidth: "calc(50% - 0.25rem)", padding: "0.5rem",
                borderRadius: 8,
                background: form.mood === val ? "#1d4ed8" : "#0f172a",
                border: `1px solid ${form.mood === val ? "#3b82f6" : "#1e3a5f"}`,
                color: form.mood === val ? "#fff" : "#94a3b8",
                fontWeight: 500, cursor: "pointer", fontSize: "0.82rem",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={analyze}
        style={{
          width: "100%", padding: "0.75rem", borderRadius: 8,
          background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
          color: "#fff", fontWeight: 600, border: "none",
          cursor: "pointer", fontSize: "0.95rem", marginBottom: "1.5rem",
        }}
      >
        Check My Status
      </motion.button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              borderRadius: 12, padding: "1.25rem",
              background: bgs[result.level],
              border: `1px solid ${colors[result.level]}33`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{
                background: colors[result.level], color: "#000",
                fontWeight: 700, fontSize: "0.7rem", padding: "2px 10px",
                borderRadius: 99, letterSpacing: 1,
              }}>
                {result.level}
              </span>
              <span style={{ color: colors[result.level], fontWeight: 800, fontSize: "1.4rem" }}>
                {result.score}/100
              </span>
            </div>

            {/* Score bar */}
            <div style={{ background: "#0f172a", borderRadius: 99, height: 8, overflow: "hidden", marginBottom: "1rem" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.score}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ height: "100%", background: colors[result.level], borderRadius: 99 }}
              />
            </div>

            <p style={{ color: "#cbd5e1", fontSize: "0.88rem", lineHeight: 1.65, margin: 0 }}>
              {result.advice}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}