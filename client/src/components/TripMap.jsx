import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Compass, AlertCircle, RefreshCw, Car, Clock } from 'lucide-react';

// Known hubs coordinates for manual origin input
const COMMON_ORIGINS = [
  { name: 'Current Location (GPS)', lat: null, lng: null },
  { name: 'Mumbai, India', lat: 19.0760, lng: 72.8777 },
  { name: 'Delhi, India', lat: 28.6139, lng: 77.2090 },
  { name: 'Bengaluru, India', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad, India', lat: 17.3850, lng: 78.4867 },
  { name: 'Chennai, India', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata, India', lat: 22.5726, lng: 88.3639 },
  { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'London, UK', lat: 51.5074, lng: -0.1278 }
];

export const TripMap = ({
  destinationName = 'Destination',
  destinationCoords = { lat: 15.2993, lng: 74.1240 }, // Default Goa
  places = [],
  fromLocationName = 'Current Location'
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeLayerRef = useRef(null);
  const markersLayerRef = useRef(null);

  const [origin, setOrigin] = useState({
    name: fromLocationName || 'Current Location',
    lat: 19.0760, // Default Mumbai origin
    lng: 72.8777
  });
  const [manualInput, setManualInput] = useState('');
  const [locating, setLocating] = useState(false);
  const [routeInfo, setRouteInfo] = useState({
    distanceKm: 0,
    durationHours: 0,
    isDemo: false
  });
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Detect Browser Geolocation
  const detectCurrentLocation = () => {
    setLocating(true);
    setErrorMsg('');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setOrigin({
            name: 'My Current Location (GPS)',
            lat: userLat,
            lng: userLng
          });
          setLocating(false);
        },
        (err) => {
          console.warn('Geolocation denied or unavailable:', err.message);
          setErrorMsg('Location permission denied or unavailable. Using manual origin.');
          setLocating(false);
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    } else {
      setErrorMsg('Geolocation not supported by your browser.');
      setLocating(false);
    }
  };

  // 2. Initialize Leaflet Map
  useEffect(() => {
    if (!window.L || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = window.L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false
      }).setView([destinationCoords.lat, destinationCoords.lng], 10);

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      routeLayerRef.current = window.L.layerGroup().addTo(map);
      markersLayerRef.current = window.L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      // Keep instance for smoother tab switches
    };
  }, []);

  // 3. Draw Route & Markers whenever origin or destination changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !window.L) return;

    // Clear previous layers
    if (routeLayerRef.current) routeLayerRef.current.clearLayers();
    if (markersLayerRef.current) markersLayerRef.current.clearLayers();

    const destLat = Number(destinationCoords?.lat) || 15.2993;
    const destLng = Number(destinationCoords?.lng) || 74.1240;

    // Destination Marker Icon (Sky Blue)
    const destIcon = window.L.divIcon({
      className: 'custom-dest-pin',
      html: `<div style="background-color: #0284c7; color: white; border: 2px solid white; border-radius: 9999px; padding: 6px 10px; font-weight: 900; font-size: 11px; box-shadow: 0 4px 12px rgba(2,132,199,0.4); display: flex; align-items: center; gap: 4px;">
              <span>📍</span> <span>${destinationName}</span>
             </div>`,
      iconSize: [120, 36],
      iconAnchor: [60, 36]
    });

    const destMarker = window.L.marker([destLat, destLng], { icon: destIcon })
      .bindPopup(`<strong>${destinationName}</strong><br/>Destination`)
      .addTo(markersLayerRef.current);

    // Origin Marker (Coral/Emerald)
    let originMarker = null;
    if (origin.lat && origin.lng) {
      const originIcon = window.L.divIcon({
        className: 'custom-origin-pin',
        html: `<div style="background-color: #0f172a; color: white; border: 2px solid white; border-radius: 9999px; padding: 6px 10px; font-weight: 800; font-size: 11px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 4px;">
                <span>🟢</span> <span>${origin.name}</span>
               </div>`,
        iconSize: [130, 36],
        iconAnchor: [65, 36]
      });

      originMarker = window.L.marker([origin.lat, origin.lng], { icon: originIcon })
        .bindPopup(`<strong>${origin.name}</strong><br/>Starting Point`)
        .addTo(markersLayerRef.current);
    }

    // Place Markers for Sights
    if (places && places.length > 0) {
      places.slice(0, 6).forEach((place, idx) => {
        const offsetLat = destLat + (Math.sin(idx * 1.2) * 0.04);
        const offsetLng = destLng + (Math.cos(idx * 1.2) * 0.04);

        const placeIcon = window.L.divIcon({
          className: 'custom-place-pin',
          html: `<div style="background-color: #3b82f6; color: white; width: 22px; height: 22px; border-radius: 9999px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
                  ${idx + 1}
                 </div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });

        window.L.marker([offsetLat, offsetLng], { icon: placeIcon })
          .bindPopup(`<strong>${place.name}</strong><br/>${place.category || 'Sight'} • ${place.location || destinationName}`)
          .addTo(markersLayerRef.current);
      });
    }

    // Calculate Route: Try OSRM routing; if it fails or coordinates cross oceans, draw geodesic line
    if (origin.lat && origin.lng) {
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destLng},${destLat}?overview=full&geometries=geojson`;

      fetch(osrmUrl)
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
            const route = data.routes[0];
            const coordinates = route.geometry.coordinates.map((coord) => [coord[1], coord[0]]);

            const polyline = window.L.polyline(coordinates, {
              color: '#0284c7',
              weight: 5,
              opacity: 0.85,
              dashArray: null
            }).addTo(routeLayerRef.current);

            map.fitBounds(polyline.getBounds(), { padding: [40, 40] });

            setRouteInfo({
              distanceKm: Math.round(route.distance / 1000),
              durationHours: (route.duration / 3600).toFixed(1),
              isDemo: false
            });
          } else {
            fallbackDemoRoute(map, origin.lat, origin.lng, destLat, destLng);
          }
        })
        .catch(() => {
          fallbackDemoRoute(map, origin.lat, origin.lng, destLat, destLng);
        });
    } else {
      map.setView([destLat, destLng], 12);
    }
  }, [origin, destinationCoords, destinationName, places]);

  // Fallback demo route calculation
  const fallbackDemoRoute = (map, origLat, origLng, destLat, destLng) => {
    // Great circle approximation
    const dLat = (destLat - origLat) * (Math.PI / 180);
    const dLon = (destLng - origLng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(origLat * (Math.PI / 180)) *
        Math.cos(destLat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const approxKm = Math.round(6371 * c);

    const line = window.L.polyline(
      [
        [origLat, origLng],
        [destLat, destLng]
      ],
      {
        color: '#0284c7',
        weight: 4,
        dashArray: '8, 8',
        opacity: 0.8
      }
    ).addTo(routeLayerRef.current);

    map.fitBounds(line.getBounds(), { padding: [40, 40] });

    setRouteInfo({
      distanceKm: approxKm,
      durationHours: (approxKm / 70).toFixed(1),
      isDemo: true
    });
  };

  const handleManualOriginSelect = (preset) => {
    if (preset.lat === null) {
      detectCurrentLocation();
    } else {
      setOrigin({
        name: preset.name,
        lat: preset.lat,
        lng: preset.lng
      });
      setErrorMsg('');
    }
  };

  const handleCustomManualSubmit = (e) => {
    e.preventDefault();
    if (!manualInput.trim()) return;

    const matched = COMMON_ORIGINS.find(o => o.name.toLowerCase().includes(manualInput.toLowerCase()));
    if (matched && matched.lat !== null) {
      handleManualOriginSelect(matched);
      setManualInput('');
    } else {
      // Simulate geocoding to approximate center
      setOrigin({
        name: manualInput.trim(),
        lat: 20.5937 + (Math.random() - 0.5) * 4,
        lng: 78.9629 + (Math.random() - 0.5) * 4
      });
      setManualInput('');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4 font-sans">
      
      {/* Map Header & Controls */}
      <div className="p-5 pb-3 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-sky-600 animate-spin-slow" />
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Interactive Route Map & Navigation
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
              OpenStreetMap & OSRM
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Route from <strong className="text-slate-800">{origin.name}</strong> to{' '}
            <strong className="text-sky-600">{destinationName}</strong>
          </p>
        </div>

        {/* Origin Selector & GPS Detector Button */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={detectCurrentLocation}
            disabled={locating}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            title="Use Device GPS"
          >
            <Navigation className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
            <span>{locating ? 'Detecting GPS...' : 'Use Current Location'}</span>
          </button>

          {/* Quick preset selector */}
          <select
            value={origin.name}
            onChange={(e) => {
              const selected = COMMON_ORIGINS.find(o => o.name === e.target.value);
              if (selected) handleManualOriginSelect(selected);
            }}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden"
          >
            {COMMON_ORIGINS.map((o) => (
              <option key={o.name} value={o.name}>{o.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Manual Origin Input Form if location unavailable */}
      <div className="px-5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <form onSubmit={handleCustomManualSubmit} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Or type origin city (e.g. Hyderabad)..."
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:border-sky-500 focus:outline-hidden w-60"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
          >
            Set Origin
          </button>
        </form>

        {/* Live Route Distance and Duration Stats */}
        {routeInfo.distanceKm > 0 && (
          <div className="flex items-center gap-3 text-xs bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 text-sky-950 font-semibold">
            <span className="flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-sky-600" />
              <span>Distance: <strong>{routeInfo.distanceKm.toLocaleString()} km</strong></span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Est. Time: <strong>~{routeInfo.durationHours} hrs</strong></span>
            </span>
            {routeInfo.isDemo && (
              <span className="text-[10px] text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded font-bold">
                Airway Line
              </span>
            )}
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="mx-5 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Leaflet Map Canvas */}
      <div className="relative h-80 sm:h-96 w-full bg-slate-100">
        <div ref={mapContainerRef} className="h-full w-full z-10" />

        {/* Floating Map Legend */}
        <div className="absolute bottom-3 left-3 z-20 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 shadow-md text-[11px] flex items-center gap-3 font-semibold text-slate-700">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900" /> Origin
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600" /> Destination
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Sights
          </span>
        </div>
      </div>
    </div>
  );
};

export default TripMap;
