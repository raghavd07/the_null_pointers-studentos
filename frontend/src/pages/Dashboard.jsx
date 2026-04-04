import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getUser, clearUser } from '../utils/storage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarCheck, faGraduationCap, faBriefcase,
  faMoon, faBookOpen, faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
import Attendance from '../components/Attendance'
import CGPA from '../components/CGPA'
import Placement from '../components/Placement'
import Sleepiness from '../components/Sleepiness'
import StudyPlan from '../components/StudyPlan'

const TABS = [
  { id: 'attendance', label: 'Attendance', icon: faCalendarCheck },
  { id: 'cgpa', label: 'CGPA', icon: faGraduationCap },
  { id: 'placement', label: 'Placement', icon: faBriefcase },
  { id: 'sleepiness', label: 'Sleepiness', icon: faMoon },
  { id: 'studyplan', label: 'Study Plan', icon: faBookOpen },
]

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('attendance')
  const user = getUser()

  function handleLogout() {
    clearUser()
    onLogout()
  }

  const tabComponents = {
    attendance: <Attendance />,
    cgpa: <CGPA />,
    placement: <Placement />,
    sleepiness: <Sleepiness />,
    studyplan: <StudyPlan />,
  }

  return (
    <div className="dashboard-page">
      <nav className="navbar">
        <div className="navbar-left">
          <span className="navbar-logo">StudentOS</span>
          <span className="navbar-user">Hey, {user?.name} 👋</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          Logout
        </button>
      </nav>

      <div className="tabs-bar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-pill ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <FontAwesomeIcon icon={tab.icon} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-body">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {tabComponents[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}