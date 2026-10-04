import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { destinations } from '../data/destinations';
import { searchAllDestinations, getOrGenerateDestination } from '../services/destinationService';
import { useTrip } from '../context/TripContext';
import { useLanguage } from '../context/LanguageContext';
import { useUI } from '../context/UIContext';
import {
  Compass,
  Search,
  Filter,
  MapPin,
  Sparkles,
  Plane,
  Tag,
  Star,
  ArrowRight,
  Eye,
  Calendar,
  X,
  Plus,
  UtensilsCrossed,
  Hotel,
  ShieldAlert,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export const ExplorePlaces = () => {
  const [searchParams] = useSearchParams();
  const { currentTrip, addActivity } = useTrip();
  const { t } = useLanguage();
  const { showSuccess, showError } = useUI();
  const navigate = useNavigate();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Selected Destination for Modal View
  const [selectedDestModal, setSelectedDestModal] = useState(null);

  // Add Place to Trip Modal
  const [addDayModal, setAddDayModal] = useState({
    isOpen: false,
    place: null,
    selectedDay: 1
  });

  // Filter Categories matching Requirement 10
  const filterOptions = [
    { id: 'All', label: t('filterAll'), count: destinations.length },
    { id: 'Domestic', label: t('filterDomestic'), count: destinations.filter(d => !d.isInternational).length },
    { id: 'International', label: t('filterInternational'), count: destinations.filter(d => d.isInternational).length },
    { id: 'Budget', label: t('filterBudget'), count: destinations.filter(d => d.hotelRate <= 3000).length },
    { id: 'Beach', label: t('filterBeach'), count: destinations.filter(d => d.type === 'beach' || (d.places && d.places.some(p => p.category === 'Beach'))).length },
    { id: 'Food', label: t('filterFood'), count: destinations.filter(d => d.foods && d.foods.length > 0).length },
    { id: 'Adventure', label: t('filterAdventure'), count: destinations.filter(d => d.type === 'hill' || (d.places && d.places.some(p => p.tags.includes('Adventure')))).length },
    { id: 'History', label: t('filterHistory'), count: destinations.filter(d => d.type === 'heritage' || (d.places && d.places.some(p => p.category === 'History'))).length },
  ];

  // Filtered Destinations across Global & Domestic sources
  const filteredDestinations = useMemo(() => {
    // When a search query is active, use universal search which supports ANY city
    if (searchQuery.trim()) {
      return searchAllDestinations(searchQuery, selectedFilter === 'All' ? 'All' : selectedFilter);
    }

    // Default view: all destinations from static + knowledge base
    const allKnown = searchAllDestinations('', 'All');

    return allKnown.filter((dest) => {
      // 1. Category Filter
      let matchesFilter = true;
      if (selectedFilter === 'Domestic') {
        matchesFilter = !dest.isInternational;
      } else if (selectedFilter === 'International') {
        matchesFilter = dest.isInternational;
      } else if (selectedFilter === 'Budget') {
        matchesFilter = dest.hotelRate <= 3000;
      } else if (selectedFilter === 'Beach') {
        matchesFilter = dest.type === 'beach' || (dest.places && dest.places.some(p => p.category === 'Beach'));
      } else if (selectedFilter === 'Food') {
        matchesFilter = dest.foods && dest.foods.length > 0;
      } else if (selectedFilter === 'Adventure') {
        matchesFilter = dest.type === 'hill' || (dest.places && dest.places.some(p => p.tags?.includes('Adventure')));
      } else if (selectedFilter === 'History') {
        matchesFilter = dest.type === 'heritage' || (dest.places && dest.places.some(p => p.category === 'History'));
      }

      return matchesFilter;
    });
  }, [selectedFilter, searchQuery]);

  const handlePlanTrip = (destId) => {
    navigate(`/plan?destination=${destId}`);
  };

  const handleOpenAddPlace = (place) => {
    if (!currentTrip) {
      showError('Please create or select an active trip first to add custom places!');
      return;
    }
    setAddDayModal({
      isOpen: true,
      place,
      selectedDay: 1
    });
  };

  const handleConfirmAddPlace = () => {
    if (!currentTrip || !addDayModal.place) return;

    const newActivity = {
      name: addDayModal.place.name,
      category: addDayModal.place.category || 'Sightseeing',
      time: '14:00',
      durationMinutes: 120,
      location: addDayModal.place.location || currentTrip.destinationName,
      cost: addDayModal.place.price || 0,
      costCategory: 'Activities',
      reason: `User added from Explore places: ${addDayModal.place.name}`
    };

    addActivity(addDayModal.selectedDay, newActivity);
    showSuccess(`Added "${addDayModal.place.name}" to Day ${addDayModal.selectedDay}!`);
    setAddDayModal({ isOpen: false, place: null, selectedDay: 1 });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>TripMate Explorer Hub • 19 Global & Indian Destinations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('exploreTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {t('exploreSubtitle')}
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/plan')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white text-xs font-bold shadow-md shadow-sky-600/25 transition-all self-start md:self-auto"
        >
          <Calendar className="w-4 h-4" />
          <span>{t('planMyTripBtn')}</span>
        </button>
      </div>

      {/* Search Bar & Dynamic Counter ("naaku trip seaches chesthet no.of evali") */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            id="input-explore-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-12 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden focus:ring-4 focus:ring-sky-500/15 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dynamic Search Results Counter Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs font-bold">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="text-sky-600 font-black text-sm">
              {filteredDestinations.length}
            </span>
            <span>{t('destinationsFound')}</span>
          </div>
          {searchQuery && (
            <span className="text-[11px] text-slate-400 font-medium">
              Filtered by keyword: <strong className="text-slate-700">"{searchQuery}"</strong>
            </span>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedFilter(opt.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedFilter === opt.id
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              <span>{opt.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedFilter === opt.id ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {opt.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid (Requirement 10: Image, Name, Country, Description, Estimated Budget, Best For, Explore Button) */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              {/* Cover Image & Badges */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={dest.coverImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm ${
                    dest.isInternational ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {dest.isInternational ? 'International' : 'Domestic (India)'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/75 backdrop-blur-xs text-white capitalize">
                    {dest.type}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-extrabold shadow-sm">
                  {dest.currencySymbol}{(dest.hotelRate * 4).toLocaleString()} est. trip
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900">{dest.name}</h3>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-sky-600" />
                      {dest.country}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {dest.description}
                  </p>

                  {/* Best For Tags */}
                  <div className="pt-1">
                    <span className="text-[11px] font-bold text-slate-400 block mb-1">
                      {t('bestFor')}:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {dest.places?.slice(0, 3).map((p) => (
                        <span
                          key={p.id}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-700"
                        >
                          {p.name.split(' ')[0]}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 rounded-md bg-sky-50 text-[10px] font-bold text-sky-700">
                        {dest.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions: Explore Button & Plan Trip Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDestModal(dest)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-sky-600" />
                    <span>{t('exploreDetailsBtn')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePlanTrip(dest.id)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t('planThisTripBtn')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <Compass className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No destinations found</h3>
          <p className="text-xs text-slate-500">
            No places matched your query "{searchQuery}". Clear your search to see all 19 domestic and international destinations.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedFilter('All');
            }}
            className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Destination Detailed Overview Modal */}
      {selectedDestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
            
            {/* Modal Header Image */}
            <div className="relative h-48 sm:h-56">
              <img
                src={selectedDestModal.coverImage}
                alt={selectedDestModal.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedDestModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase shadow-sm ${
                  selectedDestModal.isInternational ? 'bg-indigo-600' : 'bg-emerald-600'
                }`}>
                  {selectedDestModal.isInternational ? 'International' : 'Domestic (India)'}
                </span>
                <h2 className="text-2xl font-black mt-1">{selectedDestModal.name}, {selectedDestModal.country}</h2>
                <p className="text-xs text-slate-200">{selectedDestModal.tagline}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* International Travel Reminders (Requirement 6) */}
              {selectedDestModal.isInternational && selectedDestModal.internationalInfo && (
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 font-black text-indigo-950">
                    <ShieldAlert className="w-4 h-4 text-indigo-600" />
                    <span>{t('intlReminderTitle')}</span>
                  </div>
                  <ul className="space-y-1.5 text-indigo-900 font-medium">
                    <li>• <strong>Passport:</strong> {selectedDestModal.internationalInfo.passportValidity}</li>
                    <li>• <strong>Visa Info:</strong> {selectedDestModal.internationalInfo.visaRequirement}</li>
                    <li>• <strong>Currency:</strong> {selectedDestModal.internationalInfo.currency} ({selectedDestModal.currencySymbol})</li>
                    <li>• <strong>Power Adapter:</strong> {selectedDestModal.internationalInfo.adapterType}</li>
                    <li>• <strong>Emergency Helpline:</strong> {selectedDestModal.internationalInfo.emergencyNumber}</li>
                  </ul>
                  <div className="pt-1 text-[11px] text-indigo-700 italic border-t border-indigo-200/60">
                    {t('officialVerifyNotice')}
                  </div>
                </div>
              )}

              {/* Sights & Places */}
              <div>
                <h4 className="font-black text-slate-900 text-sm mb-3">Top Sights & Activities</h4>
                <div className="space-y-2">
                  {selectedDestModal.places?.map((place) => (
                    <div
                      key={place.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs gap-3"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{place.name}</div>
                        <div className="text-[11px] text-slate-500">{place.category} • {place.location}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{place.description}</div>
                      </div>
                      
                      {currentTrip && (
                        <button
                          type="button"
                          onClick={() => handleOpenAddPlace(place)}
                          className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] shrink-0 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Foods */}
              {selectedDestModal.foods && (
                <div>
                  <h4 className="font-black text-slate-900 text-sm mb-3">Famous Local Foods</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDestModal.foods.map((food, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-orange-50/60 border border-orange-100 text-xs">
                        <div className="font-bold text-orange-950">{food.name}</div>
                        <div className="text-[11px] text-orange-700">{food.category} • {food.price}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{food.location}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">
                Average Stay: ₹{selectedDestModal.hotelRate}/night
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedDestModal(null);
                  handlePlanTrip(selectedDestModal.id);
                }}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Plan Itinerary for {selectedDestModal.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Place to Itinerary Modal */}
      {addDayModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="max-w-sm w-full bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 space-y-4 animate-scale-up">
            <h3 className="font-black text-slate-900 text-base">Add to Active Itinerary</h3>
            <p className="text-xs text-slate-600">
              Select which day in your <strong>{currentTrip?.destinationName}</strong> trip to add <strong>{addDayModal.place?.name}</strong>:
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Day:</label>
              <select
                aria-label="Select Day"
                value={addDayModal.selectedDay}
                onChange={(e) => setAddDayModal({ ...addDayModal, selectedDay: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold"
              >
                {currentTrip?.days?.map((day) => (
                  <option key={day.dayNumber} value={day.dayNumber}>
                    Day {day.dayNumber} ({day.date || `Day ${day.dayNumber}`})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAddDayModal({ isOpen: false, place: null, selectedDay: 1 })}
                className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAddPlace}
                className="flex-1 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs"
              >
                Add Activity
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExplorePlaces;
