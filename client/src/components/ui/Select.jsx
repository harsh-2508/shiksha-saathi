import React from 'react';

export const Select=({label,value,onChange,options})=>(
  <div className="space-y-1">
    <label className='text-sm font-medium text-white'>{label}</label>
    <select value={value} onChange={onChange} className='w-full p-3 bg-gray-300 border rounded-lg outline-none'>
      {
        options.map(opt=><option key={opt} value={opt}>{opt}</option>)
      }
    </select>
  </div>
);