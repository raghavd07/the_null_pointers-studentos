import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStudent } from '../context/StudentContext'
import { analyzeStudent, predictRisk } from '../utils/api'
import AttendanceCard from '../components/modules/AttendanceCard'
import StressCard from '../components/modules/StressCard'
import CGPACard from '../components/modules/CGPACard'
import AIInsightCard from '../components/modules/AIInsightCard'
import PerformanceCard from '../components/modules/PerformanceCard'

export default function Dashboard() {
  const { studentData, logicResult, setLogicResult, aiInsight, setAiInsight, setLoading } = useStudent()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [analyzeRes, riskRes] = await Promise.all([
          analyzeStudent(studentData),
          predictRisk(studentData),
        ])
        if (analyzeRes.success) {
          setLogicResult(analyzeRes.logicResult)
          setAiInsight(analyzeRes.aiInsight)
        }
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome back, {studentData.name} 👋
        </motion.h1>
        <p>Semester {studentData.semester} · {studentData.daysToExam} days to exam</p>
      </div>

      <div className="dashboard-grid">
        <AttendanceCard />
        <StressCard />
        <CGPACard />
        <PerformanceCard />
        <AIInsightCard />
      </div>
    </div>
  )
}