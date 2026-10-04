import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export const ActivityEditorModal = ({
  isOpen,
  initialData = null,
  dayNumber,
  onSave,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Attraction',
    time: '09:00',
    durationMinutes: 120,
    location: '',
    cost: 0,
    costCategory: 'Activities',
    reason: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'Attraction',
        time: initialData.time || '09:00',
        durationMinutes: initialData.durationMinutes || 120,
        location: initialData.location || '',
        cost: initialData.cost || 0,
        costCategory: initialData.costCategory || 'Activities',
        reason: initialData.reason || ''
      });
    } else {
      setFormData({
        name: '',
        category: 'Attraction',
        time: '10:00',
        durationMinutes: 120,
        location: '',
        cost: 0,
        costCategory: 'Activities',
        reason: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Activity name is required';
    if (!formData.time) errs.time = 'Start time is required';
    if (Number(formData.cost) < 0) errs.cost = 'Cost cannot be negative';
    if (Number(formData.durationMinutes) <= 0) errs.durationMinutes = 'Duration must be positive';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...formData,
      cost: Number(formData.cost) || 0,
      durationMinutes: Number(formData.durationMinutes) || 120
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-slide-up">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {initialData ? 'Edit Activity' : `Add Activity to Day ${dayNumber}`}
            </h3>
            <p className="text-xs text-slate-500">
              Update timing, costs, and details for this itinerary item.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Activity Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Scuba Diving at Grand Island"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 ${
                errors.name
                  ? 'border-rose-300 focus:ring-rose-500/20'
                  : 'border-slate-200 focus:border-primary-500 focus:ring-primary-500/20'
              }`}
            />
            {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
          </div>

          {/* Time & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Start Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (minutes)</label>
              <input
                type="number"
                min="15"
                step="15"
                value={formData.durationMinutes}
                onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Category & Cost Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary-500 focus:outline-hidden bg-white"
              >
                <option value="Attraction">Attraction</option>
                <option value="Beach">Beach</option>
                <option value="Adventure">Adventure</option>
                <option value="Food">Food & Dining</option>
                <option value="History">History & Heritage</option>
                <option value="Culture">Culture</option>
                <option value="Shopping">Shopping</option>
                <option value="Hotel">Hotel</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Budget Category</label>
              <select
                value={formData.costCategory}
                onChange={(e) => setFormData({ ...formData, costCategory: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary-500 focus:outline-hidden bg-white"
              >
                <option value="Activities">Activities</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Hotel">Hotel</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Location & Cost */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location / Area</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. North Goa"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Cost Per Person (₹)</label>
              <input
                type="number"
                min="0"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                placeholder="0 for Free"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Reason / Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Recommendation Note</label>
            <textarea
              rows="2"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Why this was included or tips for travelers..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-primary-500 focus:outline-hidden resize-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/20 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Save Activity</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityEditorModal;
