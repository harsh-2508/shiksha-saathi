# 🎓 ShikshaSaathi (Education Companion)

> **Just-in-Time Pedagogical Support for Indian Classrooms.**
> *Empowering teachers with instant, AI-driven classroom strategies—no jargon, just solutions.*

![Status](https://img.shields.io/badge/Status-Hackathon_MVP-success)
![Stack](https://img.shields.io/badge/Stack-MERN-blue)
![AI](https://img.shields.io/badge/AI-Google_Gemini-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## 📖 The Problem
Teachers in public schools are often trained in pedagogy (FLN, Activity-Based Learning) but lack **real-time support** when a lesson derails.
* "Students are making noise."
* "They don't understand the concept of Fractions."
* "I only have 10 minutes left."

Existing solutions provide delayed, generic training modules. Teachers need **actionable help in 30 seconds**.

## 🚀 The Solution
**ShikshaSaathi** is a mobile-first "co-pilot" for teachers. It uses a **Hybrid AI Engine** (Rule-based + LLM) to provide instant, context-aware teaching strategies, lesson plans, and assessment questions tailored to the Indian classroom context.

---

## ✨ Key Features

### 1. 🆘 Instant Classroom SOS
* **Context-Aware:** Select Grade, Subject, and Challenge (e.g., "Classroom Noisy").
* **Hybrid Engine:** Checks a local "Pedagogy Rulebook" first for instant, offline-ready answers. Falls back to **Google Gemini AI** for complex queries.
* **Result:** Actionable advice in < 2 sentences.

### 2. 📅 Smart Chapter Planner
* Generates a structured study plan for any chapter.
* Teacher defines the timeline (e.g., "Finish 'Force & Pressure' in 3 days").
* Includes daily activities and revision slots.

### 3. 📝 Curated Test Generator
* Instantly creates assessment questions based on difficulty (Easy, Medium, Hard).
* Focuses on conceptual understanding rather than rote memorization.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | Fast, mobile-first UI |
| **Styling** | Tailwind CSS | Clean, accessibility-focused design |
| **Backend** | Node.js + Express | Lightweight API layer |
| **AI Model** | Google Gemini 1.5 Flash | High-speed, low-latency generation |
| **Database** | MongoDB (Optional) | Scalable data storage |
| **Icons** | Lucide React | Visual cues for low-literacy scenarios |

---

## ⚙️ Architecture (The Hybrid Engine)

To ensure speed and reliability (even with poor internet), we use a two-step process:

1.  **Level 1 (The Cache):** The backend first checks a `strategies.js` file for common problems (e.g., "Noise in Grade 2"). This returns in **10ms** and costs **$0**.
2.  **Level 2 (The AI):** If no rule matches, the request is sent to **Google Gemini**. The prompt is engineered to act as a "Senior Indian Teacher Trainer."

```mermaid
graph TD;
    Teacher_App-->Backend_API;
    Backend_API-->Local_Rule_Engine;
    Local_Rule_Engine-- Match Found -->Return_Instant_Strategy;
    Local_Rule_Engine-- No Match -->Google_Gemini_AI;
    Google_Gemini_AI-->Generate_New_Strategy;
    Generate_New_Strategy-->Return_Strategy;
