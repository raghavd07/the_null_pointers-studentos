const BASE_URL = 'http://localhost:5000'

export async function analyzeStudent(studentData) {
  const res = await fetch(`${BASE_URL}/analyze-student`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData),
  })
  return res.json()
}

export async function generatePlan(studentData) {
  const res = await fetch(`${BASE_URL}/generate-plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData),
  })
  return res.json()
}

export async function predictRisk(studentData) {
  const res = await fetch(`${BASE_URL}/predict-risk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData),
  })
  return res.json()
}

export async function chat(message, context) {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, context }),
  })
  return res.json()
}

export async function getPlacementInsight(placementData) {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Analyze this student's placement readiness and give specific advice: ${JSON.stringify(placementData)}`,
      context: placementData,
    }),
  })
  return res.json()
}