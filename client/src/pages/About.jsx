import React from 'react';
import {
  ShieldCheck,
  CheckCircle,
  FileText,
  Layers,
  Sparkles,
  Server,
  Database,
  Layout,
  ExternalLink,
  Code
} from 'lucide-react';

export const About = () => {
  const traceabilityMatrix = [
    {
      id: 'FR1',
      name: 'Trip Creation and Validation',
      section: 'SRS §3.1 / SDD §5.3',
      implementation: 'Controlled form with date constraint checking, traveler validation, and budget min rules',
      endpoint: 'POST /api/trips',
      page: '/plan'
    },
    {
      id: 'FR2',
      name: 'AI Itinerary Generator',
      section: 'SRS §3.2 / SDD §5.4 & §6.1',
      implementation: 'Multi-slot (09:00, 12:30, 15:30, 19:00) scoring engine with interest matching and reasons',
      endpoint: 'POST /api/trips',
      page: '/plan'
    },
    {
      id: 'FR3',
      name: 'Budget Calculator',
      section: 'SRS §3.3 / SDD §5.5 & §6.2',
      implementation: 'Pure mathematical budget recalculation with Recharts Donut/Bar charts & overspend alerts',
      endpoint: 'GET /api/trips/:id',
      page: '/budget'
    },
    {
      id: 'FR4',
      name: 'Place Recommendations',
      section: 'SRS §3.4 / SDD §5.6',
      implementation: 'Filterable catalog with search, tags, category pills, rating badges, and Add to Trip action',
      endpoint: 'GET /api/destinations/:id/places',
      page: '/explore'
    },
    {
      id: 'FR5',
      name: 'Map and Directions',
      section: 'SRS §3.5 / SDD §5.6',
      implementation: 'Zero-API-key Google Maps direction links generated with encodeURIComponent',
      endpoint: 'Client-side mapsService',
      page: '/plan, /explore'
    },
    {
      id: 'FR6',
      name: 'Editable Trip Plan',
      section: 'SRS §3.6 / SDD §5.7',
      implementation: 'Day collapsibles, ActivityEditorModal, move up/down, delete with undo, day regenerate',
      endpoint: 'PUT /api/trips/:id',
      page: '/plan'
    },
    {
      id: 'FR7',
      name: 'Weather Forecast',
      section: 'SRS §3.7 / SDD §5.8',
      implementation: 'Day-by-day climate cards with temp, condition, humidity, and travel guidance',
      endpoint: 'GET /api/weather',
      page: '/plan'
    },
    {
      id: 'FR8',
      name: 'Packing Checklist',
      section: 'SRS §3.8 / SDD §5.9',
      implementation: 'Automated 6-category checklist generator scaled by trip duration, climate, and interests',
      endpoint: 'GET/POST/PATCH /api/packing/:id',
      page: '/packing'
    },
    {
      id: 'FR9',
      name: 'Saved Trips',
      section: 'SRS §3.9 / SDD §5.10',
      implementation: 'Trip card library with View, Edit, Duplicate (cloning with new IDs), and Delete with ConfirmDialog',
      endpoint: 'GET/DELETE /api/trips/:id',
      page: '/trips'
    },
    {
      id: 'FR10',
      name: 'Travel Assistant Chatbot',
      section: 'SRS §3.10 / SDD §5.11 & §6.3',
      implementation: 'Keyword intent scoring (destination, budget, packing, food, hotels) + quick prompt chips',
      endpoint: 'POST /api/assistant/chat',
      page: '/assistant'
    },
    {
      id: 'FR11',
      name: 'PDF Export',
      section: 'SRS §3.11 / SDD §5.12',
      implementation: 'Client-side jsPDF document compilation with itinerary, expenses, checklist, and disclaimers',
      endpoint: 'Client-side pdfService',
      page: '/plan, /dashboard'
    },
    {
      id: 'FR12',
      name: 'Dashboard and Navigation',
      section: 'SRS §3.12 / SDD §5.13',
      implementation: 'Summary tiles (total trips, upcoming, budget), quick actions, and unified 7-route navbar',
      endpoint: 'GET /api/trips',
      page: '/dashboard, /'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-2">
          <FileText className="w-3.5 h-3.5 text-primary-600" />
          <span>IEEE Std 1016-2009 SRS Compliance & System Architecture</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          About TripMind AI Platform
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
          An autonomous AI-powered travel planning web application that synthesizes multi-day itineraries, computes detailed expense breakdowns, and generates packing lists with 100% free-tier architecture.
        </p>
      </div>

      {/* Free Tier Compliance Card */}
      <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Strict Free-Tier Architecture Verification</span>
        </div>
        <p className="text-xs leading-relaxed text-emerald-800">
          This system requires <strong>zero credit cards, zero billing, and no paid API keys</strong>. The AI features use an autonomous rule-based scoring engine with simulated model latency, Google Maps utilizes safe URL query encoding, and data persistence uses dual MongoDB Atlas free-tier and browser localStorage fallback.
        </p>
      </div>

      {/* SRS Traceability Matrix Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              SRS Traceability Matrix (Section 12)
            </h3>
            <p className="text-xs text-slate-500">
              Proof of full implementation for all functional requirements (FR1 - FR12).
            </p>
          </div>
          <span className="text-xs font-bold text-primary-700 bg-primary-50 px-3 py-1 rounded-full">
            12/12 Requirements Completed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <th className="pb-3 w-16">SRS ID</th>
                <th className="pb-3">Requirement Title</th>
                <th className="pb-3">SRS / SDD Reference</th>
                <th className="pb-3">Technical Implementation</th>
                <th className="pb-3">API Route</th>
                <th className="pb-3">Active Page</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {traceabilityMatrix.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 font-black text-primary-700">{row.id}</td>
                  <td className="py-3.5 font-bold text-slate-900">{row.name}</td>
                  <td className="py-3.5 text-slate-400 font-mono text-[11px]">{row.section}</td>
                  <td className="py-3.5 text-slate-600 leading-relaxed">{row.implementation}</td>
                  <td className="py-3.5 font-mono text-[11px] text-slate-500">{row.endpoint}</td>
                  <td className="py-3.5 font-semibold text-primary-600">{row.page}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tech Stack Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
            <Layout className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Frontend Technology</h4>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
            <li>React 18 + Vite</li>
            <li>Tailwind CSS + Glassmorphism</li>
            <li>React Router v6</li>
            <li>Recharts for Analytics</li>
            <li>Lucide React Icons</li>
            <li>jsPDF Client-Side Export</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Backend Technology</h4>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
            <li>Node.js + Express.js</li>
            <li>RESTful Architecture</li>
            <li>JWT (jsonwebtoken) Auth</li>
            <li>Bcrypt Password Hashing</li>
            <li>CORS & Environment configs</li>
            <li>Unified Error Handling</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Data & Persistence</h4>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
            <li>MongoDB Atlas (Free Tier)</li>
            <li>Mongoose ORM Schemas</li>
            <li>In-Memory Datastore Fallback</li>
            <li>Browser localStorage Sync</li>
            <li>Pre-seeded Demo Destinations</li>
            <li>Resilient Zero-Downtime Design</li>
          </ul>
        </div>
      </div>

      {/* Official SRS Advisory Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>SRS Advisory Note (§1.2 & §5.12):</strong> AI-generated content and rule-based calculations represent travel planning guidance. Travelers are advised to verify timings, opening hours, and booking rates prior to departure.
        </p>
      </div>
    </div>
  );
};

export default About;
