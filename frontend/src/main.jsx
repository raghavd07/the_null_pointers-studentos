import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StudentProvider } from './context/StudentContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentProvider>
      <App />
    </StudentProvider>
  </StrictMode>
)