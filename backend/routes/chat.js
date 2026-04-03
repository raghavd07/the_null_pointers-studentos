const express = require('express');
const router = express.Router();
const groq = require('../ai/groqClient');

router.post('/', async (req, res) => {
  try {
    const { message, context } = req.body;

    const systemPrompt = `
You are StudentOS, an AI academic advisor for college students in India.
You help with study plans, attendance decisions, exam stress, and career guidance.
Be concise, honest, and supportive. Never make up data.
${context ? `Student context: ${JSON.stringify(context)}` : ''}
    `.trim();

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 512,
    });

    res.json({
      success: true,
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error('Chat error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;