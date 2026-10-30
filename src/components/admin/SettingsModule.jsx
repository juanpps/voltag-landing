import React, { useState, useEffect } from 'react';
import { getSettings, saveSettingsLocally } from '../../utils/content';

export default function SettingsModule() {
  const [settings, setSettings] = useState({
    instagram: '',
    tiktok: '',
    whatsapp: '',
    mapsUrl: '',
    address: '',
    scheduleWeekdays: '',
    scheduleSaturday: '',
    scheduleSunday: '',
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      saveSettingsLocally(settings);
      setMessage('✅ Configuración guardada y activa en toda la web.');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setMessage('❌ Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "settings.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: '1.8rem', margin: '0 0 6px 0' }}>Redes, Contacto y Ubicación</h1>
          <p style={{ color: '#888', margin: 0, fontSize: '0.9rem' }}>
            Gestiona los enlaces globales de WhatsApp, Instagram, TikTok y Google Maps.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            type="button"
            onClick={downloadJson}
            style={{ ...btnStyle, background: '#222', border: '1px solid rgba(255,255,255,0.2)' }}
            title="Descarga el archivo JSON para el repositorio"
          >
            📥 Descargar settings.json
          </button>
          <button type="submit" form="settings-form" disabled={saving} style={btnStyle}>
            {saving ? 'Guardando...' : '💾 Guardar Cambios'}
          </button>
        </div>
      </div>

      {message && (
        <div style={{ padding: '12px 16px', background: message.startsWith('✅') ? 'rgba(74, 222, 128, 0.1)' : 'rgba(212, 25, 32, 0.1)', borderLeft: '4px solid', borderColor: message.startsWith('✅') ? '#4ade80' : '#d41920', color: '#fff', marginBottom: '24px' }}>
          {message}
        </div>
      )}

      <form id="settings-form" onSubmit={handleSave} style={cardStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Número de WhatsApp Oficial (sin '+')</label>
            <input 
              type="text" 
              name="whatsapp" 
              value={settings.whatsapp || ''} 
              onChange={handleChange}
              placeholder="573180046952"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Dirección Física</label>
            <input 
              type="text" 
              name="address" 
              value={settings.address || ''} 
              onChange={handleChange}
              placeholder="Cl 12 # 20 Oeste - 10, Manzanares Sector 17"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Enlace a Instagram</label>
            <input 
              type="url" 
              name="instagram" 
              value={settings.instagram || ''} 
              onChange={handleChange}
              placeholder="https://www.instagram.com/voltag_gym"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Enlace a TikTok</label>
            <input 
              type="url" 
              name="tiktok" 
              value={settings.tiktok || ''} 
              onChange={handleChange}
              placeholder="https://www.tiktok.com/@voltag_gym"
              style={inputStyle}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Enlace a Google Maps</label>
            <input 
              type="url" 
              name="mapsUrl" 
              value={settings.mapsUrl || ''} 
              onChange={handleChange}
              placeholder="https://maps.app.goo.gl/..."
              style={inputStyle}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

const cardStyle = {
  background: '#0d0d0d',
  border: '1px solid rgba(255,255,255,0.06)',
  padding: '28px',
  borderRadius: '4px',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.75rem',
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '6px',
};

const inputStyle = {
  width: '100%',
  background: '#151515',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  padding: '10px 12px',
  fontSize: '0.9rem',
  boxSizing: 'border-box',
  outline: 'none',
};

const btnStyle = {
  background: '#d41920',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  fontFamily: 'inherit',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '0.85rem',
  letterSpacing: '1px',
};
