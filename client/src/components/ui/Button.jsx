// "Lego blocks" (Buttons, Inputs) that don't care about logic, just how they look.
import React from 'react';

export const Button=({onClick,children,variant="primary",disabled,className=""})=>{
  const styles={
    primary:"bg-gray-400 text-white hover:bg-indigo-700 shadow-md",
    outline:"border-2 border-indigo-100 text-indigo-700 hover:bg-indigo-50",
    secondary:"bg-slate-200 text-slate-800 hover:bg-slate-300"
  };
  return(
    <button disabled={disabled}
    onClick={onClick}
    className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${styles[variant]} ${disabled?'opacity-50':''} ${className}`}
    >
      {children}
    </button>
  )

};