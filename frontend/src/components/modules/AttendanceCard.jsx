import { motion } from 'framer-motion'
import { useStudent } from '../../context/StudentContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faTriangleExclamation, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

export default function AttendanceCard() {
  const { logicResult, loading } = useStudent()

  if (loading) return <div className="card shimmer" />
  if (!logicResult) return null

  const { attendance } = logicResult

  const statusConfig = {
    SAFE: { color: '#22c55e', icon: faCircleCheck, label: 'Safe' },
    WARNING: { color: '#f59e0b', icon: faTriangleExclamation, label: 'Warning' },
    CRITICAL: { color: '#ef4444', icon: faCircleXmark, label: 'Critical' },
  }

  const config = statusConfig[attendance.status]

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card-header">
        <FontAwesomeIcon icon={faCalendarCheck} />
        <h3>Attendance</h3>
        <span className="badge" style={{ background: config.color }}>
          <FontAwesomeIcon icon={config.icon} /> {config.label}
        </span>
      </div>

      <div className="attendance-percentage">
        {attendance.currentPercentage}%
      </div>

      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          style={{ background: config.color }}
          initial={{ width: 0 }}
          animate={{ width: `${attendance.currentPercentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      <p className="target-line">Target: {attendance.targetAttendance}%</p>
      <p className="attendance-message">{attendance.message}</p>
    </motion.div>
  )
}