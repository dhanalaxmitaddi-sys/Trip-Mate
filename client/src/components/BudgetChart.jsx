import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import { AlertTriangle, CheckCircle2, TrendingUp, Wallet, ArrowDownRight, Sparkles } from 'lucide-react';

const CATEGORY_COLORS = {
  Hotel: '#6366f1',          // Soft Purple / Indigo
  Food: '#10b981',           // Emerald Teal
  Transportation: '#0284c7', // Sky Blue
  Transport: '#0284c7',      // Sky Blue alias
  Activities: '#f59e0b',     // Warm Yellow
  Shopping: '#ec4899',       // Coral Pink
  Other: '#64748b'           // Slate
};

export const BudgetChart = ({
  budgetStats,
  totalBudget = 0,
  totals: propTotals,
  budget: propBudget,
  currencySymbol = '₹'
}) => {
  // Normalize stats
  const totals = budgetStats?.totals || propTotals || {
    Hotel: 3500,
    Food: 2400,
    Transportation: 1800,
    Activities: 2200,
    Shopping: 1500,
    Other: 600
  };

  const effectiveBudget = Number(budgetStats?.totalBudget || totalBudget || propBudget || 25000);
  const effectiveTotal = Number(budgetStats?.total || Object.values(totals).reduce((a, b) => a + Number(b || 0), 0));
  const effectiveRemaining = effectiveBudget - effectiveTotal;
  const exceeded = effectiveTotal > effectiveBudget;
  const overspendAmount = exceeded ? Math.abs(effectiveRemaining) : 0;
  const percentageUsed = Math.min(100, Math.round((effectiveTotal / Math.max(1, effectiveBudget)) * 100));

  // Map category names to standard 6 categories (Requirement 11)
  const standardizedTotals = {
    Hotel: totals.Hotel || 0,
    Food: totals.Food || 0,
    Transportation: totals.Transportation || totals.Transport || 0,
    Activities: totals.Activities || 0,
    Shopping: totals.Shopping || 0,
    Other: totals.Other || 0
  };

  const pieData = Object.entries(standardizedTotals)
    .filter(([_, val]) => val > 0)
    .map(([name, value]) => ({
      name,
      value: Number(value)
    }));

  // Comparison Bar Data (Total Budget vs Used Budget vs Remaining Budget) - Requirement 11
  const comparisonData = [
    { name: 'Total Budget', amount: effectiveBudget, fill: '#0284c7' },
    { name: 'Used Budget', amount: effectiveTotal, fill: exceeded ? '#e11d48' : '#38bdf8' },
    { name: 'Remaining', amount: Math.max(0, effectiveRemaining), fill: '#10b981' }
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Status & Over-budget Alert Banner (Requirement 11) */}
      {exceeded ? (
        <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 space-y-3 animate-slide-up shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-200 text-rose-800 shrink-0">
              <AlertTriangle className="w-5 h-5 text-rose-700" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-black text-rose-950">
                  Your trip is over budget.
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-900">
                  Over by {currencySymbol}{overspendAmount.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                Projected spend of <strong>{currencySymbol}{effectiveTotal.toLocaleString()}</strong> exceeds your planned ceiling of <strong>{currencySymbol}{effectiveBudget.toLocaleString()}</strong>.
              </p>
            </div>
          </div>

          {/* Simple Alternatives as mandated by Requirement 11 */}
          <div className="pt-2 border-t border-rose-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-900 block mb-2">
              💡 Simple Alternatives to Balance Your Budget:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-white/90 border border-rose-200 shadow-2xs">
                <span className="font-bold text-slate-900 block mb-0.5">🏨 Cheaper Hotel:</span>
                <span className="text-slate-600 text-[11px]">Select a boutique homestay or standard room to save up to 35% on accommodation.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/90 border border-rose-200 shadow-2xs">
                <span className="font-bold text-slate-900 block mb-0.5">🎟️ Cheaper Activity:</span>
                <span className="text-slate-600 text-[11px]">Swap ticketed attractions with free scenic beaches, nature trails or heritage walks.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/90 border border-rose-200 shadow-2xs">
                <span className="font-bold text-slate-900 block mb-0.5">🍲 Cheaper Food:</span>
                <span className="text-slate-600 text-[11px]">Try authentic regional street eateries and beach shacks instead of hotel dining.</span>
              </div>
            </div>
            <p className="text-[10px] text-rose-700 italic mt-2">
              * TripMate does not automatically remove any activities or bookings. You have full manual control.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between gap-3 animate-fade-in shadow-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <h4 className="text-xs font-black text-emerald-950">Budget Healthy & On Track</h4>
              <p className="text-[11px] text-emerald-700">
                You have {currencySymbol}{effectiveRemaining.toLocaleString()} remaining buffer ({100 - percentageUsed}% surplus).
              </p>
            </div>
          </div>
          <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-emerald-200/80 text-emerald-900">
            {percentageUsed}% Allocated
          </span>
        </div>
      )}

      {/* 2. Visual Graphs Grid (Donut & Total vs Used vs Remaining Bar Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Share Breakdown Donut Chart */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
              Category Expense Breakdown
            </h4>
            <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
              6 Categories
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  animationDuration={800}
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={CATEGORY_COLORS[entry.name] || '#64748b'}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${currencySymbol}${Number(value).toLocaleString()}`, 'Cost']}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
                    fontSize: '12px',
                    fontWeight: 700
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Interactive Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-100">
            {Object.entries(standardizedTotals).map(([cat, val]) => (
              <div key={cat} className="flex items-center gap-1.5 p-1 rounded-lg">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[cat] || '#64748b' }}
                />
                <span className="text-slate-600 truncate">{cat}:</span>
                <span className="font-bold text-slate-900 ml-auto">{currencySymbol}{Number(val).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Budget vs Used Budget vs Remaining Budget (Requirement 11) */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
              Total vs Used vs Remaining Budget
            </h4>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              Comparison
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 15, right: 15, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                  interval={0}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  tickFormatter={(val) => `${currencySymbol}${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                />
                <Tooltip
                  formatter={(val) => [`${currencySymbol}${Number(val).toLocaleString()}`, 'Amount']}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
                    fontSize: '12px',
                    fontWeight: 700
                  }}
                />
                <Bar
                  dataKey="amount"
                  radius={[8, 8, 0, 0]}
                  animationDuration={900}
                >
                  {comparisonData.map((entry) => (
                    <Cell key={`bar-${entry.name}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Metrics Bar under Chart */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-slate-100">
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Budget</span>
              <span className="font-black text-sky-700">{currencySymbol}{effectiveBudget.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Spent</span>
              <span className={`font-black ${exceeded ? 'text-rose-600' : 'text-slate-900'}`}>
                {currencySymbol}{effectiveTotal.toLocaleString()}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Buffer</span>
              <span className={`font-black ${effectiveRemaining < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {effectiveRemaining < 0 ? `-${currencySymbol}${Math.abs(effectiveRemaining).toLocaleString()}` : `${currencySymbol}${effectiveRemaining.toLocaleString()}`}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default BudgetChart;
