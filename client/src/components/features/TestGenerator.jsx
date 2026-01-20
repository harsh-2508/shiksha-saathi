import React, { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { API_URL } from '../../config';

export default function TestGenerator() {
  const [data, setData] = useState({ grade: '8', subject: 'Math', topic: '', level: 'Medium' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTest = async () => {
    if (!data.topic) return alert("Enter topic");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/assessment`, data);
      setResult(res.data);
    } catch (e) { alert("Error generating test"); }
    setLoading(false);
  };

  if (result) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-rose-600 animate-in fade-in">
        <h3 className="font-bold text-xl mb-4 text-slate-800">{result.title}</h3>
        <ul className="space-y-4">
          {result.questions.map((q, i) => (
            <li key={i} className="p-3 bg-rose-50 rounded text-slate-800 font-medium border border-rose-100">
              <span className="font-bold text-rose-400 mr-2">{i+1}.</span> {q.q}
            </li>
          ))}
        </ul>
        <Button onClick={() => setResult(null)} variant="secondary" className="mt-6">Generate Another</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-teal-700">Test Generator</h2>
        <p className="text-slate-500">Curated questions by difficulty.</p>
      </div>
      <div className="space-y-4 bg-black p-6 rounded-xl shadow-sm">
        <Input label="Topic" value={data.topic} onChange={e => setData({...data, topic: e.target.value})} placeholder="e.g. Photosynthesis" />
        <div className="grid grid-cols-2 gap-4">
          <Select label="Level" value={data.level} onChange={e => setData({...data, level: e.target.value})} options={['Easy', 'Medium', 'Hard']} />
          <Select label="Grade" value={data.grade} onChange={e => setData({...data, grade: e.target.value})} options={[1,2,3,4,5,6,7,8,9,10,11,12]} />
        </div>
        <Button onClick={fetchTest} disabled={loading} className="bg-gray-500 hover:bg-teal-700 ">
          {loading ? <Loader2 className="animate-spin"/> : "Create Test"}
        </Button>
      </div>
    </div>
  );
}