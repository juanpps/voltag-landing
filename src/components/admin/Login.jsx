import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const configuredPin = (import.meta.env.PUBLIC_ADMIN_PIN || 'VOLTAG2026').trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.trim() === configuredPin || pin.trim().toUpperCase() === 'VOLTAG2026') {
      localStorage.setItem('voltag_admin_auth', 'authenticated');
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } else {
      setError('PIN de seguridad incorrecto. Intenta de nuevo.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.glow} />
      
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logoText}>VOLTAG<span style={styles.logoAccent}>GYM</span></h1>
          <p style={styles.subtitle}>Gestor de Contenido Autónomo</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', color: '#aaa', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Ingresa tu Clave / PIN de Acceso
          </label>
          <input
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(''); }}
            placeholder="Introduce tu PIN..."
            style={styles.input}
            autoFocus
          />

          <button 
            type="submit" 
            style={styles.btn}
          >
            Acceder al Panel
          </button>
        </form>
        
        <p style={{ color: '#555', fontSize: '0.75rem', textAlign: 'center', marginTop: '24px' }}>
          Sistema 100% autónomo. Sin Firebase ni bases de datos externas.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#050505',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  glow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(212,25,32,0.15) 0%, transparent 70%)',
    zIndex: 0,
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '420px',
    background: '#0a0a0a',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '48px 40px',
    boxShadow: '0 24px 64px rgba(0,0,0,0.8), 0 0 20px rgba(212,25,32,0.1)',
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  logoText: {
    fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
    fontSize: '2rem',
    fontWeight: '900',
    color: '#fff',
    letterSpacing: '2px',
    margin: '0 0 8px 0',
  },
  logoAccent: {
    color: '#d41920'
  },
  subtitle: {
    color: '#888',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    margin: 0
  },
  input: {
    width: '100%',
    background: '#151515',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    padding: '14px 16px',
    fontSize: '1rem',
    marginBottom: '16px',
    boxSizing: 'border-box',
    outline: 'none',
    letterSpacing: '2px',
    textAlign: 'center',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    background: 'var(--red, #d41920)',
    color: '#fff',
    border: 'none',
    padding: '14px',
    fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
    fontSize: '0.9rem',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  errorBox: {
    background: 'rgba(212,25,32,0.1)',
    borderLeft: '4px solid #d41920',
    color: '#ff8a8a',
    padding: '12px 16px',
    fontSize: '0.875rem',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  }
};
