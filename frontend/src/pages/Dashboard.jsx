import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getUser, clearUser } from '../utils/storage'

import Navbar from '../components/NavBar'

import Attendance from '../components/Attendance'
import CGPA from '../components/CGPA'
import Placement from '../components/Placement'
import Sleepiness from '../components/Sleepiness'
import StudyPlan from '../components/StudyPlan'

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('attendance')
  

  const user = getUser(); // or from backend response

<Navbar
  user={user}
  activeTab={activeTab}
  setActiveTab={setActiveTab}
  onLogout={handleLogout}
/>
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#020817'
    }}>

      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* 🔥 MAIN CONTENT */}
      <div style={{
        flex: 1,
        padding: '2.5rem 2rem',
        maxWidth: '1100px',
        width: '100%',
        margin: '0 auto'
      }}>

        {/* ✨ PAGE HEADER */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: '#bfdbfe',
            marginBottom: '0.3rem'
          }}>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>

          <p style={{
            fontSize: '0.9rem',
            color: '#64748b'
          }}>
            Manage and track your academic performance.
          </p>
        </div>

        {/* 🧊 CONTENT CARD WRAPPER */}
        <div style={{
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(59,130,246,0.2)",
          borderRadius: 16,
          padding: "1.5rem",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
        }}>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              {components[activeTab]}
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </div>
  )
}