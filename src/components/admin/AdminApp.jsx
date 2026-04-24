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
  const [unauthorizedEmail, setUnauthorizedEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const adminEmailsString = import.meta.env.PUBLIC_ADMIN_EMAIL || '';
      const authorizedEmails = adminEmailsString.split(',').map(e => e.trim().toLowerCase());
      
      if (currentUser && currentUser.email) {
        const isAuthorized = authorizedEmails.includes(currentUser.email.toLowerCase());
        if (isAuthorized) {
          setUser(currentUser);
          setUnauthorizedEmail(null);
        } else {
          setUser(null);
          setUnauthorizedEmail(currentUser.email);
        }
      } else {
        setUser(null);
        setUnauthorizedEmail(null);
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

  // Explicit view for unauthorized users to prevent redirect loops
  if (unauthorizedEmail) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#050505', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#d41920', marginBottom: '16px' }}>ACCESO DENEGADO</h1>
        <p style={{ color: '#888', maxWidth: '400px', lineHeight: '1.6' }}>
          La cuenta <strong>{unauthorizedEmail}</strong> no tiene permisos de administrador.
        </p>
        <button 
          onClick={() => auth.signOut()}
          style={{ marginTop: '24px', padding: '12px 24px', background: '#d41920', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          CERRAR SESIÓN Y PROBAR OTRA CUENTA
        </button>
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
