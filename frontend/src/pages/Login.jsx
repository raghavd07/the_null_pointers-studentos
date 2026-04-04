import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faUser, faIdCard, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ name: '', studentId: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async () => {
    setError('')
    if (!form.email || !form.password) return setError('Email and password are required.')
    if (mode === 'register' && (!form.name || !form.studentId)) return setError('All fields are required.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')

    setLoading(true)
    try {
      const endpoint = mode === 'register' ? '/auth/register' : '/auth/login'
      const body = mode === 'register'
        ? { name: form.name, studentId: form.studentId, email: form.email, password: form.password }
        : { email: form.email, password: form.password }

      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()

      if (!res.ok) return setError(data.error || 'Something went wrong.')

      localStorage.setItem("studentos_user", JSON.stringify(data.user));
      localStorage.setItem("studentos_token", data.token);
      onLogin(data.user)
    } catch (e) {
      setError('Cannot reach server. Make sure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const inputRow = (icon, placeholder, key, type = 'text') => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.75rem',
      background: '#020817', border: '1px solid #1e3a5f',
      borderRadius: 10, padding: '0 1rem',
    }}
      onFocus={e => e.currentTarget.style.borderColor = '#3b82f6'}
      onBlur={e => e.currentTarget.style.borderColor = '#1e3a5f'}
    >
      <FontAwesomeIcon icon={icon} style={{ color: '#64748b', fontSize: '0.9rem', flexShrink: 0 }} />
      <input
        type={key === 'password' ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={form[key]}
        onChange={e => update(key, e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        style={{
          flex: 1, background: 'transparent', border: 'none',
          padding: '0.75rem 0', color: '#e2e8f0',
          fontSize: '0.95rem', outline: 'none',
        }}
      />
      {key === 'password' && (
        <button
          onClick={() => setShowPassword(s => !s)}
          style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0 }}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      )}
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: '#020817', padding: '1.5rem',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: '#0f172a', border: '1px solid #1e3a5f',
          borderRadius: 16, padding: '2.5rem 2rem',
          width: '100%', maxWidth: 420,
          boxShadow: '0 0 40px rgba(37,99,235,0.08)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.2rem', color: '#3b82f6', marginBottom: '0.75rem' }}>
            <FontAwesomeIcon icon={faGraduationCap} />
          </div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#e2e8f0', marginBottom: '0.25rem' }}>
            StudentOS
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
            {mode === 'login' ? 'Welcome back. Sign in to continue.' : 'Create your account to get started.'}
          </p>
        </div>

        {/* Mode toggle */}
        <div style={{
          display: 'flex', background: '#020817',
          borderRadius: 10, padding: 4,
          marginBottom: '1.5rem', border: '1px solid #1e3a5f',
        }}>
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError('') }}
              style={{
                flex: 1, padding: '0.5rem',
                borderRadius: 8, border: 'none',
                background: mode === m ? '#1d4ed8' : 'transparent',
                color: mode === m ? '#fff' : '#64748b',
                fontWeight: 600, fontSize: '0.85rem',
                cursor: 'pointer', transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}
            >
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1rem' }}>
          <AnimatePresence>
            {mode === 'register' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', overflow: 'hidden' }}
              >
                {inputRow(faUser, 'Full Name', 'name')}
                {inputRow(faIdCard, 'Student ID', 'studentId')}
              </motion.div>
            )}
          </AnimatePresence>
          {inputRow(faEnvelope, 'Email Address', 'email', 'email')}
          {inputRow(faLock, 'Password', 'password', 'password')}
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: '#ef4444', fontSize: '0.82rem', textAlign: 'center', marginBottom: '0.75rem' }}>
            {error}
          </p>
        )}

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%', padding: '0.8rem',
            borderRadius: 10,
            background: loading ? '#1e3a5f' : 'linear-gradient(135deg, #1d4ed8, #2563eb)',
            color: '#fff', fontWeight: 700,
            fontSize: '0.95rem', border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '0.25rem',
          }}
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
        </motion.button>

        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.75rem', marginTop: '1.5rem' }}>
          Your data stays on your device. No tracking.
        </p>
      </motion.div>
    </div>
  )
}