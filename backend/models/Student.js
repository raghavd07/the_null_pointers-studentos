const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  credits: { type: Number, required: true, min: 1, max: 6 },
  expectedGrade: {
    type: String,
    enum: ['S','A','B','C','D','E','P','F'],
    default: 'B'
  },
});

const StudentSchema = new mongoose.Schema({
  name: { type: String, default: 'Student' },
  studentId: { type: String, required: true, unique:true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  semester: { type: Number, min: 1, max: 8 },

  attendedClasses: { type: Number, default: 0, min: 0 },
totalClasses: { type: Number, default: 0, min: 0 },
  targetAttendance: { type: Number, default: 75 },

  subjects: [SubjectSchema],
  studyHoursPerDay: { type: Number, min: 0, max: 24 },

  sleepHoursPerDay: { type: Number, min: 0, max: 24 },
  daysToExam: { type: Number, min: 0 },

  monthlyExpenses: { type: Number, default: 0 },
  monthlyBudget: { type: Number, default: 0 },

  skillsScore: { type: Number, min: 0, max: 100, default: 0 },

  computedScores: {
    stressScore: Number,
    burnoutRisk: String,
    cgpaProjection: Number,
    backlogRisk: String,
    dailyPerformanceScore: Number,
    placementReadiness: String,
    attendanceStatus: String,
    attendanceMessage: String,
  },

  lastAIInsight: {
    insight: String,
    studyPlan: String,
    generatedAt: Date,
  },

}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);