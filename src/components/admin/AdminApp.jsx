import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import DashboardLayout from './DashboardLayout';

/**
 * Main Admin App rendered on client:only.
 * Uses local state and localStorage for instant, zero-backend authentication.
 */
export default function AdminApp({ basename = "/admin" }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('voltag_admin_auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('voltag_admin_auth');
    setIsAuthenticated(false);
  };

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
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login onLoginSuccess={handleLoginSuccess} />} 
        />
        
        {/* Protected Dashboard Route */}
        <Route 
          path="/*" 
          element={isAuthenticated ? <DashboardLayout onLogout={handleLogout} /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
}
