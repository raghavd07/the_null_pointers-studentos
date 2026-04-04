import { useState } from 'react'
import { motion } from 'framer-motion'
import { saveUser } from '../utils/storage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faUser, faIdCard } from '@fortawesome/free-solid-svg-icons'

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ name: '', studentId: '' })
  const [error, setError] = useState('')

  function handleLogin() {
    if (!form.name.trim() || !form.studentId.trim()) {
      setError('Please fill in all fields.')
      return
    }
    saveUser({ name: form.name.trim(), studentId: form.studentId.trim() })
    onLogin({ name: form.name.trim(), studentId: form.studentId.trim() })
  }

  return (
    <div className="login-page">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <div className="login-icon">
            <FontAwesomeIcon icon={faGraduationCap} />
          </div>
          <h1>StudentOS</h1>
          <p>Your Academic Intelligence System</p>
        </div>

        <div className="login-fields">
          <div className="input-group">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div className="input-group">
            <FontAwesomeIcon icon={faIdCard} className="input-icon" />
            <input
              type="text"
              placeholder="Student ID"
              value={form.studentId}
              onChange={e => setForm({ ...form, studentId: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <motion.button
            className="login-btn"
            onClick={handleLogin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Enter Dashboard →
          </motion.button>
        </div>

        <p className="login-note">No password needed. Your data stays on your device.</p>
      </motion.div>
    </div>
  )
}