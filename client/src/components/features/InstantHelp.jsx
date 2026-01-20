import React, { useState } from "react";
import axios from "axios";
import { Volume2, Users, Clock, BrainCircuit, Loader2 } from "lucide-react";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

import { API_URL } from "../../config";

export default function InstantHelp() {
  const [data, setData] = useState({
    grade: "3",
    subject: "Math",
    challenge: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const challenges = [
    { id: "noise", label: "Noisy Class", icon: Volume2 },
    { id: "concept", label: "Concept Unclear", icon: BrainCircuit },
    { id: "bored", label: "Students Bored", icon: Users },
    { id: "time", label: "Short on Time", icon: Clock },
  ];

  const fetchInstantHelp = async (challengeId) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/suggest`, {
        ...data,
        challengeId,
      });
      setData(res.data);
    } catch (e) {
      alert("Error connecting to ai");
    }
  };

  if (result) {
    return (
      <div className="bg-white p-6 rounded-xl border-t-4 border-indigo-600 shadow-lg animate-in fade-in">
        <h3 className="text-2xl font-bold mb-2">{result.title}</h3>
        <div className="my-4 p-4 bg-indigo-50 rounded-lg text-indigo-900 font-medium text-lg">
          {result.action}
        </div>
        <p className="text-slate-500 italic">"{result.why}"</p>
        <Button
          onClick={() => setResult(null)}
          variant="secondary"
          className="mt-6"
        >
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-black">Classroom SOS</h2>
        <p className="text-slate-400">Instant support when you get stuck.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 ">
        <Select
          label="Grade"
          value={data.grade}
          onChange={(e) => setData({ ...data, grade: e.target.value })}
          options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        />
        <Select
          label="Subject"
          value={data.subject}
          onChange={(e) => setData({ ...data, subject: e.target.value })}
          options={["Math", "English", "Science", "Social", "Hindi", "physics"]}
        />
      </div>
      <div className="grid gap-3">
        {challenges.map((c) => (
          <button
            key={c.id}
            onClick={() => fetchInstantHelp(c.id)}
            disabled={loading}
            className="p-4 bg-gray-100 border rounded-xl flex items-center gap-4 hover:border-gray hover:bg-gray-400 shadow-md text-left"
          >
            <div className="bg-slate-300 p-2 rounded-full text-black">
              <c.icon size={20} />
            </div>
            <span className="font-semibold text-lg">{c.label}</span>
          </button>
        ))}
        {loading && (
          <div className="flex justify-center py-4">
            <Loader2 className="animate-spin text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
}
