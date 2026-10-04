import React, { useState, useEffect } from 'react';
import { useTrip } from '../context/TripContext';
import { useUI } from '../context/UIContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import storage from '../services/storage';
import EmptyState from '../components/EmptyState';
import {
  CheckSquare,
  Sparkles,
  RefreshCw,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Trash2,
  Globe,
  Plane
} from 'lucide-react';
import { destinations } from '../data/destinations';

const DEFAULT_GROUPS = [
  'Documents',
  'Clothing',
  'Electronics',
  'Toiletries',
  'Health & Safety',
  'Activity Essentials'
];

export const PackingList = () => {
  const { currentTrip } = useTrip();
  const { showSuccess, showError, showInfo } = useUI();
  const { t } = useLanguage();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Clothing');

  const dest = destinations.find(d => d.id === (currentTrip ? currentTrip.destinationId : 'goa')) || destinations[0];

  // Base list generator tailored to domestic vs international (Requirement 23)
  const generateDefaultPacking = (trip) => {
    const list = [];
    let id = 1;
    const add = (group, label) => list.push({ id: `p-${id++}`, group, label, checked: false });

    // Documents
    if (trip.isInternational) {
      add('Documents', 'Official Passport (min. 6 months validity)');
      add('Documents', 'Tourist Visa / eVisa printout');
      add('Documents', 'International Travel Insurance policy card');
      add('Documents', 'Return flight tickets & accommodation vouchers');
      add('Electronics', 'Universal travel adapter (for local wall sockets)');
      add('Documents', 'Foreign Currency cash & International credit card');
    } else {
      add('Documents', 'Government Photo ID (Aadhaar / Voter ID / DL)');
      add('Documents', 'Train / Flight tickets & Hotel booking vouchers');
      add('Documents', 'Health insurance card');
    }

    // Electronics
    add('Electronics', 'Smartphone & fast charging cable');
    add('Electronics', '10,000mAh+ Power bank');
    add('Electronics', 'Earphones / noise-canceling headphones');

    // Toiletries
    add('Toiletries', 'Travel toothbrush & toothpaste');
    add('Toiletries', 'Sunscreen lotion SPF 50+ & lip balm');
    add('Toiletries', 'Hand sanitizer & wet disinfectant wipes');

    // Health
    add('Health & Safety', 'First-aid kit (painkillers, antacids, band-aids)');
    add('Health & Safety', 'Daily personal prescription medicines');

    // Clothes scaled strictly by selected duration
    const days = Number(trip.daysCount) > 0 ? Number(trip.daysCount) : (trip.days?.length || 1);
    const shirtCount = Math.min(days + 1, 7);
    add('Clothing', `Casual breathable day outfits (${shirtCount} sets for ${days}-day trip)`);
    add('Clothing', 'Cushioned walking sneakers');
    add('Clothing', 'Undergarments & extra pair of socks');

    if (dest.type === 'beach') {
      add('Clothing', 'Swimwear & beach flip-flops');
      add('Activity Essentials', 'UV sunglasses & microfiber beach towel');
    } else if (dest.type === 'hill') {
      add('Clothing', 'Warm thermal innerwear & fleece jacket');
      add('Activity Essentials', 'Woolen cap, gloves & trekking shoes');
    }

    return list;
  };

  useEffect(() => {
    if (!currentTrip) return;

    const tripId = currentTrip._id || currentTrip.id;
    const cached = storage.getTripPacking(tripId);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      setItems(cached);
    } else {
      const generated = generateDefaultPacking(currentTrip);
      setItems(generated);
      storage.saveTripPacking(tripId, generated);
    }
  }, [currentTrip]);

  if (!currentTrip) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans">
        <EmptyState
          icon={CheckSquare}
          title="No Active Trip Selected"
          description="Create or select a trip to generate an intelligent, climate-adapted packing checklist."
          actionText="Plan a Trip"
          actionLink="/plan"
        />
      </div>
    );
  }

  const tripId = currentTrip._id || currentTrip.id;

  const handleToggle = (itemId) => {
    const updated = items.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setItems(updated);
    storage.saveTripPacking(tripId, updated);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem = {
      id: `p-${Date.now()}`,
      group: selectedGroup,
      label: newItemText.trim(),
      checked: false
    };

    const updated = [...items, newItem];
    setItems(updated);
    storage.saveTripPacking(tripId, updated);
    setNewItemText('');
    showSuccess(`Added "${newItem.label}" to ${selectedGroup}!`);
  };

  const handleDeleteItem = (itemId) => {
    const updated = items.filter(item => item.id !== itemId);
    setItems(updated);
    storage.saveTripPacking(tripId, updated);
    showInfo('Item removed from checklist');
  };

  const checkedCount = items.filter(i => i.checked).length;
  const progressPercent = items.length > 0 ? Math.round((checkedCount / items.length) * 100) : 0;

  // Group items by category
  const groupedItems = DEFAULT_GROUPS.reduce((acc, grp) => {
    acc[grp] = items.filter(i => i.group === grp);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>TripMate Smart Packing Assistant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Packing Checklist
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Customized for <strong>{currentTrip.destinationName}</strong> • {currentTrip.days?.length || 1} Days • {currentTrip.isInternational ? 'International Journey' : 'Domestic Tour'}
          </p>
        </div>

        {/* Progress Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-black text-sm">
            {progressPercent}%
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">{checkedCount} of {items.length} packed</div>
            <div className="text-[11px] text-slate-400">Keep ticking items as you pack</div>
          </div>
        </div>
      </div>

      {/* International Alert Notice (Requirement 23) */}
      {currentTrip.isInternational && (
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-start gap-3 shadow-xs">
          <Globe className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-indigo-950">International Travel Reminders Included:</span>
            <p className="text-indigo-800 text-[11px] leading-relaxed">
              Don't forget your <strong>Passport (6+ months validity)</strong>, <strong>Universal Plug Adapter</strong>, <strong>Foreign Currency / Forex Card</strong>, and <strong>Visa Approval documents</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Add New Custom Item Form */}
      <form onSubmit={handleAddItem} className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add custom packing item (e.g. GoPro, Swimming Goggles, Book)..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-sky-500 focus:outline-hidden"
        />

        <select
          aria-label="Packing Group"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
        >
          {DEFAULT_GROUPS.map(grp => (
            <option key={grp} value={grp}>{grp}</option>
          ))}
        </select>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </form>

      {/* Grouped Checklist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DEFAULT_GROUPS.map((group) => {
          const groupItems = groupedItems[group] || [];
          if (groupItems.length === 0) return null;

          return (
            <div
              key={group}
              className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-black text-sm text-slate-900">{group}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {groupItems.filter(i => i.checked).length}/{groupItems.length}
                </span>
              </div>

              <div className="space-y-2">
                {groupItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between gap-3 text-xs transition-colors group"
                  >
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleToggle(item.id)}
                        className="w-4 h-4 text-sky-600 rounded-md border-slate-300 focus:ring-sky-500"
                      />
                      <span className={`${item.checked ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                        {item.label}
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-opacity p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default PackingList;
