import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../../utils/firebase.client';

export default function PromotionsModule() {
  const [promo, setPromo] = useState({
    modalActive: false,
    modalTitle: '¡Promo Especial!',
    modalText: 'Inscríbete hoy y no pagues matrícula. Válido por tiempo limitado.',
    modalImage: '',
    modalCta: 'Aprovechar Oferta',
    modalLink: 'https://wa.me/573180046952',
    bannerActive: false,
    bannerText: '🔥 ¡Nuevos horarios desde las 5AM! 🔥'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, 'configuracion', 'promociones');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPromo(prev => ({...prev, ...docSnap.data()}));
        }
      } catch (err) {
        console.error("Error loading promos:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // VALIDATION: Prevent giant files if needed, but Storage handles it.
    // However, let's keep it under 5MB for web performance.
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen es demasiado pesada. Intenta con una de menos de 5MB.");
      return;
    }

    setUploading(true);
    setMessage('Subiendo imagen...');

    try {
      const storageRef = ref(storage, `promos/modal_${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setPromo(prev => ({...prev, modalImage: downloadURL}));
      setMessage('✅ Imagen subida correctamente.');
    } catch (err) {
      console.error("Storage Error:", err);
      setMessage('❌ Error al subir imagen. Revisa permisos de Storage.');
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await setDoc(doc(db, 'configuracion', 'promociones'), promo);
      setMessage('✅ Promociones guardadas exitosamente.');
    } catch (err) {
      console.error(err);
      setMessage('❌ Error al guardar. Revisa conexión.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setPromo(prev => ({...prev, [e.target.name]: value}));
  };

  if (loading) return <div style={{ color: '#aaa' }}>Cargando promociones...</div>;

  return (
    <div className="admin-module">
      <div className="admin-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={styles.title}>Promociones y Modales</h1>
          <p style={styles.subtitle}>Activa o desactiva banners de anuncios y la ventana emergente central.</p>
        </div>
        <button onClick={handleSave} style={styles.button} disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar Promociones'}
        </button>
      </div>

      {message && <div style={{ background: 'rgba(212,25,32,0.1)', padding: '16px', marginBottom: '24px', color: '#fff' }}>{message}</div>}
      
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2>Banner de Cabecera (Superior)</h2>
          <label style={styles.toggle}>
            <input type="checkbox" name="bannerActive" checked={promo.bannerActive} onChange={handleChange} />
            <span style={{ color: promo.bannerActive ? '#4caf50' : '#888' }}>{promo.bannerActive ? 'Activo' : 'Apagado'}</span>
          </label>
        </div>
        <div style={{...styles.inputGroup, opacity: promo.bannerActive ? 1 : 0.5 }}>
          <label style={styles.label}>Texto del Banner Superior</label>
          <input name="bannerText" value={promo.bannerText} onChange={handleChange} style={styles.input} disabled={!promo.bannerActive}/>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2>Modal Emergente (Al entrar a la web)</h2>
          <label style={styles.toggle}>
            <input type="checkbox" name="modalActive" checked={promo.modalActive} onChange={handleChange} />
            <span style={{ color: promo.modalActive ? '#4caf50' : '#888' }}>{promo.modalActive ? 'Activo' : 'Apagado'}</span>
          </label>
        </div>
        
        <div className="admin-module-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', opacity: promo.modalActive ? 1 : 0.5 }}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Título Promocional</label>
            <input name="modalTitle" value={promo.modalTitle} onChange={handleChange} style={styles.input} disabled={!promo.modalActive} />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Texto Descriptivo</label>
            <textarea name="modalText" value={promo.modalText} onChange={handleChange} style={{...styles.input, minHeight: '80px'}} disabled={!promo.modalActive}/>
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Imagen Promocional (Se subirá a la Base de Datos)</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              style={styles.input} 
              disabled={!promo.modalActive || uploading}
            />
            {uploading && <div style={{ color: '#d41920', fontSize: '0.8rem' }}>Subiendo archivo...</div>}
            {promo.modalImage && !uploading && (
              <div style={{ position: 'relative', marginTop: '10px', display: 'inline-block' }}>
                <img src={promo.modalImage} alt="Preview" style={{ height: '120px', objectFit: 'contain', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#000' }} />
                <button 
                  onClick={(e) => { e.preventDefault(); setPromo(prev => ({...prev, modalImage: ''})); }}
                  style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#d41920', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
                  title="Eliminar Imagen"
                >x</button>
              </div>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Texto del Botón</label>
            <input name="modalCta" value={promo.modalCta} onChange={handleChange} style={styles.input} disabled={!promo.modalActive}/>
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Enlace del Botón (WhatsApp)</label>
            <input name="modalLink" value={promo.modalLink} onChange={handleChange} style={styles.input} disabled={!promo.modalActive}/>
          </div>
        </div>
      </div>

    </div>
  );
}

const styles = {
  title: { fontFamily: 'var(--font-heading)', fontSize: '2rem', margin: '0 0 8px 0', color: '#fff' },
  subtitle: { color: '#888', margin: 0 },
  section: { background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)', padding: '32px', borderRadius: '12px', marginBottom: '24px' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' },
  toggle: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { color: '#aaa', fontSize: '0.8rem', fontWeight: '600' },
  input: { background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', color: '#fff', borderRadius: '6px', outline: 'none' },
  button: { background: '#d41920', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
};
