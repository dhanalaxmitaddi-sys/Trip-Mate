import React from 'react';
import {
  Clock,
  MapPin,
  IndianRupee,
  Navigation,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Tag
} from 'lucide-react';
import { openDirections } from '../services/mapsService';

export const ActivityCard = ({
  activity,
  dayNumber,
  destinationName,
  isFirst,
  isLast,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  currencySymbol = '₹'
}) => {
  const getCategoryColor = (cat) => {
    switch ((cat || '').toLowerCase()) {
      case 'beach':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'adventure':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'history':
      case 'culture':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'food':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'hotel':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'shopping':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handleDirections = (e) => {
    e.stopPropagation();
    openDirections(activity.name, activity.location || destinationName);
  };

  return (
    <div className="relative group bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-primary-200 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        {/* Left: Time and Title */}
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold tracking-tight">
              <Clock className="w-3.5 h-3.5 text-primary-600" />
              {activity.time || '09:00'}
            </span>
            <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold border ${getCategoryColor(activity.category)}`}>
              {activity.category || 'Attraction'}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              {activity.durationMinutes ? `${activity.durationMinutes} mins` : '2 hrs'}
            </span>
          </div>

          <h4 className="text-base font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
            {activity.name}
          </h4>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{activity.location || destinationName}</span>
          </div>

          {/* AI Recommendation Reason */}
          {activity.reason && (
            <div className="mt-2 text-xs text-slate-600 bg-primary-50/50 border border-primary-100/60 rounded-xl p-2.5 flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{activity.reason}</span>
            </div>
          )}
        </div>

        {/* Right: Cost & Quick Actions */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="text-right">
            <div className="text-xs text-slate-600 uppercase font-semibold">Estimated Cost</div>
            <div className="text-base font-extrabold text-slate-900 flex items-center justify-end">
              {activity.cost > 0 ? (
                <>
                  <span className="text-xs mr-0.5">{currencySymbol}</span>
                  {activity.cost.toLocaleString()}
                </>
              ) : (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Free Entry
                </span>
              )}
            </div>
          </div>

          {/* Action Button Bar */}
          <div className="flex items-center gap-1">
            {/* Google Maps Directions (FR5) */}
            <button
              type="button"
              onClick={handleDirections}
              className="p-1.5 text-primary-600 hover:text-white hover:bg-primary-600 rounded-lg border border-primary-200 transition-all"
              title="Get Google Maps Directions (opens in new tab)"
            >
              <Navigation className="w-4 h-4" />
            </button>

            {/* Move Up */}
            <button
              type="button"
              disabled={isFirst}
              onClick={onMoveUp}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Move activity up"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

            {/* Move Down */}
            <button
              type="button"
              disabled={isLast}
              onClick={onMoveDown}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Move activity down"
            >
              <ArrowDown className="w-4 h-4" />
            </button>

            {/* Edit */}
            <button
              type="button"
              onClick={onEdit}
              className="p-1.5 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              title="Edit activity"
            >
              <Edit2 className="w-4 h-4" />
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={onDelete}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="Delete activity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
