import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStudent } from '../context/StudentContext'

export default function Onboarding({ onStart }) {
  const { updateStudent, studentData } = useStudent()
  const [step, setStep] = useState(0)
  const [subjectInput, setSubjectInput] = useState({ name: '', credits: 3, expectedGrade: 'B' })

  const steps = ['Basic Info', 'Attendance', 'Academics', 'Lifestyle']

  function addSubject() {
    if (!subjectInput.name) return
    updateStudent({ subjects: [...studentData.subjects, subjectInput] })
    setSubjectInput({ name: '', credits: 3, expectedGrade: 'B' })
  }

  function removeSubject(index) {
    updateStudent({ subjects: studentData.subjects.filter((_, i) => i !== index) })
  }

  return (
    <div className="onboarding">
      <motion.div
        className="onboarding-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="onboarding-header">
          <h1>StudentOS</h1>
          <p>Your Academic Intelligence System</p>
          <div className="steps">
            {steps.map((s, i) => (
              <div key={i} className={`step-dot ${i === step ? 'active' : i < step ? 'done' : ''}`} />
            ))}
          </div>
          <p className="step-label">{steps[step]}</p>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="step-content"
        >
          {step === 0 && (
            <div className="fields">
              <label>Your Name</label>
              <input value={studentData.name} onChange={e => updateStudent({ name: e.target.value })} placeholder="e.g. Arjun" />
              <label>Semester</label>
              <input type="number" min={1} max={8} value={studentData.semester} onChange={e => updateStudent({ semester: +e.target.value })} />
              <label>Skills Score (0-100)</label>
              <input type="number" min={0} max={100} value={studentData.skillsScore} onChange={e => updateStudent({ skillsScore: +e.target.value })} />
            </div>
          )}

          {step === 1 && (
            <div className="fields">
              <label>Classes Attended</label>
              <input type="number" min={0} value={studentData.attendedClasses} onChange={e => updateStudent({ attendedClasses: +e.target.value })} />
              <label>Total Classes Held</label>
              <input type="number" min={0} value={studentData.totalClasses} onChange={e => updateStudent({ totalClasses: +e.target.value })} />
              <label>Target Attendance (%)</label>
              <input type="number" min={50} max={100} value={studentData.targetAttendance} onChange={e => updateStudent({ targetAttendance: +e.target.value })} />
            </div>
          )}

          {step === 2 && (
            <div className="fields">
              <label>Add Subjects</label>
              <div className="subject-row">
                <input placeholder="Subject name" value={subjectInput.name} onChange={e => setSubjectInput({ ...subjectInput, name: e.target.value })} />
                <input type="number" min={1} max={6} placeholder="Credits" value={subjectInput.credits} onChange={e => setSubjectInput({ ...subjectInput, credits: +e.target.value })} />
                <select value={subjectInput.expectedGrade} onChange={e => setSubjectInput({ ...subjectInput, expectedGrade: e.target.value })}>
                  {['O', 'A+', 'A', 'B+', 'B', 'C', 'F'].map(g => <option key={g}>{g}</option>)}
                </select>
                <button onClick={addSubject}>Add</button>
              </div>
              <div className="subject-list">
                {studentData.subjects.map((s, i) => (
                  <div key={i} className="subject-tag">
                    {s.name} · {s.credits}cr · {s.expectedGrade}
                    <span onClick={() => removeSubject(i)}>✕</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="fields">
              <label>Study Hours/Day</label>
              <input type="number" min={0} max={24} value={studentData.studyHoursPerDay} onChange={e => updateStudent({ studyHoursPerDay: +e.target.value })} />
              <label>Sleep Hours/Day</label>
              <input type="number" min={0} max={24} value={studentData.sleepHoursPerDay} onChange={e => updateStudent({ sleepHoursPerDay: +e.target.value })} />
              <label>Days to Next Exam</label>
              <input type="number" min={0} value={studentData.daysToExam} onChange={e => updateStudent({ daysToExam: +e.target.value })} />
            </div>
          )}
        </motion.div>

        <div className="onboarding-nav">
          {step > 0 && <button className="btn-secondary" onClick={() => setStep(s => s - 1)}>Back</button>}
          {step < steps.length - 1
            ? <button className="btn-primary" onClick={() => setStep(s => s + 1)}>Next</button>
            : <button className="btn-primary" onClick={onStart}>Launch Dashboard →</button>
          }
        </div>
      </motion.div>
    </div>
  )
}