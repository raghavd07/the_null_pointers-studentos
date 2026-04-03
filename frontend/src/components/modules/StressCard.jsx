import { motion } from 'framer-motion'
import { useStudent } from '../../context/StudentContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain, faFire, faFaceGrimace } from '@fortawesome/free-solid-svg-icons'

export default function StressCard() {
  const { logicResult, loading } = useStudent()

  if (loading) return <div className="card shimmer" />
  if (!logicResult) return null

  const { stress } = logicResult

  const levelConfig = {
    LOW: { color: '#22c55e', label: 'Low Stress' },
    MODERATE: { color: '#f59e0b', label: 'Moderate Stress' },
    HIGH: { color: '#ef4444', label: 'High Stress' },
  }

  const config = levelConfig[stress.stressLevel]

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="card-header">
        <FontAwesomeIcon icon={faBrain} />
        <h3>Stress Level</h3>
        <span className="badge" style={{ background: config.color }}>
          {config.label}
        </span>
      </div>

      <div className="stress-score" style={{ color: config.color }}>
        {stress.stressScore}<span>/100</span>
      </div>

      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          style={{ background: config.color }}
          initial={{ width: 0 }}
          animate={{ width: `${stress.stressScore}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      <div className="burnout-row">
        <FontAwesomeIcon icon={faFire} style={{ color: '#ef4444' }} />
        <span>Burnout Risk: <strong>{stress.burnoutRisk}</strong></span>
      </div>

      <div className="factors-list">
        {stress.stressFactors.map((f, i) => (
          <div key={i} className="factor-tag">
            <FontAwesomeIcon icon={faFaceGrimace} />
            {f}
          </div>
        ))}
      </div>
    </motion.div>
  )
}