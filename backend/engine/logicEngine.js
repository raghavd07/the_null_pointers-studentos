const { analyzeAttendance } = require('./attendanceEngine');
const { predictCGPA } = require('./cgpaEngine');
const { calculateStress } = require('./stressEngine');
function runLogicEngine(studentData) {
  const {
    attendedClasses,
    totalClasses,
    targetAttendance,
    subjects,
    studyHoursPerDay,
    sleepHoursPerDay,
    daysToExam,
    skillsScore,
  } = studentData;
  const attendance = analyzeAttendance({
    attendedClasses,
    totalClasses,
    targetAttendance,
  });
  const cgpa = predictCGPA(subjects);
  const stress = calculateStress({
    studyHoursPerDay,
    sleepHoursPerDay,
    daysToExam,
    attendanceStatus: attendance.status,
  });
  const studyScore = Math.min((studyHoursPerDay / 8) * 100, 100);
  const sleepScore = sleepHoursPerDay >= 7 && sleepHoursPerDay <= 9 ? 100
    : sleepHoursPerDay >= 6 ? 70
    : sleepHoursPerDay >= 5 ? 40 : 10;
  const attendanceScore = attendance.currentPercentage ?? 0;
  const stressInverse = 100 - stress.stressScore;
  const dailyPerformanceScore = parseFloat((
    (studyScore * 0.30) +
    (sleepScore * 0.25) +
    (attendanceScore * 0.25) +
    (stressInverse * 0.20)
  ).toFixed(2));
  let placementReadiness = 'NOT READY';
  if (skillsScore >= 70 && cgpa.projectedCGPA >= 7.0) placementReadiness = 'READY';
  else if (skillsScore >= 40 || cgpa.projectedCGPA >= 6.0) placementReadiness = 'DEVELOPING';

  return {
    attendance,
    cgpa,
    stress,
    dailyPerformanceScore,
    placementReadiness,
  };
}

module.exports = { runLogicEngine };