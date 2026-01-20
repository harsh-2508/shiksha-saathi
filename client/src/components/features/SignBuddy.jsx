import React, { useState } from 'react';
import axios from 'axios';
import { Loader2, Hand, Search, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { API_URL } from '../../config';

export default function SignBuddy() {
  const [activeTab, setActiveTab] = useState('to-sign'); // 'to-sign' or 'from-sign'
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInterpret = async () => {
    if (!query) return alert("Please enter a description or word");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/sign-interpret`, { query, type: activeTab });
      setResult(res.data);
    } catch (e) { alert("Error connecting to AI"); }
    setLoading(false);
  };

  const reset = () => {
    setResult(null);
    setQuery('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-amber-600">ISL Interpreter</h2>
        <p className="text-slate-500">Bridge the communication gap.</p>
      </div>

      {!result ? (
        <div className="bg-black p-6 rounded-xl shadow-sm space-y-6">
          
          {/* Custom Toggle Switch */}
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('to-sign')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'to-sign' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500'}`}
            >
              How do I sign...?
            </button>
            <button 
              onClick={() => setActiveTab('from-sign')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'from-sign' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500'}`}
            >
              What is this sign?
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-amber-100 p-4 rounded-lg flex items-start gap-3">
              {activeTab === 'to-sign' ? <Search className="text-amber-600 mt-1" size={20}/> : <Eye className="text-amber-600 mt-1" size={20}/>}
              <div>
                <h4 className="font-bold text-amber-900 text-sm mb-1">
                  {activeTab === 'to-sign' ? "Type a word to learn:" : "Describe the gesture you see:"}
                </h4>
                <p className="text-xs text-amber-700">
                  {activeTab === 'to-sign' ? "e.g., Toilet, Water, Homework, Sit Down" : "e.g., Rotating fist on chest, Tapping nose twice"}
                </p>
              </div>
            </div>

            <Input 
              label="" 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              placeholder={activeTab === 'to-sign' ? "Enter word here..." : "Describe hand movement..."} 
            />

            <Button onClick={handleInterpret} disabled={loading} className="bg-amber-500 hover:bg-amber-600 text-white">
              {loading ? <Loader2 className="animate-spin" /> : "Interpret"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl border-t-4 border-amber-500 shadow-lg animate-in zoom-in-95">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-amber-100 p-2 rounded-full text-amber-600"><Hand size={24}/></div>
            <h3 className="font-bold text-xl text-slate-800">{result.title}</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">ACTION / MEANING</p>
              <p className="text-lg font-medium text-slate-800 leading-relaxed">{result.description}</p>
            </div>
            
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">PRO TIP</p>
              <p className="text-sm text-amber-800 italic">"{result.tip}"</p>
            </div>
          </div>

          <Button onClick={reset} variant="secondary" className="mt-6">Try Another</Button>
        </div>
      )}
    </div>
  );
}