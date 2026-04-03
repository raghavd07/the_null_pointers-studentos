import { useState } from 'react'
import { motion } from 'framer-motion'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'
import { useStudent } from './context/StudentContext'
import './App.css'

export default function App() {
  const { studentData } = useStudent()
  const [started, setStarted] = useState(false)

  return (
    <div className="app">
      {!started
        ? <Onboarding onStart={() => setStarted(true)} />
        : <Dashboard />
      }
    </div>
  )
}