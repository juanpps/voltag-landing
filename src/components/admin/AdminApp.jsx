import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase.client';
import Login from './Login';
import DashboardLayout from './DashboardLayout';

/**
 * Main Admin App rendered on client:only.
 * Handles Firebase Auth state and routing.
 */
export default function AdminApp({ basename = "/admin" }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Validate against environment email list
      const adminEmailsString = import.meta.env.PUBLIC_ADMIN_EMAIL || '';
      const authorizedEmails = adminEmailsString.split(',').map(e => e.trim().toLowerCase());
      
      if (currentUser && currentUser.email && authorizedEmails.includes(currentUser.email.toLowerCase())) {
        setUser(currentUser);
      } else {
        // If logged in with wrong email, we could log them out automatically
        // but for now we just don't grant them access in the UI layer.
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#050505', color: '#d41920' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', letterSpacing: '4px', textTransform: 'uppercase' }}>Cargando Panel...</h2>
      </div>
    );
  }

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" replace /> : <Login />} 
        />
        
        {/* Protected Dashboard Route */}
        <Route 
          path="/*" 
          element={user ? <DashboardLayout /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
}
