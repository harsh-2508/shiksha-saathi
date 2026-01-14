import React, { useState } from 'react';
import axios from 'axios';
import { BookOpen, Users, Volume2, Clock, CheckCircle, ChevronRight, Loader2 } from 'lucide-react';

// --- CONFIG ---
// Change this to your Render URL after deployment
const API_URL = "http://localhost:4000"; 

// --- COMPONENTS ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-6 ${className}`}>
    {children}
  </div>
);

const Button = ({ onClick, children, variant = "primary", disabled }) => {
  const baseStyle = "w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2";
  const styles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md",
    outline: "border-2 border-indigo-100 text-indigo-700 hover:bg-indigo-50",
    danger: "bg-orange-100 text-orange-700 hover:bg-orange-200"
  };
  return (
    <button disabled={disabled} onClick={onClick} className={`${baseStyle} ${styles[variant]} ${disabled ? 'opacity-50' : ''}`}>
      {children}
    </button>
  );
};

// --- MAIN APP ---

export default function App() {
  const [step, setStep] = useState(1); // 1:Home, 2:Context, 3:Challenge, 4:Solution
  const [formData, setFormData] = useState({ grade: '3', subject: 'Math', challenge: '' });
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);

  // Challenges List
  const challenges = [
    { id: 'noise', label: 'Classroom is Noisy', icon: Volume2 },
    { id: 'concept', label: 'Concept Not Clear', icon: BookOpen },
    { id: 'disengaged', label: 'Students Bored', icon: Users },
    { id: 'time', label: 'Running Late', icon: Clock },
  ];

  const handleGetHelp = async (selectedChallenge) => {
    setFormData({ ...formData, challenge: selectedChallenge });
    setStep(4);
    setLoading(true);

    try {
      // API CALL
      const res = await axios.post(`${API_URL}/suggest`, {
        ...formData,
        challenge: selectedChallenge
      });
      setSolution(res.data);
    } catch (err) {
      // OFFLINE FALLBACK (If API fails)
      setSolution({
        title: "Think-Pair-Share",
        action: "Ask students to think silently for 1 min, then discuss with a partner.",
        why: "Offline Mode: Standard engagement strategy activated."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-slate-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex items-center gap-2 sticky top-0 z-10">
        <div className="bg-indigo-600 text-white p-2 rounded-lg">
          <BookOpen size={20} />
        </div>
        <h1 className="font-bold text-xl text-slate-800">ShikshaSaathi</h1>
      </header>

      {/* BODY */}
      <main className="p-4 flex-1">
        
        {/* STEP 1: HOME */}
        {step === 1 && (
          <div className="text-center mt-10 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Need help in the classroom?</h2>
            <p className="text-slate-500">Get instant, AI-powered pedagogical support in under 30 seconds.</p>
            <Button onClick={() => setStep(2)}>Start Now <ChevronRight /></Button>
          </div>
        )}

        {/* STEP 2: CONTEXT */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Class Context</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Grade Level</label>
              <select 
                className="w-full p-4 bg-white border rounded-lg text-lg"
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: e.target.value})}
              >
                {[1,2,3,4,5,6,7,8].map(g => <option key={g} value={g}>Grade {g}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Subject</label>
              <select 
                className="w-full p-4 bg-white border rounded-lg text-lg"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              >
                {['Math', 'English', 'Science', 'Hindi', 'Social Science'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <Button onClick={() => setStep(3)}>Next</Button>
          </div>
        )}

        {/* STEP 3: CHALLENGE */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">What's happening?</h2>
            <div className="grid grid-cols-1 gap-3">
              {challenges.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleGetHelp(c.id)}
                  className="p-4 bg-white border-2 border-slate-100 rounded-xl flex items-center gap-4 hover:border-indigo-600 hover:bg-indigo-50 transition-all text-left group"
                >
                  <div className="bg-slate-100 p-3 rounded-full text-slate-600 group-hover:bg-white group-hover:text-indigo-600">
                    <c.icon size={24} />
                  </div>
                  <span className="font-semibold text-slate-700 text-lg">{c.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="text-slate-400 text-sm mt-4 text-center w-full">Back</button>
          </div>
        )}

        {/* STEP 4: SOLUTION */}
        {step === 4 && (
          <div className="space-y-6">
            {loading ? (
              <div className="text-center mt-20 space-y-4">
                <Loader2 className="animate-spin mx-auto text-indigo-600" size={48} />
                <p className="text-slate-500">Consulting Pedagogical Engine...</p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-flex items-center gap-2 text-sm font-bold mb-4">
                  <CheckCircle size={16} /> Recommended Strategy
                </div>
                
                <Card className="border-t-4 border-t-indigo-600">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{solution?.title}</h3>
                  <div className="h-1 w-20 bg-indigo-100 rounded mb-6"></div>
                  
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">ACTION PLAN</p>
                    <p className="text-lg text-slate-800 leading-relaxed font-medium">
                      {solution?.action}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">WHY THIS WORKS</p>
                    <p className="text-slate-600 italic">"{solution?.why}"</p>
                  </div>
                </Card>

                <div className="mt-8 space-y-3">
                  <Button onClick={() => setStep(1)} variant="primary">Use This Strategy</Button>
                  <Button onClick={() => handleGetHelp(formData.challenge)} variant="outline">Try Another Way</Button>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}