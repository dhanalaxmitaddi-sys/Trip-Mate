import React, { useState, useEffect } from 'react';
import { Sun, CloudRain, CloudSun, CloudFog, CloudSnow, Droplets, Thermometer, Sparkles } from 'lucide-react';
import api from '../services/api';
import { destinations } from '../data/destinations';
import { getOrGenerateDestination } from '../services/destinationService';

export const WeatherPanel = ({ destinationId, startDate, endDate }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [destInfo, setDestInfo] = useState(null);

  useEffect(() => {
    if (!destinationId) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const res = await api.get('/weather', {
          params: { destinationId, startDate, endDate }
        });
        const forecastList = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : null);
        if (forecastList && forecastList.length > 0) {
          setForecast(forecastList);
          const dest = getOrGenerateDestination(destinationId);
          setDestInfo(dest);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Weather API failed, fallback to local data');
      }

      // Local fallback
      const dest = getOrGenerateDestination(destinationId) || destinations[0];
      setDestInfo(dest);

      const start = startDate ? new Date(startDate) : new Date();
      const end = endDate ? new Date(endDate) : new Date(Date.now() + 86400000 * 3);
      const diffDays = Math.max(1, Math.min(7, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1));

      const days = [];
      for (let i = 0; i < diffDays; i++) {
        const d = new Date(start);
        d.setDate(d.getDate() + i);
        const month = d.getMonth() + 1;
        const mw = dest.weather.find(w => w.month === month) || dest.weather[0];

        days.push({
          dayNumber: i + 1,
          date: d.toISOString().split('T')[0],
          tempC: mw.tempC + ((i % 3) - 1),
          condition: mw.condition,
          humidity: mw.humidity,
          icon: mw.icon,
          suggestion: mw.suggestion
        });
      }
      setForecast(days);
      setLoading(false);
    };

    fetchWeather();
  }, [destinationId, startDate, endDate]);

  const getWeatherIcon = (condition = '', iconType = '') => {
    const c = condition.toLowerCase();
    if (c.includes('rain') || c.includes('shower')) return <CloudRain className="w-6 h-6 text-sky-500" />;
    if (c.includes('snow')) return <CloudSnow className="w-6 h-6 text-cyan-400" />;
    if (c.includes('fog') || c.includes('chilly')) return <CloudFog className="w-6 h-6 text-slate-400" />;
    if (c.includes('cloud')) return <CloudSun className="w-6 h-6 text-amber-500" />;
    return <Sun className="w-6 h-6 text-amber-500" />;
  };

  if (loading) {
    return (
      <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-400">
        Loading climate forecast...
      </div>
    );
  }

  if (forecast.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-primary-600" />
            <span>Weather Forecast & Travel Conditions</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {destInfo ? `${destInfo.name} (${destInfo.state})` : 'Destination'} • Seasonal climate intelligence
          </p>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          Demo Weather Engine
        </span>
      </div>

      {/* Cards Slider/Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {forecast.map((day) => (
          <div
            key={day.date}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-primary-200 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-primary-700 uppercase tracking-wider">
                  Day {day.dayNumber}
                </div>
                <div className="text-xs font-semibold text-slate-700">{day.date}</div>
              </div>
              <div className="p-2 rounded-xl bg-white shadow-2xs">
                {getWeatherIcon(day.condition, day.icon)}
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-black text-slate-900">
                {day.tempC}°<span className="text-sm font-semibold text-slate-400">C</span>
              </div>
              <div className="text-xs font-medium text-slate-600 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-sky-500" />
                <span>{day.humidity}% hum.</span>
              </div>
            </div>

            <div className="text-xs font-semibold text-slate-800">
              {day.condition}
            </div>

            {day.suggestion && (
              <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/60 leading-relaxed flex items-start gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                <span>{day.suggestion}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherPanel;
