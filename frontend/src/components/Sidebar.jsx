import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faGraduationCap,
  faBriefcase,
  faMoon,
  faBookOpen
} from "@fortawesome/free-solid-svg-icons";

const TABS = [
  { id: "attendance", label: "Attendance", icon: faCalendarCheck },
  { id: "cgpa", label: "CGPA", icon: faGraduationCap },
  { id: "placement", label: "Placement", icon: faBriefcase },
  { id: "sleepiness", label: "Sleepiness", icon: faMoon },
  { id: "studyplan", label: "Study Plan", icon: faBookOpen },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="sidebar">

      {/* Logo */}
      <h2 style={{
        color: "#93c5fd",
        fontWeight: 800,
        marginBottom: "2rem"
      }}>
        StudentOS
      </h2>

      {/* Tabs */}
      {TABS.map(tab => {
        const isActive = activeTab === tab.id;

        return (
          <div
            key={tab.id}
            className={`sidebar-item ${isActive ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <FontAwesomeIcon icon={tab.icon} />
            {tab.label}
          </div>
        );
      })}

    </div>
  );
}