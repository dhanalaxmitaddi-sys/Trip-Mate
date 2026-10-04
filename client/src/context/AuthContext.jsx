import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('tm.user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => sessionStorage.getItem('tm.token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Clear any persistent local storage auth from previous builds so application always starts fresh at Login
    try {
      localStorage.removeItem('tm.token');
      localStorage.removeItem('tm.user');
    } catch (e) {
      // ignore
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const payload = res.data || res;
      const loggedUser = payload.user || payload;
      const authToken = payload.token || 'demo-token';
      setUser(loggedUser);
      setToken(authToken);
      sessionStorage.setItem('tm.token', authToken);
      sessionStorage.setItem('tm.user', JSON.stringify(loggedUser));
      localStorage.removeItem('tm.token');
      localStorage.removeItem('tm.user');
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || 'Login failed' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      const payload = res.data || res;
      const newUser = payload.user || payload;
      const authToken = payload.token || 'demo-token';
      setUser(newUser);
      setToken(authToken);
      sessionStorage.setItem('tm.token', authToken);
      sessionStorage.setItem('tm.user', JSON.stringify(newUser));
      localStorage.removeItem('tm.token');
      localStorage.removeItem('tm.user');
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || 'Registration failed' };
    }
  };

  const demoLogin = async () => {
    try {
      const res = await api.post('/auth/demo-login', {});
      const payload = res.data || res;
      const demoUser = payload.user || payload;
      const authToken = payload.token || 'demo-token';
      setUser(demoUser);
      setToken(authToken);
      sessionStorage.setItem('tm.token', authToken);
      sessionStorage.setItem('tm.user', JSON.stringify(demoUser));
      localStorage.removeItem('tm.token');
      localStorage.removeItem('tm.user');
      return { success: true };
    } catch (err) {
      // Local fallback demo user with rich profile
      const localDemo = {
        id: 'demo-local',
        name: 'Alex Explorer',
        email: 'demo@tripmate.com',
        profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        preferences: {
          travelStyle: 'Balanced',
          foodPreference: 'No Preference',
          budgetPreference: 'Medium',
          interests: ['Nature', 'Beaches', 'Food']
        },
        savedPlaces: [
          {
            id: 'hyd-charminar',
            name: 'Charminar & Laad Bazaar',
            destinationId: 'hyderabad',
            category: 'History',
            rating: 4.8,
            price: 50,
            location: 'Old City, Hyderabad',
            image: 'https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=800&q=80'
          }
        ],
        bookingHistory: [],
        notifications: [
          {
            id: 'notif-1',
            title: 'Welcome to TripMate! ✈️',
            message: 'Your smart AI travel planner is ready. Select any destination to start your journey.',
            type: 'info',
            read: false,
            createdAt: new Date().toISOString()
          }
        ]
      };
      setUser(localDemo);
      setToken('demo-token');
      sessionStorage.setItem('tm.token', 'demo-token');
      sessionStorage.setItem('tm.user', JSON.stringify(localDemo));
      localStorage.removeItem('tm.token');
      localStorage.removeItem('tm.user');
      return { success: true };
    }
  };

  const continueAsGuest = () => {
    const guestUser = {
      id: 'guest-' + Date.now().toString(36),
      name: 'Guest Traveler',
      email: 'guest@tripmate.com',
      isGuest: true,
      profilePhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      preferences: {
        travelStyle: 'Balanced',
        foodPreference: 'No Preference',
        budgetPreference: 'Medium',
        interests: ['Nature', 'Food']
      },
      savedPlaces: [],
      bookingHistory: [],
      notifications: [
        {
          id: 'notif-guest',
          title: 'Guest Demo Mode Active',
          message: 'You are browsing in Demo Mode. All plans and bookings are simulated.',
          type: 'info',
          read: false,
          createdAt: new Date().toISOString()
        }
      ]
    };
    setUser(guestUser);
    setToken('guest-token');
    sessionStorage.setItem('tm.token', 'guest-token');
    sessionStorage.setItem('tm.user', JSON.stringify(guestUser));
    localStorage.removeItem('tm.token');
    localStorage.removeItem('tm.user');
    return { success: true };
  };

  const updateProfile = async (profileData) => {
    if (!user) return { success: false };
    try {
      const res = await api.put('/auth/profile', profileData);
      const updated = res.data || { ...user, ...profileData };
      setUser(updated);
      sessionStorage.setItem('tm.user', JSON.stringify(updated));
      return { success: true, data: updated };
    } catch (e) {
      const updated = { ...user, ...profileData };
      setUser(updated);
      sessionStorage.setItem('tm.user', JSON.stringify(updated));
      return { success: true, data: updated };
    }
  };

  const toggleSavePlace = async (place) => {
    if (!user) return { success: false };
    const savedList = user.savedPlaces || [];
    const exists = savedList.some(p => p.id === place.id);
    let nextSaved;
    let action = 'saved';

    if (exists) {
      nextSaved = savedList.filter(p => p.id !== place.id);
      action = 'removed';
    } else {
      nextSaved = [
        {
          id: place.id,
          name: place.name,
          destinationId: place.destinationId || '',
          category: place.category || 'Sightseeing',
          rating: place.rating || 4.5,
          price: place.price || 0,
          location: place.location || '',
          image: place.image || '',
          savedAt: new Date().toISOString()
        },
        ...savedList
      ];
    }

    const updatedUser = { ...user, savedPlaces: nextSaved };
    setUser(updatedUser);
    sessionStorage.setItem('tm.user', JSON.stringify(updatedUser));

    try {
      await api.post('/auth/save-place', place);
    } catch (e) {
      console.warn('Saved place locally in user profile');
    }

    return { success: true, action, savedPlaces: nextSaved };
  };

  const isPlaceSaved = (placeId) => {
    if (!user || !user.savedPlaces) return false;
    return user.savedPlaces.some(p => p.id === placeId);
  };

  const markNotificationsRead = async () => {
    if (!user || !user.notifications) return;
    const nextNotifs = user.notifications.map(n => ({ ...n, read: true }));
    const updatedUser = { ...user, notifications: nextNotifs };
    setUser(updatedUser);
    sessionStorage.setItem('tm.user', JSON.stringify(updatedUser));

    try {
      await api.post('/auth/notifications/read');
    } catch (e) {
      console.warn('Updated notifications locally');
    }
  };

  const addNotification = (notif) => {
    if (!user) return;
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: notif.title || 'TripMate Update',
      message: notif.message || '',
      type: notif.type || 'info',
      read: false,
      createdAt: new Date().toISOString()
    };
    const nextNotifs = [newNotif, ...(user.notifications || [])];
    const updatedUser = { ...user, notifications: nextNotifs };
    setUser(updatedUser);
    sessionStorage.setItem('tm.user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('tm.token');
    sessionStorage.removeItem('tm.user');
    localStorage.removeItem('tm.token');
    localStorage.removeItem('tm.user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        demoLogin,
        continueAsGuest,
        updateProfile,
        toggleSavePlace,
        isPlaceSaved,
        markNotificationsRead,
        addNotification,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
