const GRADE_POINTS = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'F': 0
};

function predictCGPA(subjects) {
  if (!subjects || subjects.length === 0) {
    return {
      projectedCGPA: null,
      totalCredits: 0,
      backlogRisk: 'LOW',
      failingSubjects: 0,
    };
  }

  let totalWeightedPoints = 0;
  let totalCredits = 0;
  let failCount = 0;

  subjects.forEach(subject => {
    const gp = GRADE_POINTS[subject.expectedGrade] ?? 6;
    totalWeightedPoints += gp * subject.credits;
    totalCredits += subject.credits;
    if (subject.expectedGrade === 'F') failCount++;
  });

  const cgpa = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;
  let backlogRisk = 'LOW';
  if (failCount >= 2) backlogRisk = 'HIGH';
  else if (failCount === 1 || cgpa < 5.5) backlogRisk = 'MEDIUM';
  return {
    projectedCGPA: parseFloat(cgpa.toFixed(2)),
    totalCredits,
    backlogRisk,
    failingSubjects: failCount,
  };
}
module.exports = { predictCGPA };