const express = require('express');
const router = express.Router();
const groq = require('../ai/groqClient');

router.post('/', async (req, res) => {
  try {
    const { message, context } = req.body;

    const systemPrompt = `
You are StudentOS, an AI placement mentor.

Write a short, natural paragraph (9 lines max) explaining:
- current placement readiness
- key strengths
- key weaknesses
- what the student should do next
- in a personal touching emotion
- something the student cannot analyse by themself
- give suggestions and tricks, which student might consider
- Suggest some realtime projects on basis of their skills.
- Suggest additional skills to be learnt, and suggest participation in hackathons and competitions(if skills are good enough) and the importance of the participations

RULES:
- Write like a mentor, not a report
- No headings (NO SUMMARY, NO BULLETS)
- No markdown symbols (*, -)
- Keep it under 100 words
- Keep it clear and direct

${context ? `Student context: ${JSON.stringify(context)}` : ''}
`.trim();
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message || "Give placement advice." },
      ],
      temperature: 0.5, // 🔥 slightly lower = more controlled output
      max_tokens: 200,  // 🔥 prevents long essays
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