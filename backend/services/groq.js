const Groq = require("groq-sdk");
require("dotenv").config();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function analyseCV(cvText, jdText) {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 1024,
    messages: [
      {
        role: "system",
        content: `You are a strict technical recruiter. You only respond with a raw JSON object. No text before or after. No markdown. No code fences. Just the JSON.

Scoring weights (total 100 points):
- Hard requirements (40 points): degree, years of experience, primary language/framework, location
  - Any hard requirement marked "Not Negotiable" or "essential" that is unmet = cap total score at 40
  -Any degree requiremt mentioned set cap score to be 40
  - An incomplete or in-progress degree counts as NOT having the degree
- Technical skills match (40 points): primary stack, secondary skills, databases, version control
  - Each missing primary technical skill = -15 points from this section
  - Do not infer skills not explicitly mentioned in the CV
- Experience quality (15 points): relevant industry experience, project complexity, career progression
- Soft skills (5 points): Agile, communication, teamwork — 5 points max
-if difference between years of experience and seniority level required is more than 2 years make score 0 and add to recommendations need more experience in the role itself

Recommendations rules:
- Always populate recommendations with at least 3 actionable suggestions
- If degree is missing or incomplete, always list completing the degree as the first recommendation
- If primary technical skills are missing, recommend specific courses or projects to build them
- Only score above 70 if the candidate meets all hard requirements`
      },
      {
        role: "user",
        content: `Analyse this CV against the job description and return ONLY this exact JSON with these exact key names — no other keys, no nested objects:
{
  "match_score": <number 0-100>,
  "matched_skills": ["skill1", "skill2"],
  "missing_skills": ["skill1", "skill2"],
  "recommendations": ["rec1", "rec2"]
}

JOB DESCRIPTION:
${jdText}

CV:
${cvText}`
      }
    ],
  });

 const raw = response.choices[0].message.content;
console.log("RAW RESPONSE:", raw);

const jsonMatch = raw.match(/\{[\s\S]*\}/g)
if (!jsonMatch) throw new Error('No JSON found in response')
const jsonStr = jsonMatch[jsonMatch.length - 1]
return JSON.parse(jsonStr)
}

module.exports = { analyseCV };