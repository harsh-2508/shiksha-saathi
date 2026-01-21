import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import strategies from './strategies.js'; 

dotenv.config();

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Incoming ${req.method} request to ${req.url}`);
  next();
});

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// --- HELPER: ROBUST JSON PARSER ---
// This handles cases where AI adds text like "Here is your JSON:" or "Namaste!"
const cleanAndParseJSON = (text) => {
  // 1. Remove Markdown code blocks if they exist
  let clean = text.replace(/```json/g, '').replace(/```/g, '');

  // 2. Extract ONLY the JSON part (Find first '{' and last '}')
  const firstOpen = clean.indexOf('{');
  const lastClose = clean.lastIndexOf('}');

  if (firstOpen !== -1 && lastClose !== -1) {
    clean = clean.substring(firstOpen, lastClose + 1);
  }

  // 3. Parse
  return JSON.parse(clean);
};

// --- ROUTES ---

app.get('/', (req, res) => {
  res.send('ShikshaSaathi API is Running with Robust JSON Parsing!');
});

// ROUTE 1: INSTANT SUGGESTION
app.post('/suggest', async (req, res) => {
  console.log("Suggestion Request:", req.body);
  const { challenge, grade, subject } = req.body;
  
  const gradeNum = parseInt(grade);
  let gradeCategory = 'primary'; 
  if (gradeNum >= 6) gradeCategory = 'middle';
  if (gradeNum >= 9) gradeCategory = 'secondary';

  // Rule Engine Check
  // Quick snippet for index.js to pick random match
const matches = strategies.filter(s => 
  s.challenge === challenge && (s.grade === grade || s.grade === 'primary')
);

if (matches.length > 0) {
  const randomMatch = matches[Math.floor(Math.random() * matches.length)];
  return res.json(randomMatch);
}

console.log("--> Consulting Gemini AI (Slow)...");
  // AI Fallback
  if (!genAI) return res.json({ title: "Offline Mode", action: "Think-Pair-Share", why: "AI Unavailable" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
      Act as a senior teacher trainer. 
      Problem: Grade ${grade} teacher facing "${challenge}" in ${subject}.
      Task: One immediate classroom activity (under 10s setup).
      Output strictly JSON: { "title": "Strategy Name", "action": "Step-by-step instruction", "why": "One sentence reason" }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json(cleanAndParseJSON(text));

  } catch (error) {
    console.error("Suggestion Error:", error);
    res.json({ title: "Quick Discussion", action: "Ask students to discuss the topic in pairs.", why: "Fallback strategy." });
  }
});

// ROUTE 2: CHAPTER PLANNER
app.post('/chapter-plan', async (req, res) => {
  const { grade, subject, chapter, days = 3 } = req.body;
  if (!genAI) return res.status(500).json({ error: "AI unavailable" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
      Act as an Indian school teacher.
      Task: Plan chapter "${chapter}" (Grade ${grade} ${subject}) for ${days} days.
      Structure:
      - Divide topics logically.
      - Last day must be "Test/Revision".
      - Keep daily tasks under 40 mins.
      
      Output strictly JSON:
      {
        "title": "Study Plan for ${chapter}",
        "schedule": [
          { "day": 1, "topics": "List of sub-topics", "activity": "One simple activity" },
          { "day": 2, "topics": "Next sub-topics", "activity": "Activity or Homework" }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Use the robust parser
    try {
      const json = cleanAndParseJSON(text);
      res.json(json);
    } catch (parseError) {
      console.error("JSON Parse Failed:", text);
      // Send a valid fallback so frontend doesn't crash
      res.json({
        title: `Plan for ${chapter}`,
        schedule: [
          { day: 1, topics: "Introduction", activity: "Read chapter introduction" },
          { day: days, topics: "Revision", activity: "Class Test" }
        ]
      });
    }

  } catch (error) {
    console.error("Planner Error:", error);
    res.status(500).json({ error: "Failed to generate plan" });
  }
});

// ROUTE 3: ASSESSMENT
app.post('/assessment', async (req, res) => {
  const { grade, subject, topic, level, count = 5 } = req.body;
  if (!genAI) return res.status(500).json({ error: "AI Service Unavailable" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
      Create a short test for Grade ${grade} ${subject} on "${topic}".
      Difficulty: ${level}. Questions: ${count}.
      Context: Indian schools.
      
      Output strictly JSON:
      {
        "title": "${level} Test: ${topic}",
        "questions": [
          { "q": "Question text", "type": "Short Answer" }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    try {
      res.json(cleanAndParseJSON(text));
    } catch (parseError) {
      console.error("Assessment Parse Failed:", text);
      res.json({
        title: "Test Generation Failed",
        questions: [{ q: "Please try again.", type: "Error" }]
      });
    }

  } catch (error) {
    console.error("Assessment Error:", error);
    res.status(500).json({ error: "Failed to create test" });
  }
});


// --- NEW ROUTE: Sign Language Interpreter ---
app.post('/sign-interpret', async (req, res) => {
  const { query, type } = req.body; // type: 'to-sign' (How do I say X?) or 'from-sign' (What does X gesture mean?)

  if (!genAI) return res.status(500).json({ error: "AI Unavailable" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    let prompt = "";
    if (type === 'to-sign') {
      prompt = `
        Act as an expert in Indian Sign Language (ISL).
        User wants to know how to sign: "${query}".
        Describe the hand shape, position, and movement simply so a teacher can mimic it.
        
        Output strictly JSON:
        {
          "title": "Sign for '${query}'",
          "description": "Clear step-by-step description of the gesture.",
          "tip": "A helpful memory aid."
        }
      `;
    } else {
      prompt = `
        Act as an expert in Indian Sign Language (ISL).
        User describes a gesture: "${query}".
        Guess what this sign likely means in an Indian classroom context.
        
        Output strictly JSON:
        {
          "title": "Likely Meaning",
          "description": "What this gesture usually means.",
          "tip": "Context or variation to look out for."
        }
      `;
    }

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json(cleanAndParseJSON(text)); // Uses the helper function we added earlier
  } catch (error) {
    console.error("Sign Language Error:", error);
    res.status(500).json({ error: "Failed to interpret sign" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} with ES6 Modules enabled.`);
});