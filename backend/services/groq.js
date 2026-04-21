const Groq = require('groq-sdk')
require('dotenv').config()

const client = new Groq({ apiKey: process.env.GROQ_API_KEY })

async function analyseCV(cvText, jdText) {
  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a technical recruiter. Analyse the CV against the job description and return a JSON object only — no preamble, no markdown, no explanation.

The JSON must follow this exact shape:
{
  "match_score": <number 0-100>,
  "matched_skills": [<string>, ...],
  "missing_skills": [<string>, ...],
  "recommendations": [<string>, ...]
}

JOB DESCRIPTION:
${jdText}

CV:
${cvText}`
      }
    ]
  })

  const raw = response.choices[0].message.content
  return JSON.parse(raw)
}

module.exports = { analyseCV }