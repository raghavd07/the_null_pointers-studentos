import { motion } from 'framer-motion'
import { useStudent } from '../../context/StudentContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faBookSkull, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function CGPACard() {
  const { logicResult, loading, studentData } = useStudent()

  if (loading) return <div className="card shimmer" />
  if (!logicResult) return null

  const { cgpa } = logicResult

  const riskConfig = {
    LOW: { color: '#22c55e', label: 'Low Risk' },
    MEDIUM: { color: '#f59e0b', label: 'Medium Risk' },
    HIGH: { color: '#ef4444', label: 'High Risk' },
  }

  const config = riskConfig[cgpa.backlogRisk]

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="card-header">
        <FontAwesomeIcon icon={faGraduationCap} />
        <h3>CGPA Projection</h3>
        <span className="badge" style={{ background: config.color }}>
          {config.label}
        </span>
      </div>

      <div className="cgpa-score">
        {cgpa.projectedCGPA ?? 'N/A'}
        <span>/10</span>
      </div>

      <div className="cgpa-details">
        <div className="detail-row">
          <span>Total Credits</span>
          <strong>{cgpa.totalCredits}</strong>
        </div>
        <div className="detail-row">
          <span>Backlog Risk</span>
          <strong style={{ color: config.color }}>{cgpa.backlogRisk}</strong>
        </div>
        {cgpa.failingSubjects > 0 && (
          <div className="warning-row">
            <FontAwesomeIcon icon={faCircleExclamation} style={{ color: '#ef4444' }} />
            <span>{cgpa.failingSubjects} subject{cgpa.failingSubjects > 1 ? 's' : ''} at risk of failure</span>
          </div>
        )}
      </div>

      <div className="subject-grades">
        {studentData.subjects.map((s, i) => (
          <div key={i} className="subject-grade-row">
            <span>{s.name}</span>
            <span className="grade-badge">{s.expectedGrade}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}