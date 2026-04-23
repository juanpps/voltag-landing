import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../utils/firebase.client';

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      // Allow user to select account always
      provider.setCustomParameters({ prompt: 'select_account' });
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const adminEmailsString = import.meta.env.PUBLIC_ADMIN_EMAIL || '';
      const authorizedEmails = adminEmailsString.split(',').map(e => e.trim().toLowerCase());
      
      if (!user.email || !authorizedEmails.includes(user.email.toLowerCase())) {
        setError('Acceso denegado: El correo de Google seleccionado no está autorizado.');
        // Sign them out immediately so they don't stay logged in with a rejected account
        await auth.signOut();
      }
      // If valid, AdminApp.jsx will catch the auth state change and redirect
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al iniciar sesión con Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.glow} />
      
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          {/* We rely on the global Voltag red for accents */}
          <h1 style={styles.logoText}>VOLTAG<span style={styles.logoAccent}>GYM</span></h1>
          <p style={styles.subtitle}>Panel de Administración</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {error}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button 
            type="button" 
            onClick={handleGoogleLogin}
            style={{ ...styles.googleBtn, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {loading ? 'Verificando con Google...' : 'Continuar con Google'}
          </button>
        </div>
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
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    margin: 0
  },
  googleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: '100%',
    background: '#fff',
    color: '#000',
    border: 'none',
    padding: '16px',
    fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
    fontSize: '0.9rem',
    fontWeight: '700',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'transform 0.2s, box-shadow 0.3s',
    borderRadius: '4px'
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
// Small hack for hover state since inline styles don't support pseudo classes well
const styleNode = document.createElement('style');
styleNode.innerHTML = `
  button:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(255,255,255,0.2) !important; }
`;
if (typeof window !== 'undefined') {
  document.head.appendChild(styleNode);
}
