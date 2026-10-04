import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, CheckCircle2, ShieldAlert } from 'lucide-react';

export const GenerationLoader = ({ destinationName = 'Destination', onComplete }) => {
  const steps = [
    'Analyzing destination climate, terrain & seasonal patterns...',
    'Scoring attractions against your selected travel interests...',
    'Balancing morning, afternoon & evening pacing (2-4 activities/day)...',
    'Computing hotel rates, local transport & daily meal budgets...',
    'Synthesizing weather-adapted packing checklist...',
    'Finalizing personalized TripMind AI itinerary!'
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-100 text-center space-y-6 animate-slide-up">
        {/* Animated Radar/Compass Icon */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full bg-primary-400/20 animate-ping"></div>
          <div className="relative w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-white shadow-xl shadow-primary-500/30">
            <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-primary-600 animate-pulse" />
            TripMind AI Engine Active
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Architecting Your Journey to {destinationName}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Synthesizing personalized schedules and budget models without external paid APIs.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="gradient-bg h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        {/* Step Checkpoints */}
        <div className="space-y-2 text-left bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {steps.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={idx}
                className={`flex items-center gap-2.5 text-xs transition-opacity duration-200 ${
                  isDone
                    ? 'text-emerald-700 font-medium'
                    : isCurrent
                    ? 'text-primary-700 font-bold'
                    : 'text-slate-400 opacity-40'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-primary-600 border-t-transparent animate-spin shrink-0"></div>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0"></div>
                )}
                <span className="truncate">{step}</span>
              </div>
            );
          })}
        </div>

        <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
          <span>Using smart local recommendations</span>
        </div>
      </div>
    </div>
  );
};

export default GenerationLoader;
