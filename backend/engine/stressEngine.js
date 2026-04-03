function calculateStress({ studyHoursPerDay, sleepHoursPerDay, daysToExam, attendanceStatus }) {
  let score = 0;
  const factors = [];
  if (sleepHoursPerDay < 5) {
    score += 30;
    factors.push('Severe sleep deprivation');
  } else if (sleepHoursPerDay < 7) {
    score += 15;
    factors.push('Insufficient sleep');
  } else if (sleepHoursPerDay > 9) {
    score += 5;
    factors.push('Oversleeping (possible burnout sign)');
  }
  if (daysToExam <= 3) {
    score += 25;
    factors.push('Exam in 3 days or less');
  } else if (daysToExam <= 7) {
    score += 15;
    factors.push('Exam week approaching');
  } else if (daysToExam <= 14) {
    score += 8;
    factors.push('Exam in 2 weeks');
  }
  if (daysToExam <= 7 && studyHoursPerDay < 4) {
    score += 20;
    factors.push('Low study hours with exam approaching');
  } else if (studyHoursPerDay > 12) {
    score += 20;
    factors.push('Burnout risk from over-studying');
  } else if (studyHoursPerDay < 2) {
    score += 10;
    factors.push('Very low study hours');
  }
  if (attendanceStatus === 'CRITICAL') {
    score += 20;
    factors.push('Critical attendance status');
  } else if (attendanceStatus === 'WARNING') {
    score += 10;
    factors.push('Attendance near danger threshold');
  }
  score = Math.min(score, 100);
  let burnoutRisk = 'LOW';
  if (score >= 70) burnoutRisk = 'HIGH';
  else if (score >= 40) burnoutRisk = 'MEDIUM';
  return {
    stressScore: score,
    stressLevel: score >= 70 ? 'HIGH' : score >= 40 ? 'MODERATE' : 'LOW',
    burnoutRisk,
    stressFactors: factors,
  };
}

module.exports = { calculateStress };