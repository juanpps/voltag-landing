import React, { useState, useEffect } from 'react';
import { getPlans, savePlansLocally } from '../../utils/content';

export default function PlansModule() {
  const [plans, setPlans] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setPlans(getPlans());
  }, []);

  const handlePlanChange = (index, field, value) => {
    const updated = [...plans];
    updated[index] = { ...updated[index], [field]: value };
    setPlans(updated);
  };

  const handleFeatureChange = (planIndex, featureIndex, value) => {
    const updated = [...plans];
    const features = [...(updated[planIndex].features || [])];
    features[featureIndex] = value;
    updated[planIndex].features = features;
    setPlans(updated);
  };

  const addFeature = (planIndex) => {
    const updated = [...plans];
    const features = [...(updated[planIndex].features || []), 'Nuevo beneficio'];
    updated[planIndex].features = features;
    setPlans(updated);
  };

  const removeFeature = (planIndex, featureIndex) => {
    const updated = [...plans];
    const features = updated[planIndex].features.filter((_, idx) => idx !== featureIndex);
    updated[planIndex].features = features;
    setPlans(updated);
  };

  const handleSave = () => {
    setSaving(true);
    try {
      savePlansLocally(plans);
      setMessage('✅ Planes guardados en memoria local y activos en la web.');
      setTimeout(() => setMessage(''), 4000);
    } catch (e) {
      setMessage('❌ Error al guardar planes: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(plans, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "plans.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: '1.8rem', margin: '0 0 6px 0' }}>Gestión de Planes y Precios</h1>
          <p style={{ color: '#888', margin: 0, fontSize: '0.9rem' }}>
            Edita los nombres, precios, períodos, badges y mensajes de WhatsApp.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={downloadJson}
            style={{ ...btnStyle, background: '#222', border: '1px solid rgba(255,255,255,0.2)' }}
            title="Descarga el archivo JSON para el repositorio"
          >
            📥 Descargar plans.json
          </button>
          <button 
            onClick={handleSave} 
            disabled={saving}
            style={btnStyle}
          >
            {saving ? 'Guardando...' : '💾 Guardar Cambios'}
          </button>
        </div>
      </div>

      {message && (
        <div style={{ padding: '12px 16px', background: message.startsWith('✅') ? 'rgba(74, 222, 128, 0.1)' : 'rgba(212, 25, 32, 0.1)', borderLeft: '4px solid', borderColor: message.startsWith('✅') ? '#4ade80' : '#d41920', color: '#fff', marginBottom: '24px' }}>
          {message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {plans.map((plan, pIdx) => (
          <div key={plan.id} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ color: '#d41920', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                ID: {plan.id}
              </span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#aaa', fontSize: '0.8rem', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={!!plan.featured} 
                  onChange={(e) => handlePlanChange(pIdx, 'featured', e.target.checked)}
                />
                Destacado
              </label>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Nombre del Plan</label>
              <input 
                type="text" 
                value={plan.name || ''} 
                onChange={(e) => handlePlanChange(pIdx, 'name', e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={labelStyle}>Precio (ej: 69K)</label>
                <input 
                  type="text" 
                  value={plan.price || ''} 
                  onChange={(e) => handlePlanChange(pIdx, 'price', e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Período (ej: /mes)</label>
                <input 
                  type="text" 
                  value={plan.period || ''} 
                  onChange={(e) => handlePlanChange(pIdx, 'period', e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Badge / Etiqueta</label>
              <input 
                type="text" 
                value={plan.badge || ''} 
                onChange={(e) => handlePlanChange(pIdx, 'badge', e.target.value)}
                placeholder="Ej: Más Popular"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Beneficios ({plan.features?.length || 0})</label>
              {plan.features?.map((feat, fIdx) => (
                <div key={fIdx} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <input 
                    type="text" 
                    value={feat} 
                    onChange={(e) => handleFeatureChange(pIdx, fIdx, e.target.value)}
                    style={{ ...inputStyle, padding: '8px 10px', fontSize: '0.85rem' }}
                  />
                  <button 
                    onClick={() => removeFeature(pIdx, fIdx)}
                    style={{ background: 'transparent', border: '1px solid #333', color: '#ff6666', cursor: 'pointer', padding: '0 8px' }}
                    title="Eliminar beneficio"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button 
                onClick={() => addFeature(pIdx)}
                style={{ background: '#1c1c1c', border: '1px dashed #444', color: '#aaa', cursor: 'pointer', width: '100%', padding: '6px', fontSize: '0.8rem', marginTop: '6px' }}
              >
                + Añadir beneficio
              </button>
            </div>

            <div>
              <label style={labelStyle}>Mensaje WhatsApp CTA</label>
              <input 
                type="text" 
                value={plan.whatsappMsg || ''} 
                onChange={(e) => handlePlanChange(pIdx, 'whatsappMsg', e.target.value)}
                style={{ ...inputStyle, fontSize: '0.8rem' }}
              />
            </div>
          </div>
        ))}
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
