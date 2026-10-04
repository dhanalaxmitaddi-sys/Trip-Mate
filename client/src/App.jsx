import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TripProvider } from './context/TripContext';
import { UIProvider } from './context/UIContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import AnimatedTravelBackground from './components/AnimatedTravelBackground';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import PlanTrip from './pages/PlanTrip';
import ExplorePlaces from './pages/ExplorePlaces';
import MyTrips from './pages/MyTrips';
import Offers from './pages/Offers';
import BudgetTracker from './pages/BudgetTracker';
import Account from './pages/Account';
import PackingList from './pages/PackingList';
import TravelAssistant from './pages/TravelAssistant';

// Layout wrapper to hide Navbar/Footer on Login screen and ensure app-like bottom navigation spacing
const AppLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="relative min-h-screen text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* 1. Global Animated Travel Background (Requirement 1, 2, 3) */}
      <AnimatedTravelBackground />

      {/* 2. Main Application Content above the background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* App Navigation rendered on all app pages except /login */}
        {!isAuthPage && <Navbar />}

        {/* Main container with bottom padding on mobile for bottom nav */}
        <main className={`flex-1 ${!isAuthPage ? 'pb-20 lg:pb-0' : ''}`}>
        <Routes>
          {/* Requirement 1: LOGIN MUST COME FIRST. If not logged in, always open /login first. */}
          <Route
            path="/"
            element={
              user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
            }
          />

          {/* Authentication Routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/home" replace /> : <Login defaultMode="login" />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/home" replace /> : <Login defaultMode="signup" />}
          />

          {/* Main TripMate Web Application (Protected Routes) */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <ExplorePlaces />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plan"
            element={
              <ProtectedRoute>
                <PlanTrip />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <MyTrips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/offers"
            element={
              <ProtectedRoute>
                <Offers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budget"
            element={
              <ProtectedRoute>
                <BudgetTracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/packing"
            element={
              <ProtectedRoute>
                <PackingList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assistant"
            element={
              <ProtectedRoute>
                <TravelAssistant />
              </ProtectedRoute>
            }
          />

          {/* Backward compatibility redirects */}
          <Route path="/dashboard" element={<Navigate to="/home" replace />} />

          {/* Fallback to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer rendered on desktop pages except /login */}
      {!isAuthPage && (
        <div className="hidden lg:block">
          <Footer />
        </div>
      )}
      </div>

      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <LanguageProvider>
        <UIProvider>
          <AuthProvider>
            <TripProvider>
              <AppLayout />
            </TripProvider>
          </AuthProvider>
        </UIProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
