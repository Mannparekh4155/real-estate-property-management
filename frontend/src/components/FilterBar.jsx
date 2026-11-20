import React from 'react';
import { Search } from 'lucide-react';

export default function FilterBar({ filters, setFilters, onReset }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200/80 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {/* 1. Search by Name (Span 2 cols on lg) */}
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search by property name"
            className="w-full pl-10 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#115e59] focus:border-transparent placeholder-slate-400 transition"
          />
        </div>

        {/* 2. Location */}
        <div>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#115e59] focus:border-transparent placeholder-slate-400 transition"
          />
        </div>

        {/* 3. Property Type */}
        <div>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#115e59] focus:border-transparent text-slate-700 transition"
          >
            <option value="">All types</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        {/* 4. Status */}
        <div>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#115e59] focus:border-transparent text-slate-700 transition"
          >
            <option value="">All statuses</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
          </select>
        </div>

        {/* 5. Min Price */}
        <div>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min price (₹)"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#115e59] focus:border-transparent placeholder-slate-400 transition"
          />
        </div>

        {/* 6. Max Price & Reset Row for mobile, or grid on desktop */}
        <div className="flex gap-2 sm:col-span-2 lg:col-span-6 lg:grid lg:grid-cols-6 lg:gap-3">
          <div className="flex-1 lg:col-span-1 lg:col-start-5">
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max price (₹)"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#115e59] focus:border-transparent placeholder-slate-400 transition"
            />
          </div>

          <div className="lg:col-span-1">
            <button
              type="button"
              onClick={onReset}
              className="w-full px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl transition active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
