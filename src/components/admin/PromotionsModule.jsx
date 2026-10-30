import React, { useState, useEffect } from 'react';
import { getPromotions, savePromotionsLocally } from '../../utils/content';

export default function PromotionsModule() {
  const [promo, setPromo] = useState({
    modalActive: false,
    modalTitle: '',
    modalText: '',
    modalImage: '',
    modalCta: '',
    modalLink: '',
    bannerActive: false,
    bannerText: '',
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setPromo(getPromotions());
  }, []);

  const handleChange = (field, value) => {
    setPromo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    try {
      savePromotionsLocally(promo);
      setMessage('✅ Promociones guardadas y activas en la web en tiempo real.');
      setTimeout(() => setMessage(''), 4000);
    } catch (e) {
      setMessage('❌ Error: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(promo, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "promotions.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: '1.8rem', margin: '0 0 6px 0' }}>Promociones y Banners</h1>
          <p style={{ color: '#888', margin: 0, fontSize: '0.9rem' }}>
            Controla el banner superior animado y el popup emergente de promociones.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={downloadJson}
            style={{ ...btnStyle, background: '#222', border: '1px solid rgba(255,255,255,0.2)' }}
            title="Descarga el archivo JSON para el repositorio"
          >
            📥 Descargar promotions.json
          </button>
          <button onClick={handleSave} disabled={saving} style={btnStyle}>
            {saving ? 'Guardando...' : '💾 Guardar Cambios'}
          </button>
        </div>
      </div>

      {message && (
        <div style={{ padding: '12px 16px', background: message.startsWith('✅') ? 'rgba(74, 222, 128, 0.1)' : 'rgba(212, 25, 32, 0.1)', borderLeft: '4px solid', borderColor: message.startsWith('✅') ? '#4ade80' : '#d41920', color: '#fff', marginBottom: '24px' }}>
          {message}
        </div>
      )}

      {/* Banner Section */}
      <div style={{ ...cardStyle, marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ color: '#fff', margin: 0, fontSize: '1.2rem' }}>Banner Flotante Superior (Hero)</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#aaa', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={!!promo.bannerActive} 
              onChange={(e) => handleChange('bannerActive', e.target.checked)}
            />
            Activar Banner
          </label>
        </div>

        <div>
          <label style={labelStyle}>Texto del Banner (Acepta Emojis)</label>
          <input 
            type="text" 
            value={promo.bannerText || ''} 
            onChange={(e) => handleChange('bannerText', e.target.value)}
            placeholder="🔥 ¡Nuevos horarios desde las 5:30AM! 🔥"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Modal Popup Section */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ color: '#fff', margin: 0, fontSize: '1.2rem' }}>Modal Emergente (Popup CRO)</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#aaa', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={!!promo.modalActive} 
              onChange={(e) => handleChange('modalActive', e.target.checked)}
            />
            Activar Modal
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Título de la Oferta</label>
            <input 
              type="text" 
              value={promo.modalTitle || ''} 
              onChange={(e) => handleChange('modalTitle', e.target.value)}
              placeholder="¡Inscríbete hoy!"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Descripción / Llamado a la Acción</label>
            <textarea 
              rows={3}
              value={promo.modalText || ''} 
              onChange={(e) => handleChange('modalText', e.target.value)}
              placeholder="Detalles de la promoción..."
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Texto Botón CTA</label>
              <input 
                type="text" 
                value={promo.modalCta || ''} 
                onChange={(e) => handleChange('modalCta', e.target.value)}
                placeholder="Aprovechar Oferta"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Enlace CTA (WhatsApp o URL)</label>
              <input 
                type="text" 
                value={promo.modalLink || ''} 
                onChange={(e) => handleChange('modalLink', e.target.value)}
                placeholder="https://wa.me/..."
                style={inputStyle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: '#0d0d0d',
  border: '1px solid rgba(255,255,255,0.06)',
  padding: '24px',
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
