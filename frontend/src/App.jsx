import { useState } from 'react'
import { getUser } from './utils/storage'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!getUser())

  return loggedIn
    ? <Dashboard onLogout={() => setLoggedIn(false)} />
    : <Login onLogin={() => setLoggedIn(true)} />
}