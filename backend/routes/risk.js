const express = require('express');
const router = express.Router();
const { runLogicEngine } = require('../engine/logicEngine');

router.post('/', async (req, res) => {
  try {
    const studentData = req.body;
    const logicResult = runLogicEngine(studentData);

    const { attendance, cgpa, stress, dailyPerformanceScore, placementReadiness } = logicResult;

    // Compute overall risk level
    let overallRisk = 'LOW';
    const highRiskCount = [
      attendance.status === 'CRITICAL',
      cgpa.backlogRisk === 'HIGH',
      stress.burnoutRisk === 'HIGH',
    ].filter(Boolean).length;

    if (highRiskCount >= 2) overallRisk = 'HIGH';
    else if (highRiskCount === 1 || stress.burnoutRisk === 'MEDIUM') overallRisk = 'MEDIUM';

    res.json({
      success: true,
      overallRisk,
      breakdown: {
        attendanceRisk: attendance.status,
        backlogRisk: cgpa.backlogRisk,
        burnoutRisk: stress.burnoutRisk,
        dailyPerformanceScore,
        placementReadiness,
      },
    });

  } catch (error) {
    console.error('Risk error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;