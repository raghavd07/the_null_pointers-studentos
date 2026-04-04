import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faGraduationCap,
  faBriefcase,
  faBrain
} from "@fortawesome/free-solid-svg-icons";

export default function DashboardHome() {

  const attendance = JSON.parse(localStorage.getItem("studentos_attendance"));
  const cgpa = JSON.parse(localStorage.getItem("studentos_cgpa"));
  const placement = JSON.parse(localStorage.getItem("studentos_placement"));
  const sleep = JSON.parse(localStorage.getItem("studentos_sleepiness"));

  const stats = [
    {
      label: "Attendance",
      value: attendance?.currentPct || "--",
      suffix: "%",
      icon: faCalendarCheck,
      color: "#22c55e"
    },
    {
      label: "CGPA",
      value: cgpa?.cgpa || "--",
      suffix: "",
      icon: faGraduationCap,
      color: "#3b82f6"
    },
    {
      label: "Placement",
      value: placement?.score || "--",
      suffix: "/100",
      icon: faBriefcase,
      color: "#22c55e"
    },
    {
      label: "Stress",
      value: sleep?.score || "--",
      suffix: "/100",
      icon: faBrain,
      color: "#ef4444"
    }
  ];

  return (
    <div>

      {/* Header */}
      <h2 style={{
        fontSize: "1.4rem",
        fontWeight: 700,
        marginBottom: "1.5rem",
        color: "#93c5fd"
      }}>
        Overview
      </h2>

      {/* Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem"
      }}>

        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-card card-hover"
            style={{ padding: "1.2rem" }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5rem"
            }}>
              <FontAwesomeIcon icon={stat.icon} style={{ color: stat.color }} />
              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                {stat.label}
              </span>
            </div>

            <div style={{
              fontSize: "1.8rem",
              fontWeight: 800,
              color: stat.color
            }}>
              {stat.value}{stat.suffix}
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}