import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { useUI } from '../context/UIContext';
import { useLanguage } from '../context/LanguageContext';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  Compass,
  Calendar,
  Users,
  Wallet,
  Eye,
  Edit,
  Copy,
  Trash2,
  Plus,
  Sparkles,
  ArrowRight,
  MapPin,
  CheckCircle2,
  FileDown,
  Clock,
  Tag
} from 'lucide-react';
import { destinations } from '../data/destinations';
import pdfService from '../services/pdfService';

export const MyTrips = () => {
  const { trips, currentTrip, setCurrentTrip, duplicateTrip, deleteTrip, updateTrip } = useTrip();
  const { showSuccess, showError, showInfo } = useUI();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Tab State: Upcoming, Current, Completed (Requirement 25)
  const [activeTab, setActiveTab] = useState('Upcoming');

  // Deletion confirm state
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    tripId: null,
    tripName: ''
  });

  const handleViewTrip = (trip) => {
    setCurrentTrip(trip);
    navigate('/plan');
    showSuccess(`Viewing ${trip.destinationName} itinerary.`);
  };

  const handleEditTrip = (trip) => {
    setCurrentTrip(trip);
    navigate(`/plan?destination=${trip.destinationId}`);
  };

  const handleDuplicate = async (trip) => {
    const res = await duplicateTrip(trip._id || trip.id);
    if (res.success) {
      showSuccess(`Duplicated trip as "${res.data.destinationName}"`);
    } else {
      showError('Failed to duplicate trip');
    }
  };

  const handleCompleteTrip = async (trip) => {
    const tripId = trip._id || trip.id;
    if (updateTrip) {
      await updateTrip(tripId, { status: 'Completed' });
      showSuccess(`Trip to ${trip.destinationName} marked as Completed! 🎉`);
    }
  };

  const handleExportPDF = (trip) => {
    const success = pdfService.exportTripPDF(trip, [], trip.budgetStats);
    if (success) showSuccess(`Exported PDF for ${trip.destinationName}!`);
  };

  const handleDeletePrompt = (trip) => {
    setDeleteConfirm({
      isOpen: true,
      tripId: trip._id || trip.id,
      tripName: trip.destinationName
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm.tripId) return;
    await deleteTrip(deleteConfirm.tripId);
    showInfo(`Trip "${deleteConfirm.tripName}" deleted.`);
    setDeleteConfirm({ isOpen: false, tripId: null, tripName: '' });
  };

  // Filter trips into Upcoming, Current, Completed
  const upcomingTrips = trips.filter(t => (t.status || 'Upcoming') === 'Upcoming');
  const currentTrips = trips.filter(t => t.status === 'Current' || t.status === 'Ongoing');
  const completedTrips = trips.filter(t => t.status === 'Completed');

  const displayedTrips = 
    activeTab === 'Upcoming' ? upcomingTrips :
    activeTab === 'Current' ? currentTrips : completedTrips;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>TripMate Saved Trips & Lifecycle Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Trips ({trips.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Organize upcoming vacations, active ongoing routes, and completed journeys.
          </p>
        </div>

        <Link
          to="/plan"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white text-xs font-bold shadow-md shadow-sky-600/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Plan New Trip</span>
        </Link>
      </div>

      {/* Tabs: Upcoming, Current, Completed (Requirement 25) */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        {[
          { id: 'Upcoming', label: 'Upcoming Trips', count: upcomingTrips.length },
          { id: 'Current', label: 'Current Trips', count: currentTrips.length },
          { id: 'Completed', label: 'Completed Trips', count: completedTrips.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeTab === tab.id ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Trips Grid */}
      {displayedTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTrips.map((trip) => {
            const dest = destinations.find(d => d.id === trip.destinationId) || destinations[0];
            const isCurrentActive = currentTrip && (currentTrip._id === trip._id || currentTrip.id === trip.id);

            return (
              <div
                key={trip._id || trip.id}
                className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                  isCurrentActive ? 'border-sky-500 ring-2 ring-sky-500/20' : 'border-slate-200/80'
                }`}
              >
                {/* Trip Card Header Image & Status */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={dest.coverImage}
                    alt={trip.destinationName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-white/90 text-slate-800 backdrop-blur-xs">
                      {trip.status || 'Upcoming'}
                    </span>
                    {trip.isInternational && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-600 text-white">
                        International
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-xl font-black truncate">{trip.destinationName}</h3>
                    <div className="text-xs text-slate-200 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      <span>{trip.country || dest.country}</span>
                    </div>
                  </div>
                </div>

                {/* Trip Details: Dates, Travelers, Budget, Cost */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Dates:</span>
                      </span>
                      <strong className="text-slate-900">{trip.startDate} to {trip.endDate}</strong>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Duration:</span>
                      </span>
                      <strong className="text-sky-600">{trip.daysCount || trip.days?.length || 3} Days</strong>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>Travelers:</span>
                      </span>
                      <strong className="text-slate-900">{trip.travelers || 1} Person(s)</strong>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-slate-400" />
                        <span>Total Budget:</span>
                      </span>
                      <strong className="text-slate-900">{trip.currencySymbol || '₹'}{(trip.budget || 0).toLocaleString()}</strong>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Est. Spending:</span>
                      </span>
                      <strong className="text-slate-900">{trip.currencySymbol || '₹'}{(trip.budgetStats?.finalAmount || trip.budgetStats?.total || trip.booking?.finalAmount || Math.round((trip.budget || 20000) * 0.85)).toLocaleString()}</strong>
                    </div>

                    {trip.coupon?.code && (
                      <div className="flex items-center justify-between text-emerald-600 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Coupon Applied:</span>
                        </span>
                        <span className="text-[11px] font-black bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded-md">
                          {trip.coupon.code} (-{trip.currencySymbol || '₹'}{(trip.coupon.discount || trip.coupon.amount || 0).toLocaleString()})
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-100">
                      <span>Booking Status:</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                        trip.booking?.status === 'Booked' || trip.booking?.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {trip.booking?.status === 'Booked' || trip.booking?.status === 'Confirmed'
                          ? `Booked (${trip.booking.bookingId || 'Demo'})`
                          : 'Not Booked'}
                      </span>
                    </div>
                  </div>

                  {/* Actions: View, Edit, Duplicate, Delete, Complete Trip (Requirement 25) */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleViewTrip(trip)}
                        className="flex-1 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Plan</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEditTrip(trip)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="Edit Trip Settings"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDuplicate(trip)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="Duplicate Trip"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleExportPDF(trip)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="Download PDF"
                      >
                        <FileDown className="w-4 h-4 text-sky-600" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeletePrompt(trip)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                        title="Delete Trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {trip.status !== 'Completed' && (
                      <button
                        type="button"
                        onClick={() => handleCompleteTrip(trip)}
                        className="w-full py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Mark as Completed Trip</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Compass}
          title={`No ${activeTab} Trips Found`}
          description={
            activeTab === 'Upcoming'
              ? 'You have no upcoming trips scheduled. Use our smart 9-step planner to create one in seconds.'
              : activeTab === 'Current'
              ? 'No trips are actively marked as ongoing today.'
              : 'You have not marked any trips as completed yet.'
          }
          actionText="Plan a New Trip"
          actionLink="/plan"
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.isOpen && (
        <ConfirmDialog
          isOpen={deleteConfirm.isOpen}
          title={`Delete Trip to ${deleteConfirm.tripName}?`}
          message="Are you sure you want to permanently delete this trip? All associated itinerary days and packing checklist items will be removed."
          confirmLabel="Delete Trip"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirm({ isOpen: false, tripId: null, tripName: '' })}
        />
      )}

    </div>
  );
};

export default MyTrips;
