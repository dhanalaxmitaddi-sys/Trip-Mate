import React from 'react';
import { X, Star, MapPin, Clock, Navigation, Plus, Tag } from 'lucide-react';
import { openDirections } from '../services/mapsService';

export const PlaceDetailModal = ({
  place,
  destinationName = '',
  isOpen,
  onClose,
  onAddToItinerary
}) => {
  if (!isOpen || !place) return null;

  const handleDirections = () => {
    openDirections(place.name, place.location || destinationName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-slide-up flex flex-col max-h-[90vh]">
        {/* Cover Image */}
        <div className="relative h-60 w-full bg-slate-900 shrink-0">
          <img
            src={place.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-primary-600 text-white text-xs font-bold uppercase tracking-wider">
                {place.category}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{place.rating || 4.5}</span>
              </div>
            </div>
            <h3 className="text-xl font-black">{place.name}</h3>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary-600 shrink-0" />
              <span>{place.location || destinationName}</span>
            </div>
            {place.openingHours && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{place.openingHours}</span>
              </div>
            )}
            <div className="font-bold text-slate-900">
              {place.price > 0 ? `Est. Price: ₹${place.price.toLocaleString()}` : 'Free Attraction'}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">About This Spot</h4>
            <p className="text-xs leading-relaxed text-slate-600">{place.description}</p>
          </div>

          {place.bestTimeToVisit && (
            <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3 text-xs text-amber-800">
              <strong>Best Time to Visit:</strong> {place.bestTimeToVisit}
            </div>
          )}

          {/* Tags */}
          {place.tags && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Tags & Highlights</h4>
              <div className="flex flex-wrap gap-2">
                {place.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleDirections}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold transition-colors"
          >
            <Navigation className="w-4 h-4 text-primary-600" />
            <span>Open Google Maps</span>
          </button>

          {onAddToItinerary && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onAddToItinerary(place);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold shadow-md shadow-primary-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Active Trip</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailModal;
