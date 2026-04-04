const KEYS = {
  user: 'studentOS_user',
  attendance: 'studentOS_attendance',
  cgpa: 'studentOS_cgpa',
  placement: 'studentOS_placement',
  sleepiness: 'studentOS_sleepiness',
}

export function saveUser(data) {
  localStorage.setItem(KEYS.user, JSON.stringify(data))
}

export function getUser() {
  const data = localStorage.getItem(KEYS.user)
  return data ? JSON.parse(data) : null
}

export function clearUser() {
  localStorage.removeItem(KEYS.user)
}

export function saveAttendance(data) {
  localStorage.setItem(KEYS.attendance, JSON.stringify(data))
}

export function getAttendance() {
  const data = localStorage.getItem(KEYS.attendance)
  return data ? JSON.parse(data) : null
}

export function saveCGPA(data) {
  localStorage.setItem(KEYS.cgpa, JSON.stringify(data))
}

export function getCGPA() {
  const data = localStorage.getItem(KEYS.cgpa)
  return data ? JSON.parse(data) : null
}

export function savePlacement(data) {
  localStorage.setItem(KEYS.placement, JSON.stringify(data))
}

export function getPlacement() {
  const data = localStorage.getItem(KEYS.placement)
  return data ? JSON.parse(data) : null
}

export function saveSleepiness(data) {
  localStorage.setItem(KEYS.sleepiness, JSON.stringify(data))
}

export function getSleepiness() {
  const data = localStorage.getItem(KEYS.sleepiness)
  return data ? JSON.parse(data) : null
}

export function getAllStudentData() {
  return {
    user: getUser(),
    attendance: getAttendance(),
    cgpa: getCGPA(),
    placement: getPlacement(),
    sleepiness: getSleepiness(),
  }
}