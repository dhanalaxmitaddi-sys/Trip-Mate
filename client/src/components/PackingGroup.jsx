import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Shirt,
  Sparkles,
  FileText,
  Smartphone,
  HeartPulse,
  Compass
} from 'lucide-react';

export const PackingGroup = ({
  groupName,
  items = [],
  onToggle,
  onAddItem,
  onDeleteItem
}) => {
  const [newItemText, setNewItemText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const getGroupIcon = (name) => {
    switch (name) {
      case 'Clothing':
        return <Shirt className="w-4 h-4 text-primary-600" />;
      case 'Toiletries':
        return <Sparkles className="w-4 h-4 text-cyan-600" />;
      case 'Documents':
        return <FileText className="w-4 h-4 text-amber-600" />;
      case 'Electronics':
        return <Smartphone className="w-4 h-4 text-purple-600" />;
      case 'Health and safety':
        return <HeartPulse className="w-4 h-4 text-rose-600" />;
      case 'Activity essentials':
      default:
        return <Compass className="w-4 h-4 text-teal-600" />;
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    onAddItem(groupName, newItemText.trim());
    setNewItemText('');
    setIsAdding(false);
  };

  const checkedCount = items.filter(i => i.checked).length;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/60">
            {getGroupIcon(groupName)}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">{groupName}</h4>
            <span className="text-[11px] text-slate-400 font-medium">
              {checkedCount} / {items.length} packed
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="p-1.5 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors"
          title="Add item to this group"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Add input form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="flex items-center gap-2 pt-1 animate-fade-in">
          <input
            type="text"
            autoFocus
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder={`Add ${groupName.toLowerCase()} item...`}
            className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-primary-300 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20"
          />
          <button
            type="submit"
            className="px-3 py-1.5 text-xs font-semibold bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="px-2 py-1.5 text-xs text-slate-500 hover:text-slate-700"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Items list */}
      <div className="space-y-1.5">
        {items.length === 0 ? (
          <div className="text-[11px] text-slate-400 py-2 italic">No items in this category yet.</div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                item.checked
                  ? 'bg-slate-50/70 border-slate-200/50 text-slate-400'
                  : 'bg-white border-transparent hover:border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                {item.checked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 group-hover:text-primary-600 shrink-0 transition-colors" />
                )}
                <span className={`text-xs truncate ${item.checked ? 'line-through' : 'font-medium'}`}>
                  {item.label}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteItem(item.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all shrink-0"
                title="Delete item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PackingGroup;
