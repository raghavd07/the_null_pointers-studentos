import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getUser, clearUser } from '../utils/storage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarCheck,
  faGraduationCap,
  faBriefcase,
  faMoon,
  faBookOpen,
  faRightFromBracket
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
  const [hoveredTab, setHoveredTab] = useState(null)
  const user = getUser()

  function handleLogout() {
    clearUser()
    onLogout()
  }

  const components = {
    attendance: <Attendance />,
    cgpa: <CGPA />,
    placement: <Placement />,
    sleepiness: <Sleepiness />,
    studyplan: <StudyPlan />,
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#020817' }}>

      {/* Topbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.9rem 2rem',
        background: '#0f172a',
        borderBottom: '1px solid #1e3a5f',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#93c5fd', letterSpacing: 0.5 }}>
            StudentOS
          </h2>
          <span style={{
            fontSize: '0.8rem', color: '#64748b',
            background: '#020817', border: '1px solid #1e3a5f',
            padding: '0.25rem 0.75rem', borderRadius: 99,
          }}>
            👋 {user?.name} · {user?.studentId}
          </span>
        </div>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'transparent', border: '1px solid #1e3a5f',
            color: '#94a3b8', padding: '0.4rem 1rem',
            borderRadius: 8, fontSize: '0.85rem', cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#ef4444'
            e.currentTarget.style.color = '#ef4444'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#1e3a5f'
            e.currentTarget.style.color = '#94a3b8'
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          Logout
        </button>
      </div>

      {/* Tabs bar */}
      <div style={{
        display: 'flex', gap: '0.25rem',
        padding: '0.65rem 2rem',
        background: '#0f172a',
        borderBottom: '1px solid #1e3a5f',
        overflowX: 'auto',
      }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab.id
          const isHovered = hoveredTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.45rem 1.1rem', borderRadius: 8,
                background: isActive ? 'rgba(37,99,235,0.12)' : isHovered ? '#020817' : 'transparent',
                border: isActive ? '1px solid rgba(37,99,235,0.3)' : isHovered ? '1px solid #1e3a5f' : '1px solid transparent',
                color: isActive ? '#93c5fd' : isHovered ? '#e2e8f0' : '#64748b',
                fontSize: '0.85rem', fontWeight: isActive ? 600 : 500,
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              <FontAwesomeIcon icon={tab.icon} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {components[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}