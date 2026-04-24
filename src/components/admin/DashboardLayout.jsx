import React from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase.client';

import SettingsModule from './SettingsModule';
import PlansModule from './PlansModule';
import PromotionsModule from './PromotionsModule';

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    // Router will automatically kick user out to /login
  };

  return (
    <div style={styles.layout} className="admin-layout-wrapper">
      <style>{`
        .admin-layout-wrapper {
          flex-direction: row;
        }
        .admin-sidebar {
          width: 280px;
          border-right: 1px solid rgba(255,255,255,0.05);
          border-bottom: none;
        }
        .admin-main {
          padding: 48px 64px;
        }
        .admin-module-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 900px) {
          .admin-layout-wrapper {
            flex-direction: column !important;
          }
          .admin-sidebar {
            width: 100% !important;
            padding: 24px 0 !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
            height: auto !important;
          }
          .admin-sidebar-nav {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
          .admin-main {
            padding: 24px 16px !important;
          }
          .admin-module-grid {
            grid-template-columns: 1fr !important;
          }
          .admin-title-row {
            flex-direction: column !important;
            gap: 16px !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
      
      {/* Sidebar */}
      <aside style={styles.sidebar} className="admin-sidebar">
        <div style={styles.brand}>
          <h2 style={styles.logoText}>VOLTAG<span style={styles.logoAccent}>GYM</span></h2>
          <span style={styles.badge}>ADMIN</span>
        </div>

        <nav style={styles.nav} className="admin-sidebar-nav">
          <NavLink 
            to="" 
            end
            style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navLinkActive : {}) })}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="promotions" 
            style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navLinkActive : {}) })}
          >
            Promociones
          </NavLink>
          <NavLink 
            to="plans" 
            style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navLinkActive : {}) })}
          >
            Planes
          </NavLink>
          <NavLink 
            to="settings" 
            style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navLinkActive : {}) })}
          >
            Redes
          </NavLink>
        </nav>

        <div style={styles.bottomSection}>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Salir
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={styles.main} className="admin-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="promotions" element={<PromotionsModule />} />
          <Route path="plans" element={<PlansModule />} />
          <Route path="settings" element={<SettingsModule />} />
        </Routes>
      </main>
    </div>
  );
}

function Overview() {
  return (
    <div>
      <h1 style={styles.pageTitle}>Bienvenido al Centro de Comando</h1>
      <p style={{ color: '#aaa', lineHeight: 1.6, maxWidth: '600px' }}>
        Selecciona una opción del menú lateral para modificar textos, precios, banners promocionales 
        o enlaces de redes sociales de la landing page.
      </p>
    </div>
  );
}

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#fff',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  sidebar: {
    width: '280px',
    background: '#050505',
    borderRight: '1px solid rgba(255,255,255,0.05)',
    display: 'flex',
    flexDirection: 'column',
    padding: '32px 0'
  },
  brand: {
    padding: '0 32px',
    marginBottom: '48px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logoText: {
    fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
    fontSize: '1.4rem',
    fontWeight: '900',
    letterSpacing: '1px',
    margin: 0
  },
  logoAccent: {
    color: '#d41920'
  },
  badge: {
    background: 'rgba(212,25,32,0.1)',
    color: '#d41920',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '4px',
    letterSpacing: '1px'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '0 16px',
    flex: 1
  },
  navLink: {
    textDecoration: 'none',
    color: '#888',
    padding: '14px 20px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  navLinkActive: {
    background: 'rgba(255,255,255,0.03)',
    color: '#fff',
    fontWeight: '600',
    borderLeft: '4px solid #d41920',
    borderRadius: '0 8px 8px 0'
  },
  bottomSection: {
    padding: '0 24px',
    marginTop: 'auto'
  },
  logoutBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#aaa',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  main: {
    flex: 1,
    padding: '48px 64px',
    overflowY: 'auto'
  },
  pageTitle: {
    fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
    fontSize: '2.5rem',
    margin: '0 0 16px 0',
    color: '#fff'
  }
};
