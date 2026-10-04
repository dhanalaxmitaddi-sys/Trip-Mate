import React from 'react';
import { Star, MapPin, Navigation, Plus, Eye, Tag, Bookmark } from 'lucide-react';
import { openDirections } from '../services/mapsService';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';

export const PlaceCard = ({
  place,
  destinationName = '',
  onAddToItinerary,
  onViewDetails
}) => {
  const { toggleSavePlace, isPlaceSaved } = useAuth();
  const { showSuccess, showInfo } = useUI();
  const saved = isPlaceSaved ? isPlaceSaved(place.id) : false;

  const handleDirections = (e) => {
    e.stopPropagation();
    openDirections(place.name, place.location || destinationName);
  };

  const handleToggleSave = async (e) => {
    e.stopPropagation();
    if (!toggleSavePlace) return;
    const res = await toggleSavePlace(place);
    if (res?.action === 'saved') {
      showSuccess(`Saved "${place.name}" to your Account profile!`);
    } else {
      showInfo(`Removed "${place.name}" from saved places.`);
    }
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group">
      {/* Image Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={place.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-slate-900/80 backdrop-blur-md shadow-xs border border-white/20">
            {place.category}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-amber-500 text-xs font-bold shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{place.rating || 4.5}</span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3 text-white">
          <div className="text-[10px] uppercase font-semibold text-slate-300">Est. Price</div>
          <div className="text-sm font-extrabold">
            {place.price > 0 ? `₹${place.price.toLocaleString()}` : 'Free Entry'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h4 className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
            {place.name}
          </h4>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{place.location || destinationName}</span>
          </div>

          <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
            {place.description}
          </p>

          {/* Tags */}
          {place.tags && place.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {place.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions Button Bar (Requirement 21: Add to Trip button, Save button) */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          {onAddToItinerary && (
            <button
              type="button"
              onClick={() => onAddToItinerary(place)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs font-semibold transition-colors"
              title="Add place to itinerary"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Plan</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleSave}
            className={`p-2 rounded-xl border transition-all ${
              saved
                ? 'bg-amber-50 border-amber-300 text-amber-600'
                : 'bg-slate-100 hover:bg-slate-200 border-transparent text-slate-500 hover:text-slate-800'
            }`}
            title={saved ? 'Saved in Account Profile' : 'Save Place to Profile'}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => onViewDetails(place)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleDirections}
            className="p-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-xs transition-all hover:scale-105"
            title="Get Directions on Google Maps"
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
