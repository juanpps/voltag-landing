import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase.client';

export default function PlansModule() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const defaultPlans = [
    { id: '01_dia', name: 'Día', price: '10K', period: '/día', featured: false, badge: '', features: ['Acceso por 1 día', 'Zonas cardio y musculación', 'Asesoría básica'], ctaText: 'Entrenar Hoy', whatsappMsg: '¡Hola Voltag! 💪 Quiero pagar y entrenar por el DÍA.' },
    { id: '02_semana', name: 'Semana', price: '30K', period: '/semana', featured: false, badge: '', features: ['Acceso por 7 días', 'Zonas cardio y musculación', 'Asesoría continua'], ctaText: 'Ir 1 Semana', whatsappMsg: '¡Hola Voltag! 💪 Quiero inscribirme por 1 SEMANA.' },
    { id: '03_quincena', name: 'Quincena', price: '40K', period: '/quincena', featured: false, badge: '', features: ['Acceso por 15 días', 'Zonas cardio y musculación', 'Asesoría continua'], ctaText: 'Ir Quincena', whatsappMsg: '¡Hola Voltag! 💪 Quiero inscribirme por 1 QUINCENA.' },
    { id: '04_mes', name: 'Mes', price: '69K', period: '/mes', featured: true, badge: 'Popular', features: ['Todo incluido', 'Acceso completo al horario', 'Planificación básica'], ctaText: 'Ir Mensual', whatsappMsg: '¡Hola Voltag! 💪 Me interesa el plan MENSUAL.' },
    { id: '05_4meses', name: '4 Meses', price: '250K', period: '/4 meses', featured: false, badge: '', features: ['Todo del plan mensual', 'Descuento aplicado', 'Planificación avanzada'], ctaText: 'Inscribirme', whatsappMsg: '¡Hola Voltag! 🔥 Me interesa el plan de 4 MESES.' },
    { id: '06_semestre', name: 'Semestre', price: '350K', period: '/semestre', featured: false, badge: 'Mejor Valor', features: ['Ahorras más a largo plazo', 'Beneficios completos Voltag'], ctaText: 'Inscribirme', whatsappMsg: '¡Hola Voltag! ⚡ Me interesa el plan SEMESTRAL.' },
    { id: '07_pareja', name: 'Plan Pareja', price: '65K', period: 'c/u por mes', featured: false, badge: 'Dúo', features: ['Aplica viniendo juntos', 'Disfrutan todos los beneficios'], ctaText: 'Ir en Pareja', whatsappMsg: '¡Hola Voltag! 👥 Nos interesa el PLAN PAREJA.' }
  ];

  useEffect(() => {
    async function loadData() {
      try {
        const fetchPromise = getDocs(collection(db, "planes"));
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2000));
        
        const querySnapshot = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (querySnapshot && !querySnapshot.empty) {
          const loadedPlans = [];
          querySnapshot.forEach((doc) => {
            loadedPlans.push({ id: doc.id, ...doc.data() });
          });
          loadedPlans.sort((a,b) => a.id.localeCompare(b.id));
          setPlans(loadedPlans);
        } else {
          setPlans(defaultPlans);
        }
      } catch (err) {
        console.error("Error loading plans (might be offline):", err);
        setPlans(defaultPlans);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const savePromises = plans.map(plan => {
        const { id, ...data } = plan;
        return setDoc(doc(db, 'planes', id), data);
      });
      const saveAllPromise = Promise.all(savePromises);
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000));
      
      await Promise.race([saveAllPromise, timeoutPromise]);
      setMessage('✅ Planes actualizados exitosamente.');
    } catch (err) {
      console.error(err);
      setMessage('❌ Error al guardar. Revisa conexión y permisos.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const updatePlan = (index, field, value) => {
    const updated = [...plans];
    updated[index][field] = value;
    setPlans(updated);
  };

  const handleFeatureChange = (planIdx, featureIdx, value) => {
    const updated = [...plans];
    updated[planIdx].features[featureIdx] = value;
    setPlans(updated);
  };

  const addFeature = (planIdx) => {
    const updated = [...plans];
    updated[planIdx].features.push('Nuevo beneficio');
    setPlans(updated);
  };

  const removeFeature = (planIdx, featureIdx) => {
    const updated = [...plans];
    updated[planIdx].features.splice(featureIdx, 1);
    setPlans(updated);
  };

  if (loading) return <div style={{ color: '#aaa' }}>Cargando planes...</div>;

  return (
    <div className="admin-module">
      <div className="admin-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={styles.title}>Planes y Precios</h1>
          <p style={styles.subtitle}>Modifica los precios, beneficios y disponibilidad mostrada en la web.</p>
        </div>
        <button onClick={handleSave} style={styles.button} disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar Todos los Planes'}
        </button>
      </div>

      {message && <div style={{ background: 'rgba(212,25,32,0.1)', padding: '16px', marginBottom: '24px', color: '#fff' }}>{message}</div>}

      <div style={styles.grid}>
        {plans.map((plan, planIdx) => (
          <div key={plan.id} style={{...styles.card, border: plan.featured ? '2px solid #d41920' : '1px solid rgba(255,255,255,0.05)'}}>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nombre del Plan</label>
              <input value={plan.name} onChange={(e) => updatePlan(planIdx, 'name', e.target.value)} style={styles.input} />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{...styles.inputGroup, flex: 1}}>
                <label style={styles.label}>Precio</label>
                <input value={plan.price} onChange={(e) => updatePlan(planIdx, 'price', e.target.value)} style={styles.input} />
              </div>
              <div style={{...styles.inputGroup, flex: 1}}>
                <label style={styles.label}>Frecuencia</label>
                <input value={plan.period} onChange={(e) => updatePlan(planIdx, 'period', e.target.value)} style={styles.input} placeholder="/mes" />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '0.85rem' }}>
                <input type="checkbox" checked={plan.featured} onChange={(e) => updatePlan(planIdx, 'featured', e.target.checked)} />
                ¿Destacado?
              </label>
            </div>

            <div style={{...styles.inputGroup, marginTop: '16px'}}>
              <label style={styles.label}>Etiqueta (Badge)</label>
              <input value={plan.badge} onChange={(e) => updatePlan(planIdx, 'badge', e.target.value)} style={styles.input} placeholder="Ej: Más popular" />
            </div>

            <div style={{...styles.inputGroup, marginTop: '16px'}}>
              <label style={styles.label}>Mensaje a WhatsApp</label>
              <textarea value={plan.whatsappMsg} onChange={(e) => updatePlan(planIdx, 'whatsappMsg', e.target.value)} style={{...styles.input, minHeight: '60px'}} />
            </div>

            <div style={{ marginTop: '24px' }}>
              <label style={styles.label}>Beneficios ({plan.features.length})</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                {plan.features.map((feat, featIdx) => (
                  <div key={featIdx} style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      value={feat} 
                      onChange={(e) => handleFeatureChange(planIdx, featIdx, e.target.value)} 
                      style={{...styles.input, flex: 1, padding: '8px'}} 
                    />
                    <button onClick={() => removeFeature(planIdx, featIdx)} style={{ background: '#333', color: '#fff', border:'none', padding:'0 12px', cursor:'pointer' }}>X</button>
                  </div>
                ))}
                <button onClick={() => addFeature(planIdx)} style={{ background: 'transparent', color: '#d41920', border: '1px dashed #d41920', padding: '8px', cursor: 'pointer', marginTop: '4px' }}>
                  + Añadir beneficio
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  title: { fontFamily: 'var(--font-heading)', fontSize: '2rem', margin: '0 0 8px 0', color: '#fff' },
  subtitle: { color: '#888', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' },
  card: { background: '#0f0f0f', padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { color: '#aaa', fontSize: '0.8rem', fontWeight: '600' },
  input: { background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '6px', outline: 'none' },
  button: { background: '#d41920', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
};
