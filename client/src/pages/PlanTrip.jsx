import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { useLanguage } from '../context/LanguageContext';
import { destinations } from '../data/destinations';
import { getOrGenerateDestination, searchAllDestinations } from '../services/destinationService';
import confetti from 'canvas-confetti';
import {
  Compass,
  Calendar,
  MapPin,
  Users,
  Wallet,
  Tag,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  FileDown,
  Plus,
  Globe,
  UtensilsCrossed,
  Luggage,
  Search,
  Check,
  ShieldCheck,
  Sun,
  Sunset,
  Moon,
  Sunrise,
  Hotel,
  Car,
  Navigation,
  CheckSquare,
  AlertTriangle,
  X,
  CreditCard,
  Ticket,
  Bookmark,
  Plane
} from 'lucide-react';
import GenerationLoader from '../components/GenerationLoader';
import ActivityCard from '../components/ActivityCard';
import ActivityEditorModal from '../components/ActivityEditorModal';
import WeatherPanel from '../components/WeatherPanel';
import BudgetChart from '../components/BudgetChart';
import TripMap from '../components/TripMap';
import ConfirmDialog from '../components/ConfirmDialog';
import pdfService from '../services/pdfService';

const AVAILABLE_INTERESTS = [
  { id: 'Nature', label: 'Nature & Scenery', icon: '🌿' },
  { id: 'Beaches', label: 'Beaches & Ocean', icon: '🏖️' },
  { id: 'History', label: 'History & Heritage', icon: '🏛️' },
  { id: 'Adventure', label: 'Adventure Sports', icon: '🧗' },
  { id: 'Food', label: 'Local Food & Cafes', icon: '🍲' },
  { id: 'Shopping', label: 'Shopping & Bazaars', icon: '🛍️' },
  { id: 'Culture', label: 'Arts & Culture', icon: '🎭' },
  { id: 'Photography', label: 'Photography Spots', icon: '📸' }
];

const FOOD_PREFERENCES = [
  { id: 'No Preference', label: 'No Preference (Anything)', icon: '🍽️' },
  { id: 'Vegetarian', label: 'Pure Vegetarian', icon: '🥗' },
  { id: 'Non-Vegetarian', label: 'Non-Vegetarian', icon: '🍗' },
  { id: 'Vegan', label: 'Vegan Options', icon: '🥑' },
  { id: 'Local Food', label: 'Local Street Specialties', icon: '🥟' },
  { id: 'Budget Food', label: 'Budget-Friendly Eateries', icon: '🏷️' }
];

const TRAVEL_STYLES = [
  { id: 'Budget', label: 'Budget Explorer', desc: 'Max savings, hostels, street food & public transport', icon: '🎒' },
  { id: 'Relaxed', label: 'Relaxed & Easy', desc: 'Slow pacing, late mornings, cafe hopping & leisure', icon: '☕' },
  { id: 'Balanced', label: 'Balanced Traveler', desc: 'A great mix of top highlights, good food & comfort', icon: '⚖️' },
  { id: 'Luxury', label: 'Luxury & Comfort', desc: '5-star resorts, private cabs, fine dining & VIP spots', icon: '✨' },
  { id: 'Adventure', label: 'High-Adrenaline', desc: 'Packed days, treks, outdoor thrills & water sports', icon: '⚡' }
];

const CURRENCIES = [
  { code: 'INR', symbol: '₹', label: 'Indian Rupee (INR ₹)' },
  { code: 'USD', symbol: '$', label: 'US Dollar (USD $)' },
  { code: 'EUR', symbol: '€', label: 'Euro (EUR €)' },
  { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham (AED د.إ)' },
  { code: 'GBP', symbol: '£', label: 'British Pound (GBP £)' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen (JPY ¥)' },
  { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar (SGD S$)' },
  { code: 'THB', symbol: '฿', label: 'Thai Baht (THB ฿)' },
  { code: 'IDR', symbol: 'Rp', label: 'Indonesian Rupiah (IDR Rp)' }
];

const COMMON_TRANSPORT_OPTIONS = [
  { id: 'trans-cab', type: 'Cab', label: 'Private AC Cab & Chauffeur', dailyRate: 850, desc: 'Dedicated driver, door-to-door comfort, AC' },
  { id: 'trans-rental', type: 'Rental Car', label: 'Self-Drive Rental SUV / Sedan', dailyRate: 1400, desc: 'Unlimited km, free GPS, freedom to explore' },
  { id: 'trans-scooter', type: 'Scooter', label: 'Two-Wheeler / Scooter Rental', dailyRate: 500, desc: 'Zippy city commuting, easy parking, low fuel' },
  { id: 'trans-transit', type: 'Public Transit', label: 'Metro & City Shared Transit', dailyRate: 350, desc: 'Eco-friendly, budget-saving, authentic transit' }
];

export const PlanTrip = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    currentTrip,
    setCurrentTrip,
    createTrip,
    createTripFromPlan,
    generateMultiplePlans,
    updateTrip,
    addActivity,
    updateActivity,
    removeActivity,
    moveActivity,
    regenerateDay,
    enhanceDayWithHuggingFace,
    generateTripWithHuggingFace,
    generateItinerary,
    budgetStats,
    setSelectedHotel,
    setSelectedFood,
    setSelectedTransport,
    bookTrip,
    applyCoupon
  } = useTrip();
  const { addNotification } = useAuth();
  const { showSuccess, showError, showInfo } = useUI();
  const { t } = useLanguage();

  // Active Tab in Itinerary View (schedule, map, weather, budget, packing)
  const [activePlanTab, setActivePlanTab] = useState('schedule');

  // Wizard Step State (1 to 9)
  const [currentStep, setCurrentStep] = useState(1);
  const [destSearch, setDestSearch] = useState('');
  const [destFilter, setDestFilter] = useState('All'); // All, Domestic, International
  const [locatingOrigin, setLocatingOrigin] = useState(false);

  // Form State (Requirement 3: From/Current location, destination, dates, days, travelers, budget, currency, food, interests, style)
  const todayStr = new Date().toISOString().split('T')[0];
  const defaultEndStr = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

  const [form, setForm] = useState({
    fromLocation: 'Current Location',
    destinationId: searchParams.get('destination') || 'goa',
    startDate: todayStr,
    endDate: defaultEndStr,
    numberOfDays: 3,
    daysCount: 3,
    travelers: 2,
    budget: 35000,
    currency: 'INR',
    currencySymbol: '₹',
    interests: ['Nature', 'Food', 'Beaches'],
    foodPreference: 'No Preference',
    travelStyle: 'Balanced'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [viewingItinerary, setViewingItinerary] = useState(!!currentTrip);
  const [viewingPlansSelection, setViewingPlansSelection] = useState(false);
  const [generatedPlanOptions, setGeneratedPlanOptions] = useState(null);
  const [selectedPlanPreviewId, setSelectedPlanPreviewId] = useState('plan-a');
  const [activeSearchResultTab, setActiveSearchResultTab] = useState('overview');
  const [selectedDayNumber, setSelectedDayNumber] = useState(1);

  // Customization Modals (Requirement 8)
  const [hotelModalOpen, setHotelModalOpen] = useState(false);
  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const [transportModalOpen, setTransportModalOpen] = useState(false);

  // Demo Booking Modal State (Requirement 13)
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccessData, setBookingSuccessData] = useState(null);

  // Activity Editor Modal State
  const [editorState, setEditorState] = useState({
    isOpen: false,
    dayNumber: 1,
    initialData: null
  });

  // Confirm Day Regeneration Dialog
  const [regenDayConfirm, setRegenDayConfirm] = useState({
    isOpen: false,
    dayNumber: null
  });
  const [isHfEnhancing, setIsHfEnhancing] = useState(false);

  // Automatically calculate days count when dates change
  useEffect(() => {
    if (form.startDate && form.endDate) {
      const start = new Date(form.startDate.split('T')[0] + 'T00:00:00Z');
      const end = new Date(form.endDate.split('T')[0] + 'T00:00:00Z');
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
      if (!isNaN(diffDays) && diffDays > 0) {
        setForm(prev => {
          if (prev.daysCount === diffDays && prev.numberOfDays === diffDays) return prev;
          const safeDays = Math.min(diffDays, 14);
          return { ...prev, daysCount: safeDays, numberOfDays: safeDays };
        });
      }
    }
  }, [form.startDate, form.endDate]);

  // Handle exact days selection (1 day -> 1, 3 days -> 3, 5 days -> 5, 7 days -> 7)
  const handleDaysChange = (newDays) => {
    const safeDays = Math.max(1, Math.min(14, newDays));
    const startStr = form.startDate || todayStr;
    const cleanDateStr = startStr.split('T')[0];
    const parts = cleanDateStr.split('-').map(Number);
    let newEndStr;
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + safeDays - 1));
      newEndStr = d.toISOString().split('T')[0];
    } else {
      const d = new Date(startStr);
      d.setUTCDate(d.getUTCDate() + safeDays - 1);
      newEndStr = d.toISOString().split('T')[0];
    }
    setForm(prev => ({
      ...prev,
      numberOfDays: safeDays,
      daysCount: safeDays,
      endDate: newEndStr
    }));
  };

  // Detect GPS Location for Starting Point (Requirement 3 & 24)
  const handleDetectGPS = () => {
    setLocatingOrigin(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm(prev => ({ ...prev, fromLocation: 'Current Location (GPS)' }));
          setLocatingOrigin(false);
          showSuccess('Detected current location via GPS!');
        },
        () => {
          setForm(prev => ({ ...prev, fromLocation: 'Mumbai, India' }));
          setLocatingOrigin(false);
          showInfo('GPS permission prompt dismissed. Set origin to Mumbai.');
        },
        { timeout: 6000 }
      );
    } else {
      setLocatingOrigin(false);
    }
  };

  // Pre-fill destination from query parameter if available
  useEffect(() => {
    const destParam = searchParams.get('destination');
    const isNew = searchParams.get('new') === 'true';
    if (destParam) {
      const found = getOrGenerateDestination(destParam);
      if (found) {
        setForm(prev => ({
          ...prev,
          destinationId: found.id,
          currency: found.currency || 'INR',
          currencySymbol: found.currencySymbol || '₹'
        }));
        setViewingItinerary(false);
        setViewingPlansSelection(false);
      }
    } else if (isNew) {
      setViewingItinerary(false);
      setViewingPlansSelection(false);
    }
  }, [searchParams]);

  // When currentTrip changes, update viewing state and sync form
  useEffect(() => {
    if (currentTrip) {
      if (!viewingPlansSelection) {
        setViewingItinerary(true);
      }
      const tripDays = Number(currentTrip.numberOfDays) > 0
        ? Number(currentTrip.numberOfDays)
        : Number(currentTrip.daysCount) > 0
          ? Number(currentTrip.daysCount)
          : (currentTrip.days?.length || 3);
      setForm(prev => ({
        ...prev,
        destinationId: currentTrip.destinationId || prev.destinationId,
        destinationName: currentTrip.destinationName || prev.destinationName,
        fromLocation: currentTrip.fromLocation || prev.fromLocation,
        startDate: currentTrip.startDate || prev.startDate,
        endDate: currentTrip.endDate || prev.endDate,
        numberOfDays: tripDays,
        daysCount: tripDays,
        travelers: currentTrip.travelers || prev.travelers,
        budget: currentTrip.budget || prev.budget,
        currency: currentTrip.currency || prev.currency,
        currencySymbol: currentTrip.currencySymbol || prev.currencySymbol,
        interests: currentTrip.interests || prev.interests,
        foodPreference: currentTrip.foodPreference || prev.foodPreference,
        travelStyle: currentTrip.travelStyle || prev.travelStyle
      }));
    }
  }, [currentTrip, viewingPlansSelection]);

  // Log required metrics whenever viewing itinerary
  useEffect(() => {
    if (viewingItinerary && currentTrip && currentTrip.days) {
      const selectedNum = Number(currentTrip.numberOfDays || currentTrip.daysCount || currentTrip.days.length);
      console.log('selected numberOfDays:', selectedNum);
      console.log('generated itinerary length:', currentTrip.days.length);
      console.log('generated day numbers:', currentTrip.days.map(d => d.dayNumber));
    }
  }, [viewingItinerary, currentTrip?._id, currentTrip?.id, currentTrip?.days?.length, currentTrip?.numberOfDays, currentTrip?.daysCount]);

  // Ensure selectedDayNumber stays in range of current days
  useEffect(() => {
    if (currentTrip?.days && currentTrip.days.length > 0) {
      if (selectedDayNumber > currentTrip.days.length) {
        setSelectedDayNumber(1);
      }
    }
  }, [currentTrip?.days, selectedDayNumber]);

  const selectedDestination = useMemo(() => {
    return getOrGenerateDestination(form.destinationId || form.destinationName || 'goa');
  }, [form.destinationId, form.destinationName]);

  const activeTripDest = useMemo(() => {
    return getOrGenerateDestination(currentTrip?.destinationId || currentTrip?.destinationName || form.destinationId || 'goa');
  }, [currentTrip, form.destinationId, form.destinationName]);

  const filteredDests = useMemo(() => {
    return searchAllDestinations(destSearch, destFilter);
  }, [destSearch, destFilter]);

  // Validate current step before proceeding to next
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!form.destinationId) {
        showError('Please select a destination');
        return;
      }
    } else if (currentStep === 2) {
      if (!form.startDate || !form.endDate) {
        showError('Start date and End date are required');
        return;
      }
      if (form.endDate < form.startDate) {
        showError('End date cannot be earlier than start date');
        return;
      }
    } else if (currentStep === 5) {
      if (!form.budget || Number(form.budget) <= 0) {
        showError('Please enter a valid budget amount');
        return;
      }
    } else if (currentStep === 7) {
      if (!form.interests || form.interests.length === 0) {
        showError('Please select at least one interest');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, 9));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Generate Itinerary & Multiple Suitable Plans (Plan A, B, C, D)
  const handleGenerateTrip = async () => {
    setIsGenerating(true);
    const selectedNumberOfDays = Number(form.numberOfDays || form.daysCount || 3);
    console.log('selected numberOfDays:', selectedNumberOfDays);

    const tripPayload = {
      ...form,
      numberOfDays: selectedNumberOfDays,
      daysCount: selectedNumberOfDays
    };

    try {
      // Direct flow: Plan Trip form -> Trip object -> itinerary generator -> result page
      const createRes = await createTrip(tripPayload);
      if (createRes && (createRes.success || createRes.data || createRes.trip)) {
        const generatedTrip = createRes.data || createRes.trip;
        console.log('selected numberOfDays:', selectedNumberOfDays);
        console.log('generated itinerary length:', generatedTrip.days?.length || 0);
        console.log('generated day numbers:', generatedTrip.days?.map(d => d.dayNumber) || []);

        setViewingItinerary(true);
        setViewingPlansSelection(false);
        setSelectedDayNumber(1);
        setActivePlanTab('schedule');
        showSuccess(`Generated exactly ${selectedNumberOfDays}-day itinerary for ${selectedDestination.name}!`);

        // Also pre-fetch 4 distinct plans in the background so theme switching remains seamless
        generateMultiplePlans(tripPayload).then(res => {
          if (res && res.plans) setGeneratedPlanOptions(res);
        }).catch(() => {});
      } else {
        showError(createRes?.message || 'Generation failed');
      }
    } catch (err) {
      console.warn('Error generating trip:', err);
      showError('Failed to generate trip');
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate Itinerary using Hugging Face AI
  const handleGenerateWithHuggingFace = async () => {
    setIsGenerating(true);
    const selectedNumberOfDays = Number(form.numberOfDays || form.daysCount || 3);
    const tripPayload = {
      ...form,
      numberOfDays: selectedNumberOfDays,
      daysCount: selectedNumberOfDays
    };

    try {
      const createRes = await generateTripWithHuggingFace(tripPayload);
      if (createRes && (createRes.success || createRes.data || createRes.trip)) {
        const generatedTrip = createRes.data || createRes.trip;
        setViewingItinerary(true);
        setViewingPlansSelection(false);
        setSelectedDayNumber(1);
        setActivePlanTab('schedule');
        showSuccess(`Generated ${selectedNumberOfDays}-day AI itinerary with Hugging Face! 🤗✨`);

        // Also fetch multi-plans in background
        generateMultiplePlans(tripPayload).then(res => {
          if (res && res.plans) setGeneratedPlanOptions(res);
        }).catch(() => {});
      } else {
        await handleGenerateTrip();
      }
    } catch (e) {
      console.warn('HF generation error, falling back:', e);
      await handleGenerateTrip();
    } finally {
      setIsGenerating(false);
    }
  };

  // User selects one of the 4 generated plans
  const handleSelectPlan = async (planWrapper) => {
    setIsGenerating(true);
    const selectedNumberOfDays = Number(form.numberOfDays || form.daysCount || planWrapper.trip.numberOfDays || planWrapper.trip.daysCount || 3);
    console.log('selected numberOfDays:', selectedNumberOfDays);

    try {
      const planToActivate = {
        ...planWrapper.trip,
        numberOfDays: selectedNumberOfDays,
        daysCount: selectedNumberOfDays
      };
      const res = await createTripFromPlan(planToActivate);
      if (res && (res.success || res.data || res.trip)) {
        const activeTrip = res.data || res.trip || planToActivate;
        console.log('selected numberOfDays:', selectedNumberOfDays);
        console.log('generated itinerary length:', activeTrip.days?.length || 0);
        console.log('generated day numbers:', activeTrip.days?.map(d => d.dayNumber) || []);

        showSuccess(`Activated ${planWrapper.title} (${selectedNumberOfDays} Days)!`);
        setViewingPlansSelection(false);
        setViewingItinerary(true);
        setSelectedDayNumber(1);
        setActivePlanTab('schedule');
      } else {
        showError('Could not activate plan');
      }
    } catch (e) {
      showError('Could not activate plan');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!currentTrip) return;
    const success = pdfService.exportTripPDF(currentTrip, [], budgetStats);
    if (success) showSuccess('PDF Itinerary exported successfully!');
  };

  const handleSaveTrip = async () => {
    if (!currentTrip) return;
    if (updateTrip) {
      await updateTrip(currentTrip._id || currentTrip.id, { updatedAt: new Date().toISOString() });
    }
    showSuccess(`Trip to ${currentTrip.destinationName} saved successfully to your account!`);
    if (addNotification) {
      addNotification({
        title: 'Trip Saved Successfully 💾',
        message: `Your customized travel plan to ${currentTrip.destinationName} (${currentTrip.daysCount} Days) is safely saved in My Trips.`,
        type: 'save'
      });
    }
  };

  const handleConfirmRegenerate = async () => {
    if (!currentTrip || !regenDayConfirm.dayNumber) return;
    const res = await regenerateDay(regenDayConfirm.dayNumber);
    if (res?.success) {
      showSuccess(`Day ${regenDayConfirm.dayNumber} regenerated successfully!`);
    } else {
      showSuccess(`Day ${regenDayConfirm.dayNumber} refreshed with fresh highlights!`);
    }
    setRegenDayConfirm({ isOpen: false, dayNumber: null });
  };

  const handleHuggingFaceEnhanceDay = async () => {
    if (!currentTrip || !selectedDayNumber) return;
    setIsHfEnhancing(true);
    try {
      const res = await enhanceDayWithHuggingFace(selectedDayNumber);
      if (res?.success) {
        showSuccess(`Day ${selectedDayNumber} enhanced with Hugging Face AI! 🌟`);
      } else {
        showSuccess(`Day ${selectedDayNumber} refreshed with curated AI experiences!`);
      }
    } catch (e) {
      console.warn('HF enhancement error:', e);
      showError('Failed to enhance day with Hugging Face AI');
    } finally {
      setIsHfEnhancing(false);
    }
  };

  // Execute Demo Booking (Requirement 13)
  const handleConfirmBooking = async () => {
    if (!currentTrip) return;
    const res = await bookTrip();
    if (res?.success) {
      setBookingSuccessData(res.bookingId);
      setBookingModalOpen(false);

      // Trigger Confetti Celebratory Burst
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      // Add User Notification
      if (addNotification) {
        addNotification({
          title: 'Trip Booked Successfully! 🎉',
          message: `Your TripMate plan to ${currentTrip.destinationName} has been booked! Booking ID: ${res.bookingId}`,
          type: 'booking'
        });
      }
      showSuccess('Your TripMate plan has been booked successfully!');
    }
  };

  // Active day activities filtered by time of day (Requirement 4)
  const activeDay = currentTrip?.days?.find(d => d.dayNumber === selectedDayNumber) || currentTrip?.days?.[0];

  const parseTimeHour = (timeStr) => {
    if (!timeStr) return -1;
    const match = String(timeStr).match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (!match) return -1;
    let h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const meridiem = match[3] ? match[3].toUpperCase() : null;
    if (meridiem === 'PM' && h < 12) h += 12;
    if (meridiem === 'AM' && h === 12) h = 0;
    return h + m / 60;
  };

  const getActivitySlot = (act, index) => {
    const tod = String(act?.timeOfDay || '').toLowerCase();
    if (tod.includes('morn')) return 'Morning';
    if (tod.includes('afternoon') || tod.includes('lunch') || tod.includes('midday')) return 'Afternoon';
    if (tod.includes('eve') || tod.includes('sunset')) return 'Evening';
    if (tod.includes('night') || tod.includes('dinner')) return 'Night';

    const hr = parseTimeHour(act?.time);
    if (hr >= 0) {
      if (hr < 12) return 'Morning';
      if (hr < 16.5) return 'Afternoon';
      if (hr < 19.5) return 'Evening';
      return 'Night';
    }

    if (index === 0) return 'Morning';
    if (index === 1) return 'Afternoon';
    if (index === 2) return 'Evening';
    return 'Night';
  };

  const morningActivities = activeDay?.activities?.filter((a, idx) => getActivitySlot(a, idx) === 'Morning') || [];
  const afternoonActivities = activeDay?.activities?.filter((a, idx) => getActivitySlot(a, idx) === 'Afternoon') || [];
  const eveningActivities = activeDay?.activities?.filter((a, idx) => getActivitySlot(a, idx) === 'Evening') || [];
  const nightActivities = activeDay?.activities?.filter((a, idx) => getActivitySlot(a, idx) === 'Night') || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-sans">
      
      {/* Loading Screen during AI Generation */}
      {isGenerating && (
        <GenerationLoader
          destinationName={selectedDestination.name}
          daysCount={form.daysCount}
        />
      )}

      {/* VIEW 1: STEP-BY-STEP TRIP PLANNER WIZARD */}
      {!viewingItinerary && !viewingPlansSelection && !isGenerating && (
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Wizard Header & Progress Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="uppercase tracking-wider text-sky-600">
                {t('stepOf')} {currentStep} {t('of')} 9
              </span>
              <span className="text-slate-400">
                {Math.round((currentStep / 9) * 100)}% Complete
              </span>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / 9) * 100}%` }}
              />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {currentStep === 1 && 'Step 1: Starting Point & Destination Search'}
                {currentStep === 2 && 'Step 2: Travel Dates'}
                {currentStep === 3 && 'Step 3: Exact Number of Days'}
                {currentStep === 4 && 'Step 4: Number of Travelers'}
                {currentStep === 5 && 'Step 5: Target Budget'}
                {currentStep === 6 && 'Step 6: Currency Preference'}
                {currentStep === 7 && 'Step 7: Travel Interests'}
                {currentStep === 8 && 'Step 8: Food Preference'}
                {currentStep === 9 && 'Step 9: Travel Style'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {currentStep === 1 && 'Search ANY destination worldwide (India & Global) — TripMate dynamically generates plans for any valid city.'}
                {currentStep === 2 && 'Select your departure and return dates.'}
                {currentStep === 3 && 'Choose your exact duration: 1 day, 3 days, 5 days, 10 days. Never generates extra days.'}
                {currentStep === 4 && 'How many adventurers will be traveling together?'}
                {currentStep === 5 && 'Total target budget for hotels, meals, transport and sights.'}
                {currentStep === 6 && 'Choose your preferred pricing currency.'}
                {currentStep === 7 && 'Select activities and vibes that match your vacation desires.'}
                {currentStep === 8 && 'Dietary preference to curate customized dining recommendations.'}
                {currentStep === 9 && 'Set your pacing preference from budget-friendly to ultra-luxury.'}
              </p>
            </div>
          </div>

          {/* Wizard Card Body */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* STEP 1: FROM LOCATION & DESTINATION */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                {/* Starting Point / From Location */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-sky-600" />
                      <span>Starting Point / From Location:</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleDetectGPS}
                      disabled={locatingOrigin}
                      className="text-[11px] font-bold text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-1"
                    >
                      <span>{locatingOrigin ? 'Detecting GPS...' : '📍 Use Current Location'}</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    value={form.fromLocation}
                    onChange={(e) => setForm({ ...form, fromLocation: e.target.value })}
                    placeholder="Enter city or airport (e.g. Mumbai, Delhi, Bengaluru)..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-white focus:border-sky-500 focus:outline-hidden"
                  />

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Quick hubs:</span>
                    {['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata'].map(city => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setForm({ ...form, fromLocation: city })}
                        className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-colors ${
                          form.fromLocation.includes(city) ? 'bg-sky-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Destination Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 block">
                      Global Destination Search:
                    </label>
                    <span className="text-[11px] font-semibold text-sky-600">
                      Supports ANY city or destination worldwide
                    </span>
                  </div>

                  {/* Search & Domestic/International Tabs */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={destSearch}
                        onChange={(e) => setDestSearch(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && filteredDests.length > 0) {
                            e.preventDefault();
                            const topMatch = filteredDests[0];
                            setForm(prev => ({
                              ...prev,
                              destinationId: topMatch.id,
                              currency: topMatch.currency || 'INR',
                              currencySymbol: topMatch.currencySymbol || '₹'
                            }));
                            showSuccess(`Selected ${topMatch.name}!`);
                          }
                        }}
                        placeholder="Search ANY destination (e.g. Vizag, Singapore, Switzerland, Paris, Tokyo, Dubai, New Zealand)..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-sky-500 focus:outline-hidden"
                      />
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                      {['All', 'Domestic', 'International'].map(tab => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setDestFilter(tab)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            destFilter === tab ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Destination Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
                    {filteredDests.map((dest) => {
                      const isSelected = form.destinationId === dest.id;
                      return (
                        <button
                          key={dest.id}
                          type="button"
                          onClick={() => {
                            setForm(prev => ({
                              ...prev,
                              destinationId: dest.id,
                              currency: dest.currency || 'INR',
                              currencySymbol: dest.currencySymbol || '₹'
                            }));
                          }}
                          className={`text-left p-2.5 rounded-2xl border transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="relative h-24 rounded-xl overflow-hidden mb-2">
                            <img
                              src={dest.coverImage}
                              alt={dest.name}
                              className="w-full h-full object-cover"
                            />
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-xs">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            )}
                            <span className={`absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase text-white ${
                              dest.isInternational ? 'bg-indigo-600' : 'bg-emerald-600'
                            }`}>
                              {dest.isInternational ? 'Intl' : 'India'}
                            </span>
                            {dest.isDynamicallyGenerated && (
                              <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase bg-amber-500 text-white">
                                AI Global
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 truncate">{dest.name}</div>
                            <div className="text-[10px] text-slate-500 truncate">{dest.country}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SEARCH RESULTS: Destination Overview & Details Panel */}
                {selectedDestination && (
                  <div className="mt-6 pt-6 border-t border-slate-200/80 space-y-5">
                    {/* Destination Image, Name, Country & Description */}
                    <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                      <div className="h-44 sm:h-52 w-full relative">
                        <img
                          src={selectedDestination.coverImage}
                          alt={selectedDestination.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-5 text-white">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              selectedDestination.isInternational ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                            }`}>
                              {selectedDestination.country}
                            </span>
                            <span className="text-xs text-slate-200 font-medium">
                              Currency: <strong>{selectedDestination.currency} ({selectedDestination.currencySymbol})</strong>
                            </span>
                            {selectedDestination.isDynamicallyGenerated && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                                ✨ Dynamically Generated Global Destination
                              </span>
                            )}
                          </div>
                          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                            {selectedDestination.name}
                          </h2>
                          <p className="text-xs text-slate-200 line-clamp-2 mt-1">
                            {selectedDestination.tagline || selectedDestination.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Search Results Navigation Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100">
                      {[
                        { id: 'overview', label: 'Plans & Overview', icon: '✨' },
                        { id: 'places', label: `Popular Places (${selectedDestination.places?.length || 0})`, icon: '🏛️' },
                        { id: 'food', label: `Food & Dining (${selectedDestination.foods?.length || 0})`, icon: '🍲' },
                        { id: 'hotels', label: `Hotels (${selectedDestination.stays?.length || 0})`, icon: '🏨' },
                        { id: 'activities', label: `Activities (${selectedDestination.activities?.length || 0})`, icon: '🧗' },
                        { id: 'budget-weather', label: 'Budget & Weather', icon: '💰' },
                        { id: 'map', label: 'Destination Map', icon: '🗺️' }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveSearchResultTab(tab.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                            activeSearchResultTab === tab.id
                              ? 'bg-sky-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <span>{tab.icon}</span>
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* TAB CONTENT 1: AVAILABLE PLANS & OVERVIEW */}
                    {activeSearchResultTab === 'overview' && (
                      <div className="space-y-4">
                        <div>
                          <span className="text-xs font-bold text-slate-900 block mb-1">
                            Available Plans to Generate:
                          </span>
                          <p className="text-[11px] text-slate-500 mb-3">
                            TripMate dynamically creates 4 tailored thematic variations for {selectedDestination.name}:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-left">
                              <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900">
                                <span>🏛️</span>
                                <span>Plan A – History & Heritage</span>
                              </div>
                              <p className="text-[10px] text-amber-800 mt-1">
                                Monuments, heritage walks, royal sights, ancient landmarks & museums.
                              </p>
                            </div>
                            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-left">
                              <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-900">
                                <span>🍲</span>
                                <span>Plan B – Food & Culture</span>
                              </div>
                              <p className="text-[10px] text-emerald-800 mt-1">
                                Legendary street food, culinary trails, local bazaars & atmospheric dining.
                              </p>
                            </div>
                            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-left">
                              <div className="flex items-center gap-1.5 font-bold text-xs text-blue-900">
                                <span>🏙️</span>
                                <span>Plan C – City Exploration</span>
                              </div>
                              <p className="text-[10px] text-blue-800 mt-1">
                                Central highlights, famous plazas, shopping avenues & panoramic viewpoints.
                              </p>
                            </div>
                            <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-left">
                              <div className="flex items-center gap-1.5 font-bold text-xs text-purple-900">
                                <span>📸</span>
                                <span>Plan D – Photography & Local Experience</span>
                              </div>
                              <p className="text-[10px] text-purple-800 mt-1">
                                Golden hour photo spots, serene nature paths, quaint neighborhoods & hidden gems.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Quick stats banner */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-center">
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Hotel Rate</div>
                            <div className="text-xs font-black text-slate-900 mt-0.5">{selectedDestination.currencySymbol}{selectedDestination.hotelRate}/night</div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Daily Food Cost</div>
                            <div className="text-xs font-black text-slate-900 mt-0.5">{selectedDestination.currencySymbol}{selectedDestination.foodRate}/day</div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Local Transport</div>
                            <div className="text-xs font-black text-slate-900 mt-0.5">{selectedDestination.currencySymbol}{selectedDestination.transportRate}/day</div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Top Places</div>
                            <div className="text-xs font-black text-sky-600 mt-0.5">{selectedDestination.places?.length || 6} Curated Sights</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB CONTENT 2: POPULAR PLACES */}
                    {activeSearchResultTab === 'places' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                        {(selectedDestination.places || []).map((place) => (
                          <div key={place.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex gap-3">
                            {place.image && (
                              <img
                                src={place.image}
                                alt={place.name}
                                className="w-20 h-20 rounded-lg object-cover shrink-0"
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-xs text-slate-900 truncate">{place.name}</span>
                                <span className="text-[10px] font-black text-amber-600 shrink-0">★ {place.rating || 4.7}</span>
                              </div>
                              <span className="text-[10px] text-sky-600 font-semibold">{place.category || 'Sightseeing'}</span>
                              <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{place.description}</p>
                              <div className="flex items-center gap-1 mt-1 text-[9px] text-slate-400">
                                <span>{place.price === 0 ? 'Free Entry' : `${selectedDestination.currencySymbol}${place.price}`}</span>
                                <span>•</span>
                                <span className="truncate">{place.location || selectedDestination.name}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB CONTENT 3: FOOD */}
                    {activeSearchResultTab === 'food' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                        {(selectedDestination.foods || []).map((food, idx) => (
                          <div key={food.id || idx} className="p-3.5 rounded-xl border border-slate-200 bg-white">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-slate-900">{food.name}</span>
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                                ~{selectedDestination.currencySymbol}{food.dailyCost || selectedDestination.foodRate}/day
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-semibold">{food.category}</span>
                            <p className="text-[11px] text-slate-600 mt-1">{food.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB CONTENT 4: HOTELS */}
                    {activeSearchResultTab === 'hotels' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                        {(selectedDestination.stays || []).map((stay, idx) => (
                          <div key={stay.id || idx} className="p-3.5 rounded-xl border border-slate-200 bg-white">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-slate-900">{stay.name}</span>
                              <span className="text-[10px] font-black text-sky-600">
                                {selectedDestination.currencySymbol}{stay.price}/night
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-slate-100 text-slate-700">
                                {stay.type}
                              </span>
                              <span className="text-[10px] font-bold text-amber-500">★ {stay.rating || 4.6}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1">
                              <span>🛡️</span>
                              <span>{stay.safetyInfo || 'Verified Safe & Clean Stay'}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB CONTENT 5: ACTIVITIES */}
                    {activeSearchResultTab === 'activities' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                        {(selectedDestination.activities || []).map((act, idx) => (
                          <div key={act.id || idx} className="p-3 rounded-xl border border-slate-200 bg-white">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-slate-900">{act.name}</span>
                              <span className="text-[10px] font-black text-sky-600">
                                {act.price === 0 ? 'Free' : `${selectedDestination.currencySymbol}${act.price}`}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-sky-600 font-semibold">{act.category}</span>
                              <span className="text-[10px] text-slate-400">⏱️ {act.duration}</span>
                              <span className="text-[10px] font-bold text-amber-500">★ {act.rating || 4.7}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB CONTENT 6: BUDGET & WEATHER */}
                    {activeSearchResultTab === 'budget-weather' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Estimated Budget Card */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                          <div className="font-black text-xs text-slate-900 flex items-center gap-1.5">
                            <Wallet className="w-3.5 h-3.5 text-sky-600" />
                            <span>Estimated Budget Guide (Per Day / Per Traveler)</span>
                          </div>
                          <div className="space-y-1.5 text-xs">
                            <div className="flex justify-between py-1 border-b border-slate-200/60">
                              <span className="text-slate-500">Hotel / Stay:</span>
                              <span className="font-bold text-slate-900">{selectedDestination.currencySymbol}{selectedDestination.hotelRate}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-200/60">
                              <span className="text-slate-500">Meals & Cafes:</span>
                              <span className="font-bold text-slate-900">{selectedDestination.currencySymbol}{selectedDestination.foodRate}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-200/60">
                              <span className="text-slate-500">Local Cab / Transit:</span>
                              <span className="font-bold text-slate-900">{selectedDestination.currencySymbol}{selectedDestination.transportRate}</span>
                            </div>
                            <div className="flex justify-between py-1 font-bold text-sky-700">
                              <span>Suggested 3-Day Starting Budget:</span>
                              <span>{selectedDestination.currencySymbol}{((selectedDestination.hotelRate + selectedDestination.foodRate + selectedDestination.transportRate) * 3).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Weather Card */}
                        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-3">
                          <div className="font-black text-xs text-sky-900 flex items-center gap-1.5">
                            <Sun className="w-3.5 h-3.5 text-amber-500" />
                            <span>Weather & Climate in {selectedDestination.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-3xl font-black text-sky-950">
                              {(selectedDestination.weather && selectedDestination.weather[0]?.tempC) || 28}°C
                            </span>
                            <div>
                              <div className="font-bold text-xs text-sky-900">
                                {(selectedDestination.weather && selectedDestination.weather[0]?.condition) || 'Sunny & Pleasant'}
                              </div>
                              <div className="text-[10px] text-sky-700">
                                Humidity: {(selectedDestination.weather && selectedDestination.weather[0]?.humidity) || '60%'}
                              </div>
                            </div>
                          </div>
                          <p className="text-[11px] text-sky-800 bg-white/70 p-2.5 rounded-xl border border-sky-100">
                            💡 <strong>Packing Tip:</strong> {(selectedDestination.weather && selectedDestination.weather[0]?.suggestion) || 'Pack comfortable walking footwear and light cotton layers.'}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* TAB CONTENT 7: MAP */}
                    {activeSearchResultTab === 'map' && (
                      <div className="rounded-2xl overflow-hidden border border-slate-200">
                        <TripMap
                          destinationName={selectedDestination.name}
                          destinationCoords={selectedDestination.coordinates || { lat: 20.5937, lng: 78.9629 }}
                          places={selectedDestination.places || []}
                          fromLocationName={form.fromLocation}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: TRAVEL DATES */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Departure Date (Start)
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold focus:border-sky-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Return Date (End)
                    </label>
                    <input
                      type="date"
                      required
                      min={form.startDate || todayStr}
                      value={form.endDate}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold focus:border-sky-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200/80 text-xs text-sky-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>
                    Estimated Duration: <strong>{form.daysCount} Day{form.daysCount > 1 ? 's' : ''} ({form.daysCount === 1 ? 'Same-day Return' : `${Math.max(0, form.daysCount - 1)} Nights`})</strong>
                  </span>
                </div>
              </div>
            )}

            {/* STEP 3: EXACT NUMBER OF DAYS (Requirement 4: 1 day, 3 days, 5 days, 7 days strict enforcement) */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in text-center py-2">
                <div className="text-4xl sm:text-5xl font-black text-sky-600 tracking-tight">
                  {form.daysCount} <span className="text-xl sm:text-2xl text-slate-700">Day{form.daysCount > 1 ? 's' : ''}</span>
                </div>
                
                {/* Strict exact days guarantee note */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Exact {form.daysCount} Day{form.daysCount > 1 ? 's' : ''} will be generated. Never extra days.</span>
                </div>

                {/* Popular exact presets matching Requirement 4 (1 Day, 3 Days, 5 Days, 7 Days) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto pt-2">
                  {[
                    { days: 1, label: '1 Day', desc: 'Day Trip / Excursion' },
                    { days: 3, label: '3 Days', desc: 'Weekend Getaway' },
                    { days: 5, label: '5 Days', desc: 'Standard Vacation' },
                    { days: 7, label: '7 Days', desc: 'Full Explorer Pass' }
                  ].map(preset => (
                    <button
                      key={preset.days}
                      type="button"
                      onClick={() => handleDaysChange(preset.days)}
                      className={`p-3.5 rounded-2xl border text-center transition-all ${
                        form.daysCount === preset.days
                          ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-500/20 font-bold'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <div className="font-black text-base">{preset.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{preset.desc}</div>
                    </button>
                  ))}
                </div>

                {/* Fine-tune duration */}
                <div className="flex items-center justify-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => handleDaysChange(form.daysCount - 1)}
                    disabled={form.daysCount <= 1}
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-lg disabled:opacity-30 transition-colors"
                  >
                    -
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {[1, 2, 4, 6, 8, 10].map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => handleDaysChange(d)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                          form.daysCount === d
                            ? 'bg-sky-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDaysChange(form.daysCount + 1)}
                    disabled={form.daysCount >= 14}
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-lg disabled:opacity-30 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: TRAVELERS */}
            {currentStep === 4 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                {[
                  { count: 1, title: 'Solo Explorer', desc: 'Single traveler navigating their own way' },
                  { count: 2, title: 'Couple / Duo', desc: 'Two travelers sharing accommodations' },
                  { count: 4, title: 'Family / Small Group', desc: '3 to 4 travelers on a shared holiday' },
                  { count: 6, title: 'Large Group Adventure', desc: '5+ travelers traveling in a pack' }
                ].map(item => (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => setForm({ ...form, travelers: item.count })}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      form.travelers === item.count
                        ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black text-slate-900">{item.title}</span>
                      <Users className="w-4 h-4 text-sky-600" />
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                    <div className="text-xs font-bold text-sky-700 mt-2">{item.count} Traveler{item.count > 1 ? 's' : ''}</div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 5: BUDGET */}
            {currentStep === 5 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Total Target Budget ({form.currencySymbol})
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-400 font-bold text-base">
                      {form.currencySymbol}
                    </span>
                    <input
                      type="number"
                      required
                      min={1000}
                      step={500}
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-lg font-black text-slate-900 focus:border-sky-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Quick Presets */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Quick Budget Presets:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Budget', amount: 18000 },
                      { label: 'Standard', amount: 35000 },
                      { label: 'Luxury', amount: 75000 }
                    ].map(preset => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setForm({ ...form, budget: preset.amount })}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          form.budget === preset.amount
                            ? 'border-sky-600 bg-sky-50 text-sky-900 font-bold'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 text-xs'
                        }`}
                      >
                        <div className="font-bold text-xs">{preset.label}</div>
                        <div className="text-[11px] text-slate-500">{form.currencySymbol}{preset.amount.toLocaleString()}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: CURRENCY */}
            {currentStep === 6 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-in">
                {CURRENCIES.map(curr => (
                  <button
                    key={curr.code}
                    type="button"
                    onClick={() => setForm({ ...form, currency: curr.code, currencySymbol: curr.symbol })}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      form.currency === curr.code
                        ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900 text-sm">{curr.code}</span>
                      <span className="font-black text-sky-600 text-base">{curr.symbol}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{curr.label}</div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 7: INTERESTS */}
            {currentStep === 7 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in">
                {AVAILABLE_INTERESTS.map(item => {
                  const isSelected = form.interests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setForm(prev => ({
                            ...prev,
                            interests: prev.interests.filter(i => i !== item.id)
                          }));
                        } else {
                          setForm(prev => ({
                            ...prev,
                            interests: [...prev.interests, item.id]
                          }));
                        }
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span className="text-2xl mb-2">{item.icon}</span>
                      <div className="font-bold text-xs text-slate-900">{item.label}</div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* STEP 8: FOOD PREFERENCE */}
            {currentStep === 8 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                {FOOD_PREFERENCES.map(food => (
                  <button
                    key={food.id}
                    type="button"
                    onClick={() => setForm({ ...form, foodPreference: food.id })}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                      form.foodPreference === food.id
                        ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className="text-2xl">{food.icon}</span>
                    <div>
                      <div className="font-bold text-xs text-slate-900">{food.label}</div>
                      <div className="text-[10px] text-slate-500">Auto-prioritizes dining recommendations</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 9: TRAVEL STYLE */}
            {currentStep === 9 && (
              <div className="space-y-3 animate-fade-in">
                {TRAVEL_STYLES.map(style => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setForm({ ...form, travelStyle: style.id })}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      form.travelStyle === style.id
                        ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{style.icon}</span>
                      <div>
                        <div className="font-black text-xs text-slate-900">{style.label}</div>
                        <div className="text-[11px] text-slate-500">{style.desc}</div>
                      </div>
                    </div>
                    {form.travelStyle === style.id && (
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Wizard Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors disabled:opacity-30 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('prevStepBtn')}</span>
            </button>

            {currentStep < 9 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition-all flex items-center gap-1.5 active:scale-[0.98]"
              >
                <span>{t('nextStepBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id="btn-generate-hf-trip"
                  onClick={handleGenerateWithHuggingFace}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 hover:scale-[1.02] active:scale-[0.98] text-white text-xs sm:text-sm font-black shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
                  title="Generate dynamic, culturally authentic day-by-day itinerary using Hugging Face AI"
                >
                  <span className="text-base">🤗</span>
                  <span>Hugging Face AI</span>
                </button>

                <button
                  type="button"
                  id="btn-generate-my-trip"
                  onClick={handleGenerateTrip}
                  className="px-6 sm:px-7 py-3 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] text-white text-xs sm:text-sm font-black shadow-xl shadow-sky-600/30 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{t('generateTripBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 1.5: MULTIPLE TAILORED PLANS SELECTION (Plan A, B, C, D) */}
      {!viewingItinerary && viewingPlansSelection && generatedPlanOptions && !isGenerating && (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>4 Distinct Travel Plans Generated • Exact {form.daysCount} Days</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Choose Your Vibe for {generatedPlanOptions.destination?.name || selectedDestination.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Strictly generated for <strong>{form.daysCount} Days</strong>, budget of <strong>{form.currencySymbol}{form.budget.toLocaleString()}</strong>, and <strong>{form.travelers} Traveler(s)</strong>.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setViewingPlansSelection(false);
                  setCurrentStep(9);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Modify Search / Wizard</span>
              </button>
            </div>
          </div>

          {/* 4 Plan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {generatedPlanOptions.plans.map((plan) => {
              const isSelectedPreview = selectedPlanPreviewId === plan.planId;
              const themeStyles = {
                'history': { border: 'border-amber-300', bg: 'bg-amber-50/40', badge: 'bg-amber-600', icon: '🏛️' },
                'food': { border: 'border-emerald-300', bg: 'bg-emerald-50/40', badge: 'bg-emerald-600', icon: '🍲' },
                'city': { border: 'border-blue-300', bg: 'bg-blue-50/40', badge: 'bg-blue-600', icon: '🏙️' },
                'photography': { border: 'border-purple-300', bg: 'bg-purple-50/40', badge: 'bg-purple-600', icon: '📸' }
              }[plan.theme] || { border: 'border-sky-300', bg: 'bg-sky-50/40', badge: 'bg-sky-600', icon: '✨' };

              return (
                <div
                  key={plan.planId}
                  className={`rounded-3xl border-2 p-6 transition-all flex flex-col justify-between space-y-5 bg-white shadow-xs hover:shadow-md ${
                    isSelectedPreview ? `${themeStyles.border} ring-2 ring-sky-500/20 shadow-md` : 'border-slate-200/90'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Plan Top Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-9 h-9 rounded-2xl bg-slate-900 text-white font-black text-sm flex items-center justify-center shadow-xs">
                          {plan.planLetter}
                        </span>
                        <div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase text-white ${themeStyles.badge}`}>
                            {plan.badge}
                          </span>
                          <h2 className="text-lg font-black text-slate-900 mt-1">
                            {plan.title}
                          </h2>
                        </div>
                      </div>
                      <span className="text-2xl">{themeStyles.icon}</span>
                    </div>

                    {/* Tagline & Focus */}
                    <p className="text-xs text-slate-600">
                      {plan.tagline}
                    </p>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
                      <strong>Focus Highlights:</strong> {plan.focus}
                    </div>

                    {/* Cost and Budget Stats */}
                    <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Estimated Total Cost:</span>
                        <span className="text-base font-black text-slate-900">
                          {plan.trip.budgetStats.currencySymbol}{plan.trip.budgetStats.total.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            plan.trip.budgetStats.exceeded ? 'bg-rose-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(100, (plan.trip.budgetStats.total / form.budget) * 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
                        <span>Target Budget: {form.currencySymbol}{form.budget.toLocaleString()}</span>
                        <span className={plan.trip.budgetStats.exceeded ? 'text-rose-600 font-bold' : 'text-emerald-700 font-bold'}>
                          {plan.trip.budgetStats.exceeded
                            ? `Over by ${plan.trip.budgetStats.currencySymbol}${plan.trip.budgetStats.overspendAmount || 0}`
                            : `${plan.trip.budgetStats.currencySymbol}${plan.trip.budgetStats.remaining} Remaining`}
                        </span>
                      </div>
                    </div>

                    {/* Days & Schedule Highlights */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>Day-by-Day Route ({plan.trip.days.length} Days):</span>
                        <span className="text-[10px] text-sky-600 font-extrabold uppercase">Exact {plan.trip.daysCount} Days</span>
                      </div>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {plan.trip.days.map((day) => (
                          <div key={day.id || day.dayNumber} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                            <span className="font-extrabold text-sky-700 mr-2">Day {day.dayNumber}:</span>
                            <span className="text-slate-700">
                              {day.activities.map(a => a.name).join(' ➜ ')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Curated Inclusions */}
                    <div className="grid grid-cols-3 gap-2 text-[10px] pt-1">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block font-semibold">Stay:</span>
                        <span className="font-bold text-slate-800 truncate block mt-0.5">{plan.trip.selectedHotel?.name}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block font-semibold">Dining:</span>
                        <span className="font-bold text-slate-800 truncate block mt-0.5">{plan.trip.selectedFood?.name}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block font-semibold">Transit:</span>
                        <span className="font-bold text-slate-800 truncate block mt-0.5">{plan.trip.selectedTransport?.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Select Plan Button */}
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(plan)}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:opacity-95 active:scale-[0.98] text-white text-xs font-black shadow-md shadow-sky-600/25 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Choose {plan.planLetter} & Open Detailed Itinerary</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: ITINERARY DASHBOARD (SINGLE SOURCE OF TRUTH - Requirement 7, 8, 9, 10, 11, 13) */}
      {viewingItinerary && currentTrip && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Compare & Switch Plan Banner */}
          {generatedPlanOptions?.plans && (
            <div className="p-4 rounded-3xl bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 border border-sky-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">
                  Active Plan: <span className="text-sky-700 font-black">{currentTrip?.planTitle || 'Customized Plan'}</span> ({currentTrip?.daysCount || currentTrip?.days?.length || 3} Days)
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Switch Plan:</span>
                {generatedPlanOptions.plans.map(p => (
                  <button
                    key={p.planId}
                    type="button"
                    onClick={() => handleSelectPlan(p)}
                    className={`px-3 py-1 rounded-xl font-bold text-xs transition-all ${
                      currentTrip?.planTitle === p.title
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {p.planLetter} – {p.badge.split('&')[0].trim()}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setViewingPlansSelection(true);
                    setViewingItinerary(false);
                  }}
                  className="px-3 py-1 rounded-xl font-bold text-xs bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs transition-colors"
                >
                  Compare All 4 Plans
                </button>
              </div>
            </div>
          )}

          {/* Trip Summary Header & Actions */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  currentTrip.isInternational ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {currentTrip.isInternational ? 'International Trip' : 'Domestic (India)'}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  • Demo recommendations are being used
                </span>
                {currentTrip.booking?.status === 'Booked' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Booked (ID: {currentTrip.booking.bookingId})
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>{currentTrip.destinationName}</span>
                {currentTrip.country && <span className="text-base text-slate-400 font-medium">({currentTrip.country})</span>}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1 text-slate-700 font-semibold">
                  <Navigation className="w-3.5 h-3.5 text-sky-600" />
                  <span>From: {currentTrip.fromLocation || 'Current Location'}</span>
                </span>
                <span>•</span>
                <span>{currentTrip.startDate} to {currentTrip.endDate} (<strong>{currentTrip.daysCount || currentTrip.days?.length || 3} Days</strong>)</span>
                <span>•</span>
                <span>{currentTrip.travelers || 1} Traveler(s)</span>
                <span>•</span>
                <span>Style: <strong className="text-slate-800">{currentTrip.travelStyle || 'Balanced'}</strong></span>
              </div>
            </div>

            {/* Action Buttons: Save Trip, Book Plan, PDF, Plan New */}
            <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
              {/* Plan New Trip Button */}
              <button
                type="button"
                onClick={() => {
                  setViewingItinerary(false);
                  setViewingPlansSelection(false);
                  setCurrentStep(1);
                }}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-sky-600" />
                <span>Plan New</span>
              </button>

              {/* Save Trip Button (Requirement 2 & 14) */}
              <button
                type="button"
                id="btn-save-trip"
                onClick={handleSaveTrip}
                className="px-4 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold shadow-2xs transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Bookmark className="w-4 h-4 text-sky-600" />
                <span>Save Trip</span>
              </button>

              {/* Book Plan Button (Requirement 13) */}
              <button
                type="button"
                id="btn-book-plan"
                onClick={() => setBookingModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white text-xs font-black shadow-md shadow-emerald-600/25 transition-all flex items-center gap-1.5"
              >
                <CreditCard className="w-4 h-4" />
                <span>{currentTrip.booking?.status === 'Booked' ? 'View Demo Booking' : 'Book Plan'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPDF}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <FileDown className="w-4 h-4 text-sky-400" />
                <span>{t('exportPdf')}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewingItinerary(false)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Modify Trip
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar: Total Budget, Used Budget, Remaining Budget, Percentage (Requirement 10) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="text-[11px] font-bold uppercase text-slate-400">{t('totalBudget')}</div>
              <div className="text-xl font-black text-slate-900 mt-1">
                {currentTrip.currencySymbol || '₹'}{(currentTrip.budget || 0).toLocaleString()}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="text-[11px] font-bold uppercase text-slate-400">Used Budget</div>
              <div className="text-xl font-black text-sky-600 mt-1">
                {currentTrip.currencySymbol || '₹'}{(budgetStats?.total || 0).toLocaleString()}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="text-[11px] font-bold uppercase text-slate-400">{t('remainingBudget')}</div>
              <div className={`text-xl font-black mt-1 ${
                budgetStats?.remaining < 0 ? 'text-rose-600' : 'text-emerald-600'
              }`}>
                {currentTrip.currencySymbol || '₹'}{(budgetStats?.remaining || 0).toLocaleString()}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="text-[11px] font-bold uppercase text-slate-400">Percentage Used</div>
              <div className="text-xl font-black text-slate-900 mt-1 flex items-center justify-between">
                <span>{budgetStats?.percentUsed || 0}%</span>
                <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${
                  budgetStats?.exceeded ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {budgetStats?.exceeded ? 'Over Budget' : 'On Track'}
                </span>
              </div>
            </div>
          </div>

          {/* Applied Coupon Banner in Trip Summary (Requirement 10) */}
          {budgetStats?.discount > 0 && currentTrip.coupon && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] uppercase">
                  Coupon Applied
                </span>
                <span className="font-mono font-black text-emerald-950 text-sm">
                  {currentTrip.coupon.code}
                </span>
                <span className="text-slate-500">
                  (Original Subtotal: {currentTrip.currencySymbol || '₹'}{(budgetStats.originalTotal || (budgetStats.subtotal + (budgetStats.totals?.Other || 0))).toLocaleString()})
                </span>
              </div>
              <div className="font-black text-emerald-700 text-sm">
                Saved: -{currentTrip.currencySymbol || '₹'}{budgetStats.discount.toLocaleString()}
              </div>
            </div>
          )}

          {/* SELECTED PLAN CUSTOMIZATION CENTER (Requirement 7 & 8: Hotel, Food, Transportation, Activities) */}
          <div className="bg-gradient-to-r from-sky-900 via-blue-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-black tracking-tight text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Customize Your Travel Plan</span>
                </h3>
                <p className="text-xs text-sky-200">
                  Change hotel tier, dining style, or transport anytime. Budget recalculates automatically.
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-sky-300 self-start sm:self-auto">
                Single Trip Object
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Hotel / Stay Card */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-sky-300">
                    <span className="font-bold flex items-center gap-1.5">
                      <Hotel className="w-3.5 h-3.5" /> Selected Hotel
                    </span>
                    <span className="font-black text-amber-300">★ {currentTrip.selectedHotel?.rating || 4.5}</span>
                  </div>
                  <div className="font-black text-sm text-white truncate">
                    {currentTrip.selectedHotel?.name || 'Premier Stay'}
                  </div>
                  <div className="text-[11px] text-sky-100">
                    {currentTrip.selectedHotel?.roomType || 'Comfort Suite'} • {currentTrip.currencySymbol || '₹'}{Number(currentTrip.selectedHotel?.price || 2500).toLocaleString()}/night
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setHotelModalOpen(true)}
                  className="w-full py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all text-center"
                >
                  Change Hotel
                </button>
              </div>

              {/* Food Plan Card */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-sky-300">
                    <span className="font-bold flex items-center gap-1.5">
                      <UtensilsCrossed className="w-3.5 h-3.5" /> Food Option
                    </span>
                    <span className="text-[10px] text-emerald-300 font-bold">Curated</span>
                  </div>
                  <div className="font-black text-sm text-white truncate">
                    {currentTrip.selectedFood?.name || 'Regional Cuisine'}
                  </div>
                  <div className="text-[11px] text-sky-100">
                    {currentTrip.currencySymbol || '₹'}{Number(currentTrip.selectedFood?.dailyCost || 800).toLocaleString()}/day/traveler
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFoodModalOpen(true)}
                  className="w-full py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all text-center"
                >
                  Change Dining Option
                </button>
              </div>

              {/* Transportation Card */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-sky-300">
                    <span className="font-bold flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5" /> Transportation
                    </span>
                    <span className="text-[10px] text-sky-300 font-bold">{currentTrip.selectedTransport?.type || 'Transit'}</span>
                  </div>
                  <div className="font-black text-sm text-white truncate">
                    {currentTrip.selectedTransport?.label || 'Private AC Cab'}
                  </div>
                  <div className="text-[11px] text-sky-100">
                    {currentTrip.currencySymbol || '₹'}{Number(currentTrip.selectedTransport?.dailyRate || 850).toLocaleString()}/day
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setTransportModalOpen(true)}
                  className="w-full py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all text-center"
                >
                  Change Transport
                </button>
              </div>

            </div>
          </div>

          {/* ITINERARY TABS: Schedule, Map, Weather, Budget, Packing */}
          <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'schedule', label: 'Day-by-Day Schedule', icon: Calendar },
              { id: 'flights', label: 'Flights & Plane Journey', icon: Plane },
              { id: 'map', label: 'Route & Live Map', icon: MapPin },
              { id: 'weather', label: 'Weather Forecast', icon: Sun },
              { id: 'budget', label: 'Budget & Analytics', icon: Wallet },
              { id: 'packing', label: 'Packing Checklist', icon: Luggage }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activePlanTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivePlanTab(tab.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 scale-[1.02]'
                      : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: DAY-BY-DAY SCHEDULE */}
          {activePlanTab === 'schedule' && (
            <div className="space-y-6">

              {/* Flight Quick Summary Banner */}
              {currentTrip.planeTrip && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50/50 to-blue-50 border border-sky-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 flex items-center gap-2">
                        <span>Commercial Plane Trip:</span>
                        <span className="text-sky-700 font-extrabold">{currentTrip.planeTrip?.origin?.airportCode} ✈ {currentTrip.planeTrip?.destination?.airportCode}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
                          {currentTrip.planeTrip?.outboundFlight?.stops || 'Direct'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {currentTrip.planeTrip?.outboundFlight?.airline} ({currentTrip.planeTrip?.outboundFlight?.flightNumber}) • Departs {currentTrip.planeTrip?.outboundFlight?.departureTime} • {currentTrip.planeTrip?.outboundFlight?.duration}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActivePlanTab('flights')}
                    className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                  >
                    <span>View Flight Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              
              {/* Duration Selector & Exact Days Control (Requirement: 1 day -> Day 1 only, 3 days -> Day 1..3, 5 days -> Day 1..5, 7 days -> Day 1..7) */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-indigo-50 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Trip Duration: <strong className="text-sky-600">{currentTrip.daysCount || currentTrip.days?.length || 1} Days</strong>
                    <span className="text-slate-500 font-normal ml-1">
                      ({(currentTrip.daysCount || currentTrip.days?.length || 1) === 1 ? 'Same-day trip' : `${Math.max(0, (currentTrip.daysCount || currentTrip.days?.length || 1) - 1)} Nights`})
                    </span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mr-1">Select Days:</span>
                  {[1, 3, 5, 7].map((num) => {
                    const activeDays = Number(currentTrip.daysCount) || currentTrip.days?.length || 1;
                    const isSelected = activeDays === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        id={`btn-duration-${num}d`}
                        disabled={isGenerating}
                        onClick={async () => {
                          if (isSelected) return;
                          setIsGenerating(true);
                          try {
                            const res = await generateItinerary(num);
                            if (res.success) {
                              setSelectedDayNumber(1);
                              showSuccess(`Generated exactly ${num}-day itinerary (${num === 1 ? 'Day 1 only' : `Day 1 to Day ${num}`})!`);
                            } else {
                              showError('Could not update duration');
                            }
                          } catch (e) {
                            showError('Failed to update duration');
                          } finally {
                            setIsGenerating(false);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1 ${
                          isSelected
                            ? 'bg-sky-600 text-white shadow-xs scale-105'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{num} {num === 1 ? 'Day' : 'Days'}</span>
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </button>
                    );
                  })}

                  {/* Custom Days Stepper */}
                  <div className="flex items-center gap-1 ml-1 bg-white border border-slate-200 rounded-xl p-0.5">
                    <button
                      type="button"
                      disabled={isGenerating || (Number(currentTrip.daysCount) || currentTrip.days?.length || 1) <= 1}
                      onClick={async () => {
                        const cur = Number(currentTrip.daysCount) || currentTrip.days?.length || 1;
                        const next = Math.max(1, cur - 1);
                        setIsGenerating(true);
                        try {
                          await generateItinerary(next);
                          setSelectedDayNumber(1);
                          showSuccess(`Updated to ${next} Day${next > 1 ? 's' : ''}!`);
                        } finally {
                          setIsGenerating(false);
                        }
                      }}
                      className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black disabled:opacity-30"
                      title="Decrease duration by 1 day"
                    >
                      -
                    </button>
                    <span className="text-xs font-black text-slate-800 px-1.5">
                      {currentTrip.daysCount || currentTrip.days?.length || 1}d
                    </span>
                    <button
                      type="button"
                      disabled={isGenerating || (Number(currentTrip.daysCount) || currentTrip.days?.length || 1) >= 14}
                      onClick={async () => {
                        const cur = Number(currentTrip.daysCount) || currentTrip.days?.length || 1;
                        const next = Math.min(14, cur + 1);
                        setIsGenerating(true);
                        try {
                          await generateItinerary(next);
                          setSelectedDayNumber(1);
                          showSuccess(`Updated to ${next} Days!`);
                        } finally {
                          setIsGenerating(false);
                        }
                      }}
                      className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black disabled:opacity-30"
                      title="Increase duration by 1 day"
                    >
                      +
                    </button>
                  </div>

                  {/* Regenerate Full Itinerary Button */}
                  <button
                    type="button"
                    disabled={isGenerating}
                    onClick={async () => {
                      setIsGenerating(true);
                      try {
                        const curDays = Number(currentTrip.daysCount) || currentTrip.days?.length || 3;
                        const res = await generateItinerary(curDays);
                        if (res.success) {
                          setSelectedDayNumber(1);
                          showSuccess(`Refreshed ${curDays}-day itinerary with new activities!`);
                        }
                      } finally {
                        setIsGenerating(false);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1 ml-1"
                    title="Regenerate all days for this duration"
                  >
                    <RefreshCw className={`w-3 h-3 text-sky-600 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span>Regenerate All</span>
                  </button>
                </div>
              </div>

              {/* Day Selector Tabs (EXACT NUMBER OF DAYS - Requirement 4) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {currentTrip.days?.map((day) => (
                  <button
                    key={day.dayNumber}
                    type="button"
                    onClick={() => setSelectedDayNumber(day.dayNumber)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                      selectedDayNumber === day.dayNumber
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Day {day.dayNumber}</span>
                    <span className={`text-[10px] font-normal ${selectedDayNumber === day.dayNumber ? 'text-sky-100' : 'text-slate-400'}`}>
                      {day.date}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Day Section Header & Day Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-black text-slate-900">
                      Day {selectedDayNumber} Itinerary
                    </h2>
                    {activeDay?.themeTitle && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200/80 shadow-2xs flex items-center gap-1">
                        <span>✨</span>
                        <span>{activeDay.themeTitle}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    {activeDay?.date || 'Today'} • {activeDay?.activities?.length || 0} scheduled activities
                    {activeDay?.focusArea ? ` • Focus: ${activeDay.focusArea}` : ''}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={handleHuggingFaceEnhanceDay}
                    disabled={isHfEnhancing}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 text-amber-800 border border-amber-300/60 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
                    title="Generate unique day highlights using Hugging Face AI"
                  >
                    <span>🤗</span>
                    <span>{isHfEnhancing ? 'Enhancing with HF AI...' : 'HF AI Enhance'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegenDayConfirm({ isOpen: true, dayNumber: selectedDayNumber })}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-sky-600" />
                    <span>{t('regenerateDay')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditorState({ isOpen: true, dayNumber: selectedDayNumber, initialData: null })}
                    className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Activity</span>
                  </button>
                </div>
              </div>

              {/* Structured Day Breakdown: Morning, Afternoon, Evening, Night (Requirement 4 & 5) */}
              <div className="space-y-6">
                
                {/* Morning Slot */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50/80 px-3 py-1.5 rounded-xl border border-amber-200/60 w-fit">
                    <Sunrise className="w-4 h-4 text-amber-600" />
                    <span>{t('morning')}</span>
                  </div>
                  <div className="space-y-3">
                    {morningActivities.length > 0 ? (
                      morningActivities.map((act, idx) => (
                        <ActivityCard
                          key={act.id}
                          activity={act}
                          dayNumber={selectedDayNumber}
                          destinationName={currentTrip.destinationName}
                          isFirst={idx === 0}
                          isLast={idx === morningActivities.length - 1}
                          onEdit={() => setEditorState({ isOpen: true, dayNumber: selectedDayNumber, initialData: act })}
                          onDelete={() => removeActivity(selectedDayNumber, act.id)}
                          onMoveUp={() => moveActivity(selectedDayNumber, act.id, 'up')}
                          onMoveDown={() => moveActivity(selectedDayNumber, act.id, 'down')}
                        />
                      ))
                    ) : (
                      <div className="p-3 text-xs text-slate-400 italic bg-white rounded-2xl border border-slate-100">
                        No morning activities scheduled. Click "Add Activity" to plan your morning!
                      </div>
                    )}
                  </div>
                </div>

                {/* Afternoon Slot */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sky-700 bg-sky-50/80 px-3 py-1.5 rounded-xl border border-sky-200/60 w-fit">
                    <Sun className="w-4 h-4 text-sky-600" />
                    <span>{t('afternoon')}</span>
                  </div>
                  <div className="space-y-3">
                    {afternoonActivities.length > 0 ? (
                      afternoonActivities.map((act, idx) => (
                        <ActivityCard
                          key={act.id}
                          activity={act}
                          dayNumber={selectedDayNumber}
                          destinationName={currentTrip.destinationName}
                          isFirst={idx === 0}
                          isLast={idx === afternoonActivities.length - 1}
                          onEdit={() => setEditorState({ isOpen: true, dayNumber: selectedDayNumber, initialData: act })}
                          onDelete={() => removeActivity(selectedDayNumber, act.id)}
                          onMoveUp={() => moveActivity(selectedDayNumber, act.id, 'up')}
                          onMoveDown={() => moveActivity(selectedDayNumber, act.id, 'down')}
                        />
                      ))
                    ) : (
                      <div className="p-3 text-xs text-slate-400 italic bg-white rounded-2xl border border-slate-100">
                        No afternoon activities scheduled.
                      </div>
                    )}
                  </div>
                </div>

                {/* Evening Slot */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-700 bg-orange-50/80 px-3 py-1.5 rounded-xl border border-orange-200/60 w-fit">
                    <Sunset className="w-4 h-4 text-orange-600" />
                    <span>{t('evening')}</span>
                  </div>
                  <div className="space-y-3">
                    {eveningActivities.length > 0 ? (
                      eveningActivities.map((act, idx) => (
                        <ActivityCard
                          key={act.id}
                          activity={act}
                          dayNumber={selectedDayNumber}
                          destinationName={currentTrip.destinationName}
                          isFirst={idx === 0}
                          isLast={idx === eveningActivities.length - 1}
                          onEdit={() => setEditorState({ isOpen: true, dayNumber: selectedDayNumber, initialData: act })}
                          onDelete={() => removeActivity(selectedDayNumber, act.id)}
                          onMoveUp={() => moveActivity(selectedDayNumber, act.id, 'up')}
                          onMoveDown={() => moveActivity(selectedDayNumber, act.id, 'down')}
                        />
                      ))
                    ) : (
                      <div className="p-3 text-xs text-slate-400 italic bg-white rounded-2xl border border-slate-100">
                        No evening activities scheduled.
                      </div>
                    )}
                  </div>
                </div>

                {/* Night Slot */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50/80 px-3 py-1.5 rounded-xl border border-indigo-200/60 w-fit">
                    <Moon className="w-4 h-4 text-indigo-600" />
                    <span>{t('night')}</span>
                  </div>
                  <div className="space-y-3">
                    {nightActivities.length > 0 ? (
                      nightActivities.map((act, idx) => (
                        <ActivityCard
                          key={act.id}
                          activity={act}
                          dayNumber={selectedDayNumber}
                          destinationName={currentTrip.destinationName}
                          isFirst={idx === 0}
                          isLast={idx === nightActivities.length - 1}
                          onEdit={() => setEditorState({ isOpen: true, dayNumber: selectedDayNumber, initialData: act })}
                          onDelete={() => removeActivity(selectedDayNumber, act.id)}
                          onMoveUp={() => moveActivity(selectedDayNumber, act.id, 'up')}
                          onMoveDown={() => moveActivity(selectedDayNumber, act.id, 'down')}
                        />
                      ))
                    ) : (
                      <div className="p-3 text-xs text-slate-400 italic bg-white rounded-2xl border border-slate-100">
                        No night activities scheduled.
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB: FLIGHTS & PLANE JOURNEY (OpenStreetMap & Hugging Face Dynamic Flights) */}
          {activePlanTab === 'flights' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200 mb-2">
                    <Plane className="w-3.5 h-3.5" />
                    <span>Commercial Plane Journey • AI & Geocoded Route</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    Flight Connection: {currentTrip.fromLocation || 'Origin'} ✈ {currentTrip.destinationName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Commercial flight schedules, aircraft specs, baggage policies & verified airfares
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-bold uppercase">Estimated Airfare</div>
                  <div className="text-xl font-black text-slate-900">
                    {currentTrip.currencySymbol || '₹'}
                    {Number(currentTrip.planeTrip?.totalAirfare || 7700).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold">Round-Trip Included ({currentTrip.travelers || 1} Traveler{Number(currentTrip.travelers) > 1 ? 's' : ''})</div>
                </div>
              </div>

              {/* Outbound & Return Flight Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Outbound Flight */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50/70 to-white border border-sky-100 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-sky-600" /> Outbound Flight
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {currentTrip.planeTrip?.outboundFlight?.status || 'On Schedule'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-500">{currentTrip.planeTrip?.outboundFlight?.airline || 'IndiGo Airlines'}</div>
                      <div className="text-sm font-black text-slate-900">{currentTrip.planeTrip?.outboundFlight?.flightNumber || '6E-450'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400 font-medium">Cabin Class</div>
                      <div className="text-xs font-bold text-slate-800">{currentTrip.planeTrip?.outboundFlight?.cabinClass || 'Economy (Standard)'}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="text-left">
                      <div className="text-lg font-black text-slate-900">{currentTrip.planeTrip?.outboundFlight?.departureTime || '07:45 AM'}</div>
                      <div className="text-xs font-black text-sky-700">{currentTrip.planeTrip?.origin?.airportCode || 'BOM'}</div>
                      <div className="text-[10px] text-slate-400 max-w-[120px] truncate">{currentTrip.planeTrip?.origin?.airportName || 'Origin Airport'}</div>
                    </div>

                    <div className="flex flex-col items-center px-3">
                      <span className="text-[11px] font-bold text-slate-500">{currentTrip.planeTrip?.outboundFlight?.duration || '2h 30m'}</span>
                      <div className="w-24 h-0.5 bg-sky-200 relative my-1">
                        <Plane className="w-3 h-3 text-sky-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-600">{currentTrip.planeTrip?.outboundFlight?.stops || 'Non-stop'}</span>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-black text-slate-900">{currentTrip.planeTrip?.outboundFlight?.arrivalTime || '10:15 AM'}</div>
                      <div className="text-xs font-black text-sky-700">{currentTrip.planeTrip?.destination?.airportCode || 'GOX'}</div>
                      <div className="text-[10px] text-slate-400 max-w-[120px] truncate">{currentTrip.planeTrip?.destination?.airportName || 'Destination Airport'}</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span>🧳 {currentTrip.planeTrip?.outboundFlight?.baggage || '7 kg Hand Baggage + 15 kg Check-in Included'}</span>
                    <span className="font-bold text-slate-800">
                      {currentTrip.currencySymbol || '₹'}
                      {Number(currentTrip.planeTrip?.outboundFlight?.pricePerTraveler || 3850).toLocaleString()} / person
                    </span>
                  </div>
                </div>

                {/* Return Flight */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-white border border-indigo-100 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-800 flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-indigo-600 rotate-180" /> Return Flight
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {currentTrip.planeTrip?.returnFlight?.status || 'On Schedule'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-500">{currentTrip.planeTrip?.returnFlight?.airline || 'IndiGo Airlines'}</div>
                      <div className="text-sm font-black text-slate-900">{currentTrip.planeTrip?.returnFlight?.flightNumber || '6E-650'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400 font-medium">Cabin Class</div>
                      <div className="text-xs font-bold text-slate-800">{currentTrip.planeTrip?.returnFlight?.cabinClass || 'Economy (Standard)'}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="text-left">
                      <div className="text-lg font-black text-slate-900">{currentTrip.planeTrip?.returnFlight?.departureTime || '06:15 PM'}</div>
                      <div className="text-xs font-black text-indigo-700">{currentTrip.planeTrip?.destination?.airportCode || 'GOX'}</div>
                      <div className="text-[10px] text-slate-400 max-w-[120px] truncate">{currentTrip.planeTrip?.destination?.airportName || 'Destination Airport'}</div>
                    </div>

                    <div className="flex flex-col items-center px-3">
                      <span className="text-[11px] font-bold text-slate-500">{currentTrip.planeTrip?.returnFlight?.duration || '2h 30m'}</span>
                      <div className="w-24 h-0.5 bg-indigo-200 relative my-1">
                        <Plane className="w-3 h-3 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-600">{currentTrip.planeTrip?.returnFlight?.stops || 'Non-stop'}</span>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-black text-slate-900">{currentTrip.planeTrip?.returnFlight?.arrivalTime || '08:45 PM'}</div>
                      <div className="text-xs font-black text-indigo-700">{currentTrip.planeTrip?.origin?.airportCode || 'BOM'}</div>
                      <div className="text-[10px] text-slate-400 max-w-[120px] truncate">{currentTrip.planeTrip?.origin?.airportName || 'Origin Airport'}</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span>🧳 {currentTrip.planeTrip?.returnFlight?.baggage || '7 kg Hand Baggage + 15 kg Check-in Included'}</span>
                    <span className="font-bold text-slate-800">
                      {currentTrip.currencySymbol || '₹'}
                      {Number(currentTrip.planeTrip?.returnFlight?.pricePerTraveler || 3850).toLocaleString()} / person
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Flight Advice Banner */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
                <span className="text-lg">💡</span>
                <div>
                  <strong className="font-black text-amber-950">AI Air Travel Advice:</strong>{' '}
                  {currentTrip.planeTrip?.aiTravelInsight || 'Direct commercial flights operate daily between these hubs. Recommended airport arrival is 2 hours before departure for domestic and 3 hours for international.'}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE ROUTE & LIVE MAP (Requirement 24) */}
          {activePlanTab === 'map' && (
            <div className="space-y-4 animate-fade-in">
              <TripMap
                destinationName={currentTrip.destinationName}
                destinationCoords={activeTripDest.coordinates || { lat: 15.2993, lng: 74.1240 }}
                places={activeTripDest.places || []}
                fromLocationName={currentTrip.fromLocation || 'Current Location'}
              />
            </div>
          )}

          {/* TAB 3: LIVE WEATHER FORECAST (Requirement 25) */}
          {activePlanTab === 'weather' && (
            <div className="space-y-4 animate-fade-in">
              <WeatherPanel
                destinationId={currentTrip.destinationId}
                startDate={currentTrip.startDate}
                endDate={currentTrip.endDate}
              />
            </div>
          )}

          {/* TAB 4: BUDGET & ANALYTICS GRAPH (Requirement 10 & 11) */}
          {activePlanTab === 'budget' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      Live Trip Expense Analytics & Budget Graph
                    </h3>
                    <p className="text-xs text-slate-500">
                      Real-time breakdown of Hotel, Food, Transportation, Activities, Shopping, and Contingency.
                    </p>
                  </div>
                  <Link
                    to="/budget"
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                  >
                    <span>Full Budget Center</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <BudgetChart
                  budgetStats={budgetStats}
                  totalBudget={currentTrip.budget}
                  currencySymbol={currentTrip.currencySymbol || '₹'}
                />
              </div>
            </div>
          )}

          {/* TAB 5: PACKING CHECKLIST PREVIEW (Requirement 26) */}
          {activePlanTab === 'packing' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Packing Essentials Checklist
                  </h3>
                  <p className="text-xs text-slate-500">
                    Auto-generated for {currentTrip.destinationName} ({currentTrip.daysCount} Days)
                  </p>
                </div>
                <Link
                  to="/packing"
                  className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold shadow-xs hover:bg-sky-500 transition-colors flex items-center gap-1.5"
                >
                  <Luggage className="w-3.5 h-3.5" />
                  <span>Open Full Checklist</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {(activeTripDest.packingRules || ['modest-clothing', 'walking-shoes', 'sunscreen']).map((rule, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="font-semibold text-slate-800 capitalize">{rule.replace(/-/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* MODAL 1: CHOOSE HOTEL / STAY (Requirement 8 & 22) */}
      {hotelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="max-w-2xl w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[85vh] overflow-y-auto animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Select Hotel / Stay</h3>
                <p className="text-xs text-slate-500">Verified accommodations in {currentTrip?.destinationName} (Demo Booking)</p>
              </div>
              <button
                type="button"
                onClick={() => setHotelModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {(activeTripDest.stays || [
                { name: `${activeTripDest.name} Grand Resort`, type: 'Luxury', price: 4500, rating: 4.8, safetyInfo: '24/7 Security' },
                { name: `${activeTripDest.name} Comfort Inn`, type: 'Comfort', price: 2500, rating: 4.5, safetyInfo: 'Sanitized Rooms' },
                { name: `${activeTripDest.name} Traveler Hostel`, type: 'Budget', price: 900, rating: 4.2, safetyInfo: 'Lockers & CCTV' }
              ]).map((stay, idx) => {
                const isSelected = currentTrip?.selectedHotel?.name === stay.name;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20' : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-sm">{stay.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase bg-slate-100 text-slate-700">{stay.type}</span>
                        <span className="text-xs font-black text-amber-500">★ {stay.rating || 4.5}</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {stay.location || activeTripDest.name} • {stay.safetyInfo || '24/7 Monitored & Hygienic'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <div className="text-right">
                        <div className="font-black text-base text-slate-900">
                          {currentTrip?.currencySymbol || '₹'}{Number(stay.price).toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400">per night</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedHotel(stay);
                          setHotelModalOpen(false);
                          showSuccess(`Selected "${stay.name}"! Budget updated.`);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-sky-600 hover:bg-sky-500 text-white shadow-xs'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Choose This Hotel'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CHOOSE DINING / FOOD OPTION (Requirement 8 & 23) */}
      {foodModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="max-w-2xl w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[85vh] overflow-y-auto animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Select Dining & Food Option</h3>
                <p className="text-xs text-slate-500">Regional culinary plans for {currentTrip?.destinationName}</p>
              </div>
              <button
                type="button"
                onClick={() => setFoodModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {(activeTripDest.foods || [
                { name: 'Curated Local Cuisine Experience', category: 'Local Favorites', price: '₹800/day', location: activeTripDest.name },
                { name: 'Pure Vegetarian Special Thali', category: 'Vegetarian', price: '₹600/day', location: activeTripDest.name },
                { name: 'Street Food & Night Market Trail', category: 'Street Food', price: '₹450/day', location: activeTripDest.name }
              ]).map((food, idx) => {
                const numericDaily = Number(String(food.price || '').replace(/[^0-9]/g, '')) || 700;
                const isSelected = currentTrip?.selectedFood?.name === food.name;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20' : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-sm">{food.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase bg-orange-100 text-orange-800">{food.category}</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {food.location || activeTripDest.name} • Authentic regional flavours
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <div className="text-right">
                        <div className="font-black text-base text-slate-900">
                          {currentTrip?.currencySymbol || '₹'}{numericDaily.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400">per day / person</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFood({
                            id: `food-${idx}`,
                            name: food.name,
                            category: food.category,
                            dailyCost: numericDaily,
                            description: `Authentic regional dining at ${food.location || activeTripDest.name}`
                          });
                          setFoodModalOpen(false);
                          showSuccess(`Selected "${food.name}"! Budget updated.`);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-sky-600 hover:bg-sky-500 text-white shadow-xs'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select This Plan'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CHOOSE TRANSPORTATION (Requirement 8) */}
      {transportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="max-w-2xl w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Select Transportation Mode</h3>
                <p className="text-xs text-slate-500">Commute options for {currentTrip?.destinationName}</p>
              </div>
              <button
                type="button"
                onClick={() => setTransportModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {COMMON_TRANSPORT_OPTIONS.map((trans) => {
                const isSelected = currentTrip?.selectedTransport?.type === trans.type;
                return (
                  <div
                    key={trans.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20' : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-sm">{trans.label}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase bg-sky-100 text-sky-800">{trans.type}</span>
                      </div>
                      <div className="text-xs text-slate-500">{trans.desc}</div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <div className="text-right">
                        <div className="font-black text-base text-slate-900">
                          {currentTrip?.currencySymbol || '₹'}{trans.dailyRate.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400">per day</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTransport(trans);
                          setTransportModalOpen(false);
                          showSuccess(`Transportation set to "${trans.label}"!`);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-sky-600 hover:bg-sky-500 text-white shadow-xs'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Choose This'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: BOOK PLAN DEMO MODAL (Requirement 13) */}
      {bookingModalOpen && currentTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">Trip Booking Summary</h3>
                <p className="text-xs text-slate-500">TripMate Demo Booking System (No real payment charged)</p>
              </div>
              <button
                type="button"
                onClick={() => setBookingModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Complete Pre-Booking Summary as mandated by Requirement 13 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Destination:</span>
                <strong className="text-slate-900">{currentTrip.destinationName} ({currentTrip.country})</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Travel Dates:</span>
                <strong className="text-slate-900">{currentTrip.startDate} to {currentTrip.endDate} ({currentTrip.daysCount} Days)</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Travelers:</span>
                <strong className="text-slate-900">{currentTrip.travelers || 1} Person(s)</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Selected Hotel:</span>
                <strong className="text-slate-900">{currentTrip.selectedHotel?.name || 'Premier Stay'}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Food Option:</span>
                <strong className="text-slate-900">{currentTrip.selectedFood?.name || 'Curated Regional Food'}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Transportation:</span>
                <strong className="text-slate-900">{currentTrip.selectedTransport?.label || 'Chauffeur Cab'}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Activities Scheduled:</span>
                <strong className="text-slate-900">{currentTrip.days?.reduce((sum, d) => sum + (d.activities?.length || 0), 0) || 0} Activities</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Original Subtotal:</span>
                <span className="font-bold text-slate-800">{currentTrip.currencySymbol || '₹'}{(budgetStats?.originalTotal || (budgetStats?.subtotal + (budgetStats?.totals?.Other || 0)) || budgetStats?.total || 0).toLocaleString()}</span>
              </div>
              {budgetStats?.discount > 0 && currentTrip.coupon && (
                <div className="flex justify-between py-1 border-b border-slate-200/60 text-emerald-600 font-bold">
                  <span>Special Coupon ({currentTrip.coupon.code}):</span>
                  <span>-{currentTrip.currencySymbol || '₹'}{budgetStats.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 text-sm font-black text-slate-900">
                <span>Final Booking Amount:</span>
                <span className="text-sky-600">{currentTrip.currencySymbol || '₹'}{(budgetStats?.finalAmount || budgetStats?.total || 0).toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
              <strong>Demo Confirmation:</strong> This will confirm your booking in your TripMate profile and My Trips center with a generated demo booking ID.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBookingModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                id="btn-confirm-demo-booking"
                onClick={handleConfirmBooking}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Demo Booking</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: BOOKING SUCCESS POPUP (Requirement 13) */}
      {bookingSuccessData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fade-in">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-center space-y-4 animate-scale-up">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Your TripMate plan has been booked successfully!
            </h3>

            <p className="text-xs text-slate-600">
              Demo Booking Confirmation ID:
            </p>

            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 font-mono font-black text-emerald-800 text-base">
              {bookingSuccessData}
            </div>

            <p className="text-[11px] text-slate-400">
              Booking details have been saved to your Account & My Trips.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBookingSuccessData(null)}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  setBookingSuccessData(null);
                  navigate('/trips');
                }}
                className="py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1"
              >
                <span>View in My Trips</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity Editor / Add Modal */}
      {editorState.isOpen && (
        <ActivityEditorModal
          isOpen={editorState.isOpen}
          dayNumber={editorState.dayNumber}
          initialData={editorState.initialData}
          destinationName={currentTrip?.destinationName || 'Destination'}
          onClose={() => setEditorState({ isOpen: false, dayNumber: 1, initialData: null })}
          onSave={(updatedActivity) => {
            if (editorState.initialData) {
              updateActivity(editorState.dayNumber, updatedActivity.id, updatedActivity);
              showSuccess('Activity updated successfully!');
            } else {
              addActivity(editorState.dayNumber, updatedActivity);
              showSuccess('New activity added to itinerary!');
            }
            setEditorState({ isOpen: false, dayNumber: 1, initialData: null });
          }}
        />
      )}

      {/* Confirm Day Regeneration Dialog */}
      {regenDayConfirm.isOpen && (
        <ConfirmDialog
          isOpen={regenDayConfirm.isOpen}
          title={`Regenerate Day ${regenDayConfirm.dayNumber}?`}
          message="This will re-plan activities for this specific day while keeping the rest of your itinerary and budget intact."
          confirmLabel="Regenerate Day"
          onConfirm={handleConfirmRegenerate}
          onCancel={() => setRegenDayConfirm({ isOpen: false, dayNumber: null })}
        />
      )}

    </div>
  );
};

export default PlanTrip;
