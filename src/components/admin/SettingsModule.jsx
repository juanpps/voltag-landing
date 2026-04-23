import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase.client';

export default function SettingsModule() {
  const [settings, setSettings] = useState({
    instagram: '',
    tiktok: '',
    whatsapp: '',
    mapsUrl: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, 'configuracion', 'global');
        
        // Timeout to prevent infinite loading if Firestore is disabled
        const fetchPromise = getDoc(docRef);
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('timeout')), 2000)
        );
        
        const docSnap = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (docSnap && docSnap.exists()) {
          setSettings(docSnap.data());
        }
      } catch (err) {
        console.error("Error loading settings (might be disabled):", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const savePromise = setDoc(doc(db, 'configuracion', 'global'), settings);
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000));
      await Promise.race([savePromise, timeoutPromise]);
      setMessage('✅ Configuración guardada exitosamente.');
    } catch (err) {
      console.error(err);
      setMessage('❌ Error al guardar. Revisa los permisos de Firebase.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleChange = (e) => {
    setSettings(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  if (loading) return <div style={{ color: '#aaa' }}>Cargando datos...</div>;

  return (
    <div className="admin-module">
      <h1 style={styles.title}>Redes Sociales y Contacto</h1>
      <p style={styles.subtitle}>Actualiza los enlaces que aparecen en el menú principal, pie de página y botones de WhatsApp.</p>
      
      <form onSubmit={handleSave} style={styles.form}>
        
        <div style={styles.grid}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Número de WhatsApp (Ej: 573180046952)</label>
            <input 
              name="whatsapp" value={settings.whatsapp} onChange={handleChange}
              style={styles.input} placeholder="Sin el + inicial"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Enlace de Instagram</label>
            <input 
              name="instagram" value={settings.instagram} onChange={handleChange}
              style={styles.input} placeholder="https://instagram.com/..."
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Enlace de TikTok</label>
            <input 
              name="tiktok" value={settings.tiktok} onChange={handleChange}
              style={styles.input} placeholder="https://tiktok.com/@..."
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>URL de Google Maps</label>
            <input 
              name="mapsUrl" value={settings.mapsUrl} onChange={handleChange}
              style={styles.input} placeholder="https://maps.app.goo.gl/..."
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Dirección Física</label>
            <input 
              name="address" value={settings.address} onChange={handleChange}
              style={styles.input} placeholder="Cl 12 # 20 Oeste - 10..."
            />
          </div>
        </div>

        <div style={styles.footer}>
          {message && <span style={styles.message}>{message}</span>}
          <button type="submit" style={styles.button} disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2rem',
    margin: '0 0 8px 0',
    color: '#fff'
  },
  subtitle: {
    color: '#888',
    marginBottom: '32px'
  },
  form: {
    background: '#0f0f0f',
    border: '1px solid rgba(255,255,255,0.05)',
    padding: '32px',
    borderRadius: '12px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    color: '#aaa',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  input: {
    background: '#1a1a1a',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '12px 16px',
    color: '#fff',
    borderRadius: '6px',
    outline: 'none'
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '16px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    paddingTop: '24px'
  },
  button: {
    background: '#d41920',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  message: {
    color: '#fff',
    fontSize: '0.9rem'
  }
};
