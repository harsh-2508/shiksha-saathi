import React, { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { API_URL } from '../../config';

export default function ChapterPlanner() {
  const [data, setData] = useState({ grade: '5', subject: 'Science', chapter: '', days: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchChapterPlan = async () => {
    if (!data.chapter || !data.days) return alert("Please fill all fields");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/chapter-plan`, data);
      setResult(res.data);
    } catch (e) { alert("Error generating plan"); }
    setLoading(false);
  };

  if (result) {
    return (
      <div className="space-y-4 animate-in fade-in">
        <h3 className="font-bold text-xl text-teal-800">{result.title}</h3>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {result.schedule.map((day) => (
            <div key={day.day} className="bg-white p-4 rounded-lg border-l-4 border-teal-500 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2 py-1 rounded">DAY {day.day}</span>
              </div>
              <h4 className="font-bold text-slate-800">{day.topics}</h4>
              <p className="text-slate-600 text-sm mt-2">Activity: {day.activity}</p>
            </div>
          ))}
        </div>
        <Button onClick={() => setResult(null)} variant="secondary">Create New Plan</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-teal-700">Chapter Planner</h2>
        <p className="text-slate-500">Generate a study plan for any duration.</p>
      </div>
      <div className="space-y-4 bg-black p-6 rounded-xl shadow-sm">
        <Input label="Chapter Name" value={data.chapter} onChange={e => setData({...data, chapter: e.target.value})} placeholder="e.g. sets and relation" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Days" type="number" value={data.days} onChange={e => setData({...data, days: e.target.value})} placeholder="e.g. 5" />
          <Select label="Grade" value={data.grade} onChange={e => setData({...data, grade: e.target.value})} options={[1,2,3,4,5,6,7,8,9,10,11,12]} />
        </div>
        <Button onClick={fetchChapterPlan} disabled={loading} className="bg-gray-400 hover:bg-teal-700">
          {loading ? <Loader2 className="animate-spin"/> : "Generate Plan"}
        </Button>
      </div>
    </div>
  );
}