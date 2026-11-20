import React from 'react';
import { MapPin, Bed, Bath, MoveRight } from 'lucide-react';

export default function PropertyCard({ property, onEdit, onDelete, onStatusChange }) {
  // Format price into Indian numbering format: e.g. ₹1,25,00,000
  const formatPrice = (num) => {
    if (!num) return '₹0';
    return `₹${num.toLocaleString('en-IN')}`;
  };

  // Status badge styling matching the photos
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'Sold':
        return 'bg-rose-100 text-rose-800 border border-rose-200';
      case 'Rented':
        return 'bg-amber-100 text-amber-800 border border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  // Type badge styling
  const getTypeBadge = (type) => {
    if (type === 'Residential') {
      return 'bg-blue-100 text-blue-700 border border-blue-200';
    }
    return 'bg-purple-100 text-purple-700 border border-purple-200';
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${getTypeBadge(property.propertyType)}`}>
            {property.propertyType}
          </span>
          <span className={`text-[11px] font-bold px-3 py-0.5 rounded-full ${getStatusBadge(property.status)}`}>
            {property.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-slate-900 text-base md:text-lg mb-1 leading-snug">
          {property.propertyName}
        </h3>

        {/* Location */}
        <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mb-2">
          <span className="text-rose-500">📍</span>
          <span>{property.location}</span>
        </p>

        {/* Description */}
        {property.description && (
          <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
            {property.description}
          </p>
        )}

        {/* Price */}
        <div className="text-lg md:text-xl font-black text-[#115e59] mb-2 tracking-tight">
          {formatPrice(property.price)}
        </div>

        {/* Specs: Area, Bedrooms, Bathrooms */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-semibold mb-3">
          <span className="flex items-center gap-1">
            <span>📐</span> {property.area?.toLocaleString('en-IN')} sq. ft.
          </span>
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <span>🛏️</span> {property.bedrooms} Beds
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <span>🚿</span> {property.bathrooms} Baths
            </span>
          )}
        </div>
      </div>

      {/* Bottom Actions: Quick status changer, Edit & Delete buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <select
          value={property.status}
          onChange={(e) => onStatusChange(property._id, e.target.value)}
          className="text-xs font-semibold py-1.5 px-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#115e59]"
        >
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
          <option value="Rented">Rented</option>
        </select>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onEdit(property)}
            className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition active:scale-95"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(property)}
            className="px-3 py-1.5 text-xs font-bold text-rose-600 bg-white border border-rose-300 rounded-lg hover:bg-rose-50 transition active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
