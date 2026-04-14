const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Groq = require("groq-sdk");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ✅ Safe JSON parser (prevents crashes)
function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Invalid AI response");
  }
}

// ✅ AI Function
async function analyzeWithAI(resumeText, jobDesc) {
  const prompt = `
You are a STRICT ATS resume evaluator.

IMPORTANT RULES:
- DO NOT give generic scores
- Scores MUST vary based on actual resume quality
- Penalize missing sections heavily
- Penalize lack of metrics (numbers, impact)
- Penalize poor formatting or missing keywords
- Reward strong action verbs and quantified achievements

SCORING LOGIC:
- Below average resume → score < 60
- Average resume → 60–75
- Strong resume → 75–90
- Exceptional → 90+

Return ONLY JSON:

{
  "score": number,
  "grade": "A|B|C|D|F",
  "summary": "2-3 line honest evaluation",
  "category_scores": {
    "keyword_match": number,
    "formatting": number,
    "content_quality": number,
    "impact_metrics": number,
    "ats_readability": number
  },
  "strengths": [],
  "suggestions": []
}

Resume:
${resumeText}

Job Description:
${jobDesc || "Not provided"}
`;

  const response = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [{ role: "user", content: prompt }],
  temperature: 0.5,
  max_tokens: 1500
});

  let text = response.choices[0].message.content;

  // Clean markdown if present
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  return safeParse(text);
}

// ✅ TEXT API
router.post("/", async (req, res) => {
  try {
    const { resumeText, jobDesc } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: "Resume text missing" });
    }

    const analysis = await analyzeWithAI(resumeText, jobDesc);
    res.json(analysis);
  } catch (err) {
    console.error("ANALYSIS ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ FILE UPLOAD API
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const jobDesc = req.body.jobDesc;
    let resumeText = "";

    if (req.file) {
      const pdfData = await pdfParse(req.file.buffer);
      resumeText = pdfData.text;
    } else if (req.body.resumeText) {
      resumeText = req.body.resumeText;
    }

    if (!resumeText.trim()) {
      return res.status(400).json({ error: "Resume missing" });
    }

    const analysis = await analyzeWithAI(resumeText, jobDesc);
    res.json(analysis);
  } catch (err) {
    console.error("UPLOAD ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;