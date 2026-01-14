import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import strategies from './strategies.js'; // Note the .js extension

// Load environment variables
dotenv.config();

const app = express();

// --- CRITICAL MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Incoming ${req.method} request to ${req.url}`);
  next();
});

// Initialize Gemini AI
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// ROUTES
app.get('/', (req, res) => {
  res.send('ShikshaSaathi API is Running with ES6 Modules!');
});

app.post('/suggest', async (req, res) => {
  console.log("Received Suggestion Request:", req.body);
  const { challenge, grade, subject } = req.body;

  // 1. RULE ENGINE (Fast & Free)
  const match = strategies.find(s => 
    s.challenge === challenge && 
    (s.grade === grade || s.grade === 'primary')
  );

  if (match) {
    console.log("--> Serving from Cache/Rules");
    return res.json(match);
  }

  // 2. AI FALLBACK
  console.log("--> Consulting Gemini AI...");
  
  if (!genAI) {
    console.log("--> No API Key found, using fallback.");
    return res.json({
      title: "Think-Pair-Share (Offline Fallback)",
      action: "Ask students to think silently, then discuss with a partner.",
      why: "API Key missing. This is a default safe response."
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
      Act as a senior teacher trainer in India. 
      Problem: A teacher in Grade ${grade} is facing "${challenge}" in a ${subject} class.
      Task: Suggest ONE simple, immediate classroom activity (under 30 seconds to setup).
      Return strictly JSON format: { "title": "Strategy Name", "action": "Step-by-step instruction", "why": "One sentence pedagogical reason" }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Clean markdown if AI adds it (e.g. ```json ... ```)
    const text = response.text().replace(/```json/g, '').replace(/```/g, '');
    
    res.json(JSON.parse(text));
  } catch (error) {
    console.error("AI Error:", error);
    res.json({
      title: "Peer-Pair-Share",
      action: "Ask students to turn to their neighbor and discuss the topic for 1 minute.",
      why: "Immediate engagement breaks the passive cycle."
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} with ES6 Modules enabled.`);
});