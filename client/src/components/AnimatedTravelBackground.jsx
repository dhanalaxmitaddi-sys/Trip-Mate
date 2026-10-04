import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * AnimatedTravelBackground
 * 
 * Reusable Global Travel-Themed Animated Background System.
 * Placed at root application level behind all content with z-index: -1.
 * 
 * Specifications:
 * 1. Base gradient: #F5F9FC, #EFF8FF, #F0FDFA, #F8FAFC
 * 2. 4 Large blurred gradient blobs (blue/cyan, soft teal, light sky, light warm yellow)
 * 3. Moving clouds (L->R 45s, R->L 60s, L->R 70s, R->L 55s)
 * 4. Curved dashed travel route lines with continuous dashoffset animation
 * 5. 6 Location dots with soft scale/opacity expanding pulse
 * 6. ONE small airplane traveling left-bottom -> center -> right-top over 42s
 * 7. 18 subtle floating particles (auto-reduced to 9 on mobile)
 * 8. 35s subtle global background color shift
 * 9. Smooth page-specific modulation without unmounting or restarting
 * 10. Respects prefers-reduced-motion
 */

// Soft Modern Minimalist Cloud SVG
const TravelCloud = ({ className = '', opacity = 0.35 }) => (
  <svg
    viewBox="0 0 200 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ opacity }}
    aria-hidden="true"
  >
    <path
      d="M30 60 C 18 60 10 52 14 40 C 16 30 28 28 34 30 C 40 18 56 12 72 18 C 82 8 100 6 114 14 C 126 10 138 16 144 24 C 156 24 166 32 164 44 C 174 48 172 60 160 60 Z"
      fill="url(#cloudSoftGrad)"
    />
    <defs>
      <linearGradient id="cloudSoftGrad" x1="0" y1="0" x2="0" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="1" stopColor="#e0f2fe" stopOpacity="0.4" />
      </linearGradient>
    </defs>
  </svg>
);

// Minimalist Airplane Icon with Soft Jet Contrail
const TravelAirplane = ({ opacity = 0.65 }) => (
  <div
    className="absolute left-0 top-0 pointer-events-none select-none animate-airplane-travel"
    style={{ opacity }}
    aria-hidden="true"
  >
    <div className="relative flex items-center">
      {/* Contrail trail trailing behind */}
      <div className="w-24 sm:w-36 h-[2px] bg-gradient-to-l from-sky-400/40 via-cyan-300/20 to-transparent rounded-full -mr-1 blur-[0.5px]" />
      
      {/* Simple Airplane Silhouette */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600/75 drop-shadow-xs transform -rotate-12"
      >
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>
    </div>
  </div>
);

// Location Dot with Soft Expanding Pulse Ring (Requirement 6)
const LocationPulseDot = ({ top, left, label, delay = '0s' }) => (
  <div
    className="absolute pointer-events-none select-none animate-dot-float"
    style={{ top, left }}
    aria-hidden="true"
  >
    <div className="relative flex items-center justify-center">
      {/* Expanding Soft Pulse Ring: scale 1 -> 1.4 -> 1, opacity 0.15 -> 0.35 -> 0.15 */}
      <span
        className="absolute w-5 h-5 rounded-full border border-sky-400/50 animate-location-pulse"
        style={{ animationDelay: delay }}
      />
      {/* Core Dot: 4px */}
      <span className="w-2 h-2 rounded-full bg-blue-600/80 shadow-xs ring-2 ring-white/70" />
      
      {/* Subtle Coordinate/Location Label */}
      {label && (
        <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-wider text-slate-400/50 uppercase whitespace-nowrap hidden lg:block">
          {label}
        </span>
      )}
    </div>
  </div>
);

export const AnimatedTravelBackground = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Page-specific theme weights (Requirement 14)
  // Keeps the same global background system everywhere with subtle intensity modulation
  const theme = useMemo(() => {
    // HOME: clouds + route + airplane
    if (pathname === '/home' || pathname === '/') {
      return {
        clouds: 0.85,
        route: 0.75,
        dots: 0.55,
        particles: 0.45,
        plane: 0.75,
      };
    }
    // EXPLORE: location dots + route
    if (pathname === '/explore') {
      return {
        clouds: 0.35,
        route: 0.85,
        dots: 0.95,
        particles: 0.35,
        plane: 0.35,
      };
    }
    // PLAN TRIP: route + moving destination dots
    if (pathname === '/plan') {
      return {
        clouds: 0.35,
        route: 0.95,
        dots: 0.9,
        particles: 0.3,
        plane: 0.5,
      };
    }
    // TRIP RESULTS / MY TRIPS: destination route + location dots + soft floating particles
    if (pathname === '/trips') {
      return {
        clouds: 0.4,
        route: 0.75,
        dots: 0.7,
        particles: 0.9,
        plane: 0.45,
      };
    }
    // OFFERS: very subtle floating particles
    if (pathname === '/offers') {
      return {
        clouds: 0.3,
        route: 0.25,
        dots: 0.3,
        particles: 0.85,
        plane: 0.2,
      };
    }
    // ACCOUNT: minimal soft gradient
    if (pathname === '/account') {
      return {
        clouds: 0.35,
        route: 0.15,
        dots: 0.2,
        particles: 0.2,
        plane: 0.15,
      };
    }
    // LOGIN / REGISTER: clouds + soft gradient
    if (pathname === '/login' || pathname === '/register') {
      return {
        clouds: 0.85,
        route: 0.2,
        dots: 0.4,
        particles: 0.25,
        plane: 0.35,
      };
    }
    // Default fallback
    return {
      clouds: 0.6,
      route: 0.6,
      dots: 0.6,
      particles: 0.5,
      plane: 0.5,
    };
  }, [pathname]);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none contain-strict travel-global-bg"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      {/* =====================================================================
          1. MOVING GRADIENT BACKGROUND (Requirement 3: 4 blurred gradient blobs)
          ===================================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Blob 1: Blue/Cyan (Left -> Center -> Right -> Center, 35s) */}
        <div className="absolute -top-12 -left-12 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-blue-500/16 to-cyan-400/22 blur-3xl animate-blob-1-travel" />

        {/* Blob 2: Soft Teal (Top -> Bottom -> Top, 42s) */}
        <div className="absolute top-0 left-1/3 w-[460px] h-[460px] rounded-full bg-gradient-to-br from-teal-400/15 to-emerald-300/14 blur-3xl animate-blob-2-travel" />

        {/* Blob 3: Light Sky Blue (Right -> Left -> Right, 30s) */}
        <div className="absolute top-1/4 -right-12 w-[560px] h-[560px] rounded-full bg-gradient-to-bl from-sky-400/18 to-cyan-300/16 blur-3xl animate-blob-3-travel" />

        {/* Blob 4: Very Light Warm Yellow (Slow diagonal movement, 38s) */}
        <div className="absolute bottom-10 right-1/4 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-amber-300/14 to-yellow-200/10 blur-3xl animate-blob-4-travel" />
      </div>

      {/* =====================================================================
          2. MOVING TRAVEL ROUTE (Requirement 5: curved dashed paths with flow)
          ===================================================================== */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: theme.route }}
      >
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full opacity-70"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="travelRouteGradA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.05" />
              <stop offset="30%" stopColor="#2563EB" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="travelRouteGradB" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.04" />
              <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.20" />
              <stop offset="80%" stopColor="#2563EB" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* Upper Primary Continental Route (Location A -> Location B) */}
          <path
            d="M -40 250 C 240 130, 560 370, 900 170 S 1300 270, 1520 140"
            stroke="url(#travelRouteGradA)"
            strokeWidth="1.75"
            strokeDasharray="6 10"
            className="animate-route-flow"
          />

          {/* Cross-branching Flight Waypoint Trail */}
          <path
            d="M 240 130 Q 480 460 900 170"
            stroke="url(#travelRouteGradA)"
            strokeWidth="1.25"
            strokeDasharray="4 8"
            className="animate-route-flow"
          />

          {/* Lower Regional Exploration Route */}
          <path
            d="M -30 690 C 320 570, 690 790, 1060 640 S 1360 730, 1530 610"
            stroke="url(#travelRouteGradB)"
            strokeWidth="1.5"
            strokeDasharray="5 9"
            className="animate-route-flow-reverse"
          />
        </svg>
      </div>

      {/* =====================================================================
          3. MOVING CLOUDS (Requirement 4: 4 soft cloud shapes with dual drift)
          ===================================================================== */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: theme.clouds }}
      >
        {/* Cloud 1: Left -> Right, 45s */}
        <div
          className="absolute top-[6%] -left-64 animate-cloud-l2r-45"
          style={{ animationDelay: '-12s' }}
        >
          <TravelCloud className="w-56 sm:w-72 h-auto" opacity={0.42} />
        </div>

        {/* Cloud 2: Right -> Left, 60s */}
        <div
          className="absolute top-[24%] -right-72 animate-cloud-r2l-60"
          style={{ animationDelay: '-28s' }}
        >
          <TravelCloud className="w-64 sm:w-88 h-auto" opacity={0.34} />
        </div>

        {/* Cloud 3: Left -> Right, 70s */}
        <div
          className="absolute top-[62%] -left-64 animate-cloud-l2r-70"
          style={{ animationDelay: '-38s' }}
        >
          <TravelCloud className="w-56 sm:w-80 h-auto" opacity={0.30} />
        </div>

        {/* Cloud 4: Right -> Left, 55s (Hidden on small mobile for clean view) */}
        <div
          className="absolute top-[80%] -right-64 animate-cloud-r2l-55 mobile-hide-decor"
          style={{ animationDelay: '-18s' }}
        >
          <TravelCloud className="w-60 sm:w-84 h-auto" opacity={0.28} />
        </div>
      </div>

      {/* =====================================================================
          4. MOVING AIRPLANE (Requirement 7: ONE airplane, left-bottom -> center -> right-top, 42s)
          ===================================================================== */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: theme.plane }}
      >
        <TravelAirplane opacity={0.7} />
      </div>

      {/* =====================================================================
          5. MOVING LOCATION DOTS (Requirement 6: 6 dots with expanding pulse)
          ===================================================================== */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: theme.dots }}
      >
        <LocationPulseDot top="18%" left="17%" label="Location A" delay="0s" />
        <LocationPulseDot top="26%" left="62%" label="Hub Central" delay="1.2s" />
        <LocationPulseDot top="38%" left="86%" label="Location B" delay="2.4s" />
        <LocationPulseDot top="65%" left="24%" label="Coast Point" delay="0.8s" />
        <LocationPulseDot top="74%" left="72%" label="Location C" delay="1.8s" />
        <LocationPulseDot top="82%" left="44%" label="South Bay" delay="3.0s" />
      </div>

      {/* =====================================================================
          6. FLOATING PARTICLES (Requirement 8: 18 particles, 9 on mobile, blue/cyan/teal)
          ===================================================================== */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: theme.particles }}
      >
        {/* Core Mobile & Desktop Particles (9 count) */}
        <div className="absolute top-[14%] left-[24%] w-1.5 h-1.5 rounded-full bg-blue-500/20 animate-particle-drift-a" />
        <div className="absolute top-[28%] left-[72%] w-1 h-1 rounded-full bg-sky-400/22 animate-particle-drift-b" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-[42%] left-[16%] w-1.5 h-1.5 rounded-full bg-cyan-400/20 animate-particle-drift-a" style={{ animationDelay: '-7s' }} />
        <div className="absolute top-[55%] left-[84%] w-1 h-1 rounded-full bg-teal-400/20 animate-particle-drift-b" style={{ animationDelay: '-11s' }} />
        <div className="absolute top-[68%] left-[38%] w-1.5 h-1.5 rounded-full bg-sky-400/22 animate-particle-drift-a" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-[78%] left-[78%] w-1 h-1 rounded-full bg-blue-500/18 animate-particle-drift-b" style={{ animationDelay: '-13s' }} />
        <div className="absolute top-[86%] left-[22%] w-1.5 h-1.5 rounded-full bg-teal-400/18 animate-particle-drift-a" style={{ animationDelay: '-9s' }} />
        <div className="absolute top-[22%] left-[48%] w-1 h-1 rounded-full bg-cyan-400/20 animate-particle-drift-b" style={{ animationDelay: '-15s' }} />
        <div className="absolute top-[92%] left-[58%] w-1.5 h-1.5 rounded-full bg-blue-500/20 animate-particle-drift-a" style={{ animationDelay: '-4s' }} />

        {/* Desktop-Only Particles (9 additional count, hidden on mobile for optimization) */}
        <div className="absolute top-[10%] left-[64%] w-1.5 h-1.5 rounded-full bg-sky-400/20 animate-particle-drift-a mobile-hide-decor" style={{ animationDelay: '-6s' }} />
        <div className="absolute top-[32%] left-[32%] w-1 h-1 rounded-full bg-teal-400/22 animate-particle-drift-b mobile-hide-decor" style={{ animationDelay: '-8s' }} />
        <div className="absolute top-[48%] left-[62%] w-1.5 h-1.5 rounded-full bg-blue-500/18 animate-particle-drift-a mobile-hide-decor" style={{ animationDelay: '-10s' }} />
        <div className="absolute top-[60%] left-[12%] w-1 h-1 rounded-full bg-cyan-400/20 animate-particle-drift-b mobile-hide-decor" style={{ animationDelay: '-12s' }} />
        <div className="absolute top-[72%] left-[52%] w-1.5 h-1.5 rounded-full bg-sky-400/22 animate-particle-drift-a mobile-hide-decor" style={{ animationDelay: '-14s' }} />
        <div className="absolute top-[80%] left-[88%] w-1 h-1 rounded-full bg-teal-400/18 animate-particle-drift-b mobile-hide-decor" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-[18%] left-[82%] w-1.5 h-1.5 rounded-full bg-blue-500/20 animate-particle-drift-a mobile-hide-decor" style={{ animationDelay: '-16s' }} />
        <div className="absolute top-[50%] left-[92%] w-1 h-1 rounded-full bg-cyan-400/18 animate-particle-drift-b mobile-hide-decor" style={{ animationDelay: '-1s' }} />
        <div className="absolute top-[36%] left-[10%] w-1.5 h-1.5 rounded-full bg-sky-400/20 animate-particle-drift-a mobile-hide-decor" style={{ animationDelay: '-17s' }} />
      </div>
    </div>
  );
};

export default AnimatedTravelBackground;

