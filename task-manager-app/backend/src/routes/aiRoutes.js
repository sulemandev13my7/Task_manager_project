const express = require('express');
const axios = require('axios');

const router = express.Router();
const GROQ_MODELS = [
  'openai/gpt-oss-20b',
  'llama-3.1-8b-instant',
  'llama-3.3-70b-versatile'
];

router.post('/plan-task', async (req, res) => {
  try {
    const { description } = req.body;

    if (!description || description.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Description is required'
      });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'AI API key not configured'
      });
    }

    const prompt = `You are an expert task planner. Based on the task description provided, generate a practical task plan in the following JSON format:
{
  "summary": "A short summary of the task",
  "priority": "low|medium|high",
  "estimatedHours": number,
  "steps": ["step 1", "step 2", "..."]
}

Task description: "${description}"

Return ONLY the JSON object with these exact fields. Do not include any markdown formatting or additional text.`;

    let lastError;

    for (const model of GROQ_MODELS) {
      try {
        const response = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 500
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            },
            timeout: 30000
          }
        );

        const aiResponse = response.data.choices?.[0]?.message?.content;

        if (!aiResponse) {
          throw new Error('Empty AI response');
        }

        let plan;
        try {
          const cleanedResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          plan = JSON.parse(cleanedResponse);
        } catch (parseError) {
          return res.status(500).json({
            success: false,
            message: 'Invalid AI response format'
          });
        }

        if (!plan.summary || !plan.priority || !plan.estimatedHours || !Array.isArray(plan.steps)) {
          return res.status(500).json({
            success: false,
            message: 'Invalid AI response structure'
          });
        }

        return res.status(200).json({ success: true, plan });
      } catch (error) {
        lastError = error;
        const message = error.response?.data?.error?.message || error.message;
        console.warn(`Groq model failed: ${model}`, message);
      }
    }

    throw lastError || new Error('No Groq model available');
  } catch (error) {
    console.error('AI API Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to generate AI task plan'
    });
  }
});

module.exports = router;