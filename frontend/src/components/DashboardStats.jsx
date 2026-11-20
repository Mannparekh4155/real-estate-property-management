import React from 'react';

export default function DashboardStats({ stats }) {
  const {
    totalProperties = 0,
    availableProperties = 0,
    soldProperties = 0,
    rentedProperties = 0,
    totalPropertyValue = 0
  } = stats || {};

  // Currency Formatter for Indian Crores / Lakhs
  const formatCurrency = (val) => {
    if (!val || val === 0) return '₹0';
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} L`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <section className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {/* 1. Total Properties */}
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-100 border-l-[5px] border-l-teal-700 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500">Total<br className="sm:hidden" /> Properties</span>
            <span className="text-xl">🏚️</span>
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-slate-900">
            {totalProperties}
          </div>
        </div>

        {/* 2. Available Properties */}
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-100 border-l-[5px] border-l-emerald-600 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500">Available</span>
            <span className="text-xl">✅</span>
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-slate-900">
            {availableProperties}
          </div>
        </div>

        {/* 3. Sold Properties */}
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-100 border-l-[5px] border-l-rose-500 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500">Sold</span>
            <span className="text-xl">🏷️</span>
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-slate-900">
            {soldProperties}
          </div>
        </div>

        {/* 4. Rented Properties */}
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-100 border-l-[5px] border-l-amber-500 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500">Rented</span>
            <span className="text-xl">🔑</span>
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-slate-900">
            {rentedProperties}
          </div>
        </div>

        {/* 5. Total Property Value */}
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-100 border-l-[5px] border-l-indigo-600 col-span-2 md:col-span-1 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500">Total Property Value</span>
            <span className="text-xl">💰</span>
          </div>
          <div className="text-xl md:text-2xl font-black text-slate-900 truncate">
            {formatCurrency(totalPropertyValue)}
          </div>
        </div>
      </div>
    </section>
  );
}
