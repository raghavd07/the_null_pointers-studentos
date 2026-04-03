const express = require('express');
const router = express.Router();
const { runLogicEngine } = require('../engine/logicEngine');
const { buildAnalysisPrompt } = require('../ai/prompts');
const groq = require('../ai/groqClient');

router.post('/', async (req, res) => {
  try {
    const studentData = req.body;

    // Step 1 — Run logic engine
    const logicResult = runLogicEngine(studentData);

    // Step 2 — Build prompt
    const prompt = buildAnalysisPrompt(studentData, logicResult);

    // Step 3 — Call Groq
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const aiInsight = completion.choices[0].message.content;

    // Step 4 — Return everything
    res.json({
      success: true,
      logicResult,
      aiInsight,
    });

  } catch (error) {
    console.error('Analyze error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;