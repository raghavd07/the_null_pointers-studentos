import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faFaceSmile,
  faFaceMeh,
  faFaceTired,
  faFaceFrown,
  faCircleCheck,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";

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
    width: "100%",
    padding: "0.6rem 0.8rem",
    borderRadius: 8,
    background: "#0f172a",
    border: "1px solid #1e3a5f",
    color: "#e2e8f0",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
  };

  const analyze = () => {
    const sleep = parseFloat(form.sleepHours);
    const study = parseFloat(form.studyHours);
    const screen = parseFloat(form.screenTime);
    const caffeine = parseInt(form.caffeineIntake);
    const exercised = form.exercised === "yes";

    if (isNaN(sleep) || isNaN(study) || isNaN(screen)) return;

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

    let level, advice;
    if (score >= 70) {
      level = "BURNOUT RISK";
      advice = "You're running on fumes. Sleep is non-negotiable — aim for 7–8 hrs tonight. Reduce screen time and take breaks.";
    } else if (score >= 45) {
      level = "FATIGUED";
      advice = "You're pushing it. Try a short nap, reduce caffeine after evening, and avoid screens before sleep.";
    } else {
      level = "WELL RESTED";
      advice = "You're doing well. Maintain consistency and stay hydrated.";
    }

    const data = { ...form, score, level, advice };
    localStorage.setItem("studentos_sleepiness", JSON.stringify(data));
    setResult(data);
  };

  const colors = {
    "BURNOUT RISK": "#ef4444",
    "FATIGUED": "#f59e0b",
    "WELL RESTED": "#22c55e"
  };

  return (
    <div style={{ maxWidth: 540, margin: "0 auto", padding: "1.5rem 0" }}>

      {/* Header */}
      <h2 style={{
        color: "#93c5fd",
        fontWeight: 700,
        fontSize: "1.3rem",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      }}>
        <FontAwesomeIcon icon={faBed} style={{ color: "#60a5fa" }} />
        Sleepiness & Stress Check
      </h2>

      {/* Inputs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        {[
          { label: "Sleep Hours", key: "sleepHours" },
          { label: "Study Hours", key: "studyHours" },
          { label: "Screen Time (hrs)", key: "screenTime" },
          { label: "Caffeine Intake", key: "caffeineIntake" },
        ].map(({ label, key }) => (
          <div key={key}>
            <label style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: 4, display: "block" }}>
              {label}
            </label>
            <input
              type="number"
              value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              style={inputStyle}
            />
          </div>
        ))}
      </div>

      {/* Exercise */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: 6, display: "block" }}>
          Did you exercise today?
        </label>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          {["yes", "no"].map(opt => (
            <button
              key={opt}
              onClick={() => setForm(f => ({ ...f, exercised: opt }))}
              style={{
                flex: 1,
                padding: "0.55rem",
                borderRadius: 8,
                background: form.exercised === opt ? "#1d4ed8" : "#0f172a",
                border: "1px solid #1e3a5f",
                color: form.exercised === opt
                  ? (opt === "yes" ? "#22c55e" : "#ef4444")
                  : "#94a3b8"
              }}
            >
              <FontAwesomeIcon icon={opt === "yes" ? faCircleCheck : faCircleXmark} /> {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Mood */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: 6, display: "block" }}>
          Current Mood
        </label>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {[
            { val: "good", icon: faFaceSmile },
            { val: "neutral", icon: faFaceMeh },
            { val: "tired", icon: faFaceTired },
            { val: "anxious", icon: faFaceFrown },
          ].map(({ val, icon }) => (
            <button
              key={val}
              onClick={() => setForm(f => ({ ...f, mood: val }))}
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: 8,
                background: form.mood === val ? "#1d4ed8" : "#0f172a",
                border: "1px solid #1e3a5f",
                color: "#fff"
              }}
            >
              <FontAwesomeIcon
                icon={icon}
                style={{
                  color:
                    val === "good" ? "#22c55e" :
                    val === "neutral" ? "#94a3b8" :
                    val === "tired" ? "#f59e0b" :
                    "#ef4444"
                }}
              /> {val}
            </button>
          ))}
        </div>
      </div>

      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={analyze}
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: 8,
          background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
          color: "#fff",
          fontWeight: 600,
          border: "none",
          cursor: "pointer"
        }}
      >
        Check My Status
      </motion.button>

      {/* RESULT */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              borderRadius: 16,
              padding: "1.5rem",
              marginTop: "1.2rem",
              background: `linear-gradient(135deg, ${colors[result.level]}22, #020817)`,
              border: `1px solid ${colors[result.level]}55`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <FontAwesomeIcon icon={faBed} style={{ color: colors[result.level] }} />
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: colors[result.level] }}>
                {result.score}/100
              </div>
            </div>

            <div style={{
              height: 10,
              borderRadius: 999,
              background: "#0f172a",
              margin: "1rem 0",
              overflow: "hidden"
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.score}%` }}
                style={{
                  height: "100%",
                  background: colors[result.level]
                }}
              />
            </div>

            <div style={{
              display: "inline-block",
              background: colors[result.level],
              color: "#000",
              padding: "4px 12px",
              borderRadius: 999,
              fontWeight: 700,
              marginBottom: "0.8rem"
            }}>
              {result.level}
            </div>

            <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
              {result.advice}
            </p>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}