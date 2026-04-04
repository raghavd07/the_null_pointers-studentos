import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getUser, clearUser } from '../utils/storage'

import Navbar from '../components/Navbar'

import Attendance from '../components/Attendance'
import CGPA from '../components/CGPA'
import Placement from '../components/Placement'
import Sleepiness from '../components/Sleepiness'
import StudyPlan from '../components/StudyPlan'

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('attendance')
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

      {/* ✅ Navbar (Topbar + Tabs moved here) */}
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

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