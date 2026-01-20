import React from 'react';

export const Input=({label,value,onChange,placeholder,type="text"})=>(

  <div className="space-y-1 text-white">
    <label htmlFor="" className='text-sm font-medium text-white'>{label}</label>
    <input type={type} className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-white outline-none' text-white
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    min={type==="number" ? "1" : undefined}
    />
  </div>
);