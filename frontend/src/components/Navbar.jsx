import React from 'react';
import { Plus, Building2 } from 'lucide-react';

export default function Navbar({ onAddClick }) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[#cbe7df] border border-[#b2d9ce] flex items-center justify-center text-[#115e59] shadow-sm">
          <Building2 className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            PropManager
          </h1>
          <p className="text-xs text-slate-600 font-medium hidden sm:block">
            Real Estate Management System
          </p>
        </div>
      </div>

      <button
        onClick={onAddClick}
        className="bg-[#115e59] hover:bg-[#0d4a46] active:scale-95 transition-all text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>Add Property</span>
      </button>
    </header>
  );
}
