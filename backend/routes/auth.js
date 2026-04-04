const express = require('express')
const router = express.Router()
const Student = require('../models/Student')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'studentos_secret'

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, studentId, email, password } = req.body
    if (!name || !studentId || !email || !password)
      return res.status(400).json({ error: 'All fields are required.' })

    const existing = await Student.findOne({ email })
    if (existing)
      return res.status(409).json({ error: 'Email already registered.' })

    const hashed = await bcrypt.hash(password, 10)
    const student = await Student.create({ name, studentId, email, password: hashed })

    const token = jwt.sign({ id: student._id, email: student.email }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { name: student.name, studentId: student.studentId, email: student.email } })
  } catch (err) {
    console.error('REGISTER ERROR:', err)
    res.status(500).json({ error: err.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required.' })

    const student = await Student.findOne({ email })
    if (!student)
      return res.status(404).json({ error: 'No account found with this email.' })

    const match = await bcrypt.compare(password, student.password)
    if (!match)
      return res.status(401).json({ error: 'Incorrect password.' })

    const token = jwt.sign({ id: student._id, email: student.email }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { name: student.name, studentId: student.studentId, email: student.email } })
  } catch (err) {
    console.error('LOGIN ERROR:', err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router