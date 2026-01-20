import React, { useState } from "react";
import { BookOpen, Sparkles, Calendar, FileQuestion,Hand,Eye } from "lucide-react";
import './index.css'
import './App.css';

// Import feature components
import ChapterPlanner from "./components/features/ChapterPlanner";
import InstantHelp from "./components/features/InstantHelp";
import TestGenerator from "./components/features/TestGenerator";
import SignBuddy from './components/features/SignBuddy';
import SignVideo from './components/features/SignVideo'; // <-- IMPORT NEW COMPONENT

export default function App() {
  const [mode, setMode] = useState("instant"); //'instant','chapter','test','sign','vision',

  return (
    
    <div className="min-h-screen bg-black pb-24 font-sans text-slate-800">
      

      {/* Header */}
      <header className="bg-black p-6 shadow-sm sticky top-0 z-10 rounded-b-lg">
  <div className="flex justify-center">
    <div className="flex items-center bg-teal-700 text-black p-2 rounded-lg">
      <BookOpen size={30} />
      <h2 className="font-bold text-xl p-2">ShikshaSaathi</h2>
    </div>
  </div>
</header>

      {/* Main content area */}
      <main className="max-wd-md mx-auto p-4">
        {mode === "instant" && <InstantHelp />}
        {mode === "chapter" && <ChapterPlanner />}
        {mode === "test" && <TestGenerator />}
        {mode === 'sign' && <SignBuddy />}
        {mode === 'vision' && <SignVideo />}
      </main>

      {/* Bottom navigation tab bar */}
      <nav className="fixed bottom-0 w-full bg-black border-t flex justify-around p-3 pb-6 text-xs font-bold text-white max-w-md left-1/2 -translate-x-1/2 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setMode("instant")}
          className={`flex flex-col items-center gap-1 ${
            mode === "instant" ? "text-purple-600" : ""
          }`}
        >
          <Sparkles size={24} />
          Instant
        </button>

        <button
          onClick={() => setMode("chapter")}
          className={`flex flex-col items-center gap-1 ${
            mode === "chapter" ? "text-indigo-600" : ""
          }`}
        >
          <Calendar size={24} />
          Chapter Planner
        </button>

        <button
          onClick={() => setMode("test")}
          className={`flex flex-col items-center gap-1 ${
            mode === "test" ? "text-yellow-500" : ""
          }`}
        >
          <FileQuestion siz={24} />
          Test
        </button>
        <button 
          onClick={() => setMode('sign')} 
          className={`flex flex-col items-center gap-1 ${mode === 'sign' ? 'text-amber-600' : ''}`}
        >
          <Hand size={20} /> Sign
        </button>

        {/* NEW BUTTON FOR VISION */}
        <button 
          onClick={() => setMode('vision')} 
          className={`flex flex-col items-center gap-1 ${mode === 'vision' ? 'text-purple-600' : ''}`}
        >
          <Eye size={20} /> Vision
        </button>

      </nav>
    </div>
  );
}
