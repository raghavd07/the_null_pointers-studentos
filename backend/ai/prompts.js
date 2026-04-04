function buildAnalysisPrompt(studentData, logicResult) {
  const {
    attendance = {},
    cgpa = {},
    stress = {},
    dailyPerformanceScore = 0,
    placementReadiness = "UNKNOWN",
  } = logicResult || {};

  return `
You are StudentOS, an intelligent academic advisor for college students in India.
You have already received computed data from the logic engine. Do NOT make up numbers.
Use ONLY the data provided below to generate insights.

== STUDENT PROFILE ==
Name: ${studentData?.name || "Student"}
Semester: ${studentData?.semester ?? "N/A"}
Days to Exam: ${studentData?.daysToExam ?? "N/A"}

== ATTENDANCE ==
Current: ${attendance.currentPercentage ?? "N/A"}%
Target: ${attendance.targetAttendance ?? "N/A"}%
Status: ${attendance.status ?? "N/A"}
System Message: ${attendance.message ?? "N/A"}

== ACADEMICS ==
Projected CGPA: ${cgpa.projectedCGPA ?? "N/A"}
Total Credits: ${cgpa.totalCredits ?? "N/A"}
Backlog Risk: ${cgpa.backlogRisk ?? "N/A"}
Failing Subjects: ${cgpa.failingSubjects ?? 0}

== LIFESTYLE ==
Study Hours/Day: ${studentData?.studyHoursPerDay ?? "N/A"}
Sleep Hours/Day: ${studentData?.sleepHoursPerDay ?? "N/A"}

== STRESS ANALYSIS ==
Stress Score: ${stress.stressScore ?? "N/A"}/100
Stress Level: ${stress.stressLevel ?? "N/A"}
Burnout Risk: ${stress.burnoutRisk ?? "N/A"}
Key Factors: ${(stress.stressFactors || []).join(', ') || "None"}

== PERFORMANCE ==
Daily Performance Score: ${dailyPerformanceScore}/100
Placement Readiness: ${placementReadiness}

== YOUR TASK ==
Write a short, honest, personalized academic report for this student.

Structure your response in exactly this format:

OVERVIEW:
(2-3 sentences summarizing their current academic situation)

RISKS:
(bullet points of the top concerns right now)

RECOMMENDATIONS:
(3-5 actionable steps they should take this week)

MOTIVATION:
(1 sentence — honest but encouraging)

Keep the tone direct, like a mentor. Not robotic. Not overly positive.
`.trim();
}


function buildStudyPlanPrompt(studentData, logicResult) {
  const { cgpa = {}, stress = {} } = logicResult || {};

  // ✅ SAFE SUBJECT HANDLING (fixes your crash)
  const subjectsText =
    studentData?.subjects?.length
      ? studentData.subjects
          .map(s => `${s.name} (${s.expectedGrade})`)
          .join(', ')
      : "No subject data available";

  return `
You are StudentOS. Generate a realistic 7-day study plan for this student.

== CONTEXT ==
Days to Exam: ${studentData?.daysToExam ?? "N/A"}
Study Hours Available Per Day: ${studentData?.studyHoursPerDay ?? "N/A"}
Stress Level: ${stress.stressLevel ?? "N/A"}
Projected CGPA: ${cgpa.projectedCGPA ?? "N/A"}
Subjects: ${subjectsText}

== RULES ==
- Prioritize subjects where expected grade is low (C or F)
- Include breaks and sleep reminders
- Be realistic, not perfect
- Format as Day 1, Day 2... Day 7
- Each day should have morning, afternoon, evening slots

Keep it concise and actionable.
`.trim();
}

module.exports = { buildAnalysisPrompt, buildStudyPlanPrompt };