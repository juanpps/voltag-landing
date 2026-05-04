import { useState, useEffect } from 'react';

const WHATSAPP_NUMBER = typeof import.meta !== 'undefined' 
  ? (import.meta.env?.PUBLIC_WHATSAPP_NUMBER || '573180046952')
  : '573180046952';

export default function SignupWizard() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    identificacion: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    fechaNacimiento: '',
    sexo: '',
    telefono: '',
    email: '',
    aceptaTerminos: false,
    aceptaDatos: false,
  });

  useEffect(() => {
    const handler = () => { setIsOpen(true); setStep(1); setErrors({}); };
    window.addEventListener('open-signup-wizard', handler);
    return () => window.removeEventListener('open-signup-wizard', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const update = (field, value) => {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => { const n = { ...p }; delete n[field]; return n; });
  };

  const validateStep = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.primerNombre.trim()) e.primerNombre = 'Requerido';
      if (!form.primerApellido.trim()) e.primerApellido = 'Requerido';
      if (!form.telefono.trim()) e.telefono = 'Requerido';
      else if (!/^\d{7,15}$/.test(form.telefono.replace(/\s/g, ''))) e.telefono = 'Número inválido';
      if (!form.email.trim()) e.email = 'Requerido';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido';
    }
    if (s === 2) {
      if (!form.identificacion.trim()) e.identificacion = 'Requerido';
      if (!form.fechaNacimiento) e.fechaNacimiento = 'Requerido';
      if (!form.sexo) e.sexo = 'Selecciona una opción';
    }
    if (s === 3) {
      if (!form.aceptaTerminos) e.aceptaTerminos = 'Debes aceptar';
      if (!form.aceptaDatos) e.aceptaDatos = 'Debes aceptar';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep(s => s + 1); };
  const prev = () => setStep(s => s - 1);

  const submit = () => {
    if (!validateStep(3)) return;
    const nombre = `${form.primerNombre} ${form.segundoNombre}`.trim();
    const apellido = `${form.primerApellido} ${form.segundoApellido}`.trim();
    const msg = `¡Hola Voltag! 💪 Quiero inscribirme.\n\n` +
      `📋 *Datos de Inscripción:*\n` +
      `• Nombre: ${nombre} ${apellido}\n` +
      `• Identificación: ${form.identificacion}\n` +
      `• Teléfono: ${form.telefono}\n` +
      `• Email: ${form.email}\n` +
      `• Fecha Nac.: ${form.fechaNacimiento}\n` +
      `• Sexo: ${form.sexo}\n\n` +
      `✅ Acepto términos, condiciones y tratamiento de datos.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    setIsOpen(false);
    setStep(1);
    setForm({ identificacion:'', primerNombre:'', segundoNombre:'', primerApellido:'', segundoApellido:'', fechaNacimiento:'', sexo:'', telefono:'', email:'', aceptaTerminos:false, aceptaDatos:false });
  };

  const close = () => { setIsOpen(false); setStep(1); };

  if (!isOpen) return null;

  const inputStyle = (field) => ({
    width: '100%', padding: '14px 16px', background: '#111', border: `1px solid ${errors[field] ? '#e63946' : 'rgba(255,255,255,0.1)'}`,
    color: '#f0f0f0', fontFamily: "'Barlow', sans-serif", fontSize: '0.95rem', outline: 'none',
    transition: 'border-color 0.3s', borderRadius: 0,
  });

  const labelStyle = { fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#aaa', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' };
  const reqDot = { color: '#e63946', fontSize: '1rem' };
  const errStyle = { color: '#e63946', fontSize: '0.75rem', marginTop: '4px', fontFamily: "'Barlow', sans-serif" };

  return (
    <div style={{ position:'fixed', inset:0, zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px' }} onClick={close}>
      {/* Backdrop */}
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)' }} />

      {/* Modal */}
      <div onClick={e => e.stopPropagation()} style={{ position:'relative', width:'100%', maxWidth:'520px', maxHeight:'90vh', overflowY:'auto', background:'#0a0a0a', border:'1px solid rgba(212,25,32,0.3)', animation:'wizardIn 0.4s ease-out' }}>
        {/* Close */}
        <button onClick={close} style={{ position:'absolute', top:'16px', right:'16px', background:'none', border:'none', color:'#777', fontSize:'1.8rem', cursor:'pointer', zIndex:2, lineHeight:1 }}>×</button>

        {/* Header */}
        <div style={{ padding:'32px 32px 0', borderBottom:'1px solid rgba(255,255,255,0.05)', paddingBottom:'24px' }}>
          <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:'0.7rem', fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:'#d41920', marginBottom:'8px', display:'flex', alignItems:'center', gap:'8px' }}>
            <span style={{ width:'24px', height:'2px', background:'#d41920', display:'inline-block' }}></span>
            Inscripción Voltag Gym
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:'2rem', color:'#f0f0f0', lineHeight:1.1, margin:0 }}>
            {step === 1 && 'Datos Personales'}
            {step === 2 && 'Información Adicional'}
            {step === 3 && 'Términos y Condiciones'}
          </h2>

          {/* Progress */}
          <div style={{ display:'flex', gap:'8px', marginTop:'20px' }}>
            {[1,2,3].map(s => (
              <div key={s} style={{ flex:1, height:'3px', background: s <= step ? '#d41920' : 'rgba(255,255,255,0.08)', transition:'background 0.4s' }} />
            ))}
          </div>
          <div style={{ fontFamily:"'Barlow', sans-serif", fontSize:'0.75rem', color:'#777', marginTop:'8px' }}>Paso {step} de 3</div>
        </div>

        {/* Body */}
        <div style={{ padding:'28px 32px 32px' }}>

          {/* STEP 1 */}
          {step === 1 && (
            <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                <div>
                  <label style={labelStyle}>Primer Nombre <span style={reqDot}>*</span></label>
                  <input style={inputStyle('primerNombre')} value={form.primerNombre} onChange={e => update('primerNombre', e.target.value)} placeholder="Ej: Juan" />
                  {errors.primerNombre && <div style={errStyle}>{errors.primerNombre}</div>}
                </div>
                <div>
                  <label style={labelStyle}>Segundo Nombre</label>
                  <input style={inputStyle('segundoNombre')} value={form.segundoNombre} onChange={e => update('segundoNombre', e.target.value)} placeholder="Opcional" />
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                <div>
                  <label style={labelStyle}>Primer Apellido <span style={reqDot}>*</span></label>
                  <input style={inputStyle('primerApellido')} value={form.primerApellido} onChange={e => update('primerApellido', e.target.value)} placeholder="Ej: Pérez" />
                  {errors.primerApellido && <div style={errStyle}>{errors.primerApellido}</div>}
                </div>
                <div>
                  <label style={labelStyle}>Segundo Apellido</label>
                  <input style={inputStyle('segundoApellido')} value={form.segundoApellido} onChange={e => update('segundoApellido', e.target.value)} placeholder="Opcional" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Teléfono / Celular <span style={reqDot}>*</span></label>
                <input style={inputStyle('telefono')} value={form.telefono} onChange={e => update('telefono', e.target.value)} placeholder="Ej: 3181234567" type="tel" />
                {errors.telefono && <div style={errStyle}>{errors.telefono}</div>}
              </div>
              <div>
                <label style={labelStyle}>Email <span style={reqDot}>*</span></label>
                <input style={inputStyle('email')} value={form.email} onChange={e => update('email', e.target.value)} placeholder="correo@ejemplo.com" type="email" />
                {errors.email && <div style={errStyle}>{errors.email}</div>}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
              <div>
                <label style={labelStyle}>No. Identificación <span style={reqDot}>*</span></label>
                <input style={inputStyle('identificacion')} value={form.identificacion} onChange={e => update('identificacion', e.target.value)} placeholder="Cédula o documento" />
                {errors.identificacion && <div style={errStyle}>{errors.identificacion}</div>}
              </div>
              <div>
                <label style={labelStyle}>Fecha de Nacimiento <span style={reqDot}>*</span></label>
                <input style={{ ...inputStyle('fechaNacimiento'), colorScheme:'dark' }} type="date" value={form.fechaNacimiento} onChange={e => update('fechaNacimiento', e.target.value)} />
                {errors.fechaNacimiento && <div style={errStyle}>{errors.fechaNacimiento}</div>}
              </div>
              <div>
                <label style={labelStyle}>Sexo <span style={reqDot}>*</span></label>
                <div style={{ display:'flex', gap:'12px' }}>
                  {['Masculino','Femenino','Otro'].map(opt => (
                    <button key={opt} onClick={() => update('sexo', opt)} style={{
                      flex:1, padding:'14px', background: form.sexo === opt ? 'rgba(212,25,32,0.15)' : '#111',
                      border: `1px solid ${form.sexo === opt ? '#d41920' : 'rgba(255,255,255,0.1)'}`,
                      color: form.sexo === opt ? '#f0f0f0' : '#777', fontFamily:"'Barlow Condensed', sans-serif",
                      fontSize:'0.85rem', fontWeight:600, letterSpacing:'1px', textTransform:'uppercase', cursor:'pointer', transition:'all 0.3s'
                    }}>{opt}</button>
                  ))}
                </div>
                {errors.sexo && <div style={errStyle}>{errors.sexo}</div>}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
              {/* Terms */}
              <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.06)', padding:'20px', maxHeight:'180px', overflowY:'auto' }}>
                <h4 style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:'0.85rem', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'#d41920', marginBottom:'12px' }}>Términos y Condiciones</h4>
                <div style={{ fontFamily:"'Barlow', sans-serif", fontSize:'0.82rem', color:'#999', lineHeight:1.7 }}>
                  <p>Al inscribirse en Voltag Gym, el usuario acepta las siguientes condiciones:</p>
                  <p style={{marginTop:'8px'}}>1. El uso de las instalaciones es exclusivamente para personas inscritas con plan activo.</p>
                  <p>2. Voltag Gym no se hace responsable por lesiones causadas por mal uso de los equipos o falta de seguimiento de las indicaciones del entrenador.</p>
                  <p>3. Está prohibido el ingreso bajo efectos de sustancias psicoactivas o alcohol.</p>
                  <p>4. El usuario debe presentar su documento de identidad al momento de la inscripción presencial.</p>
                  <p>5. Los planes adquiridos son personales e intransferibles.</p>
                  <p>6. Voltag Gym se reserva el derecho de modificar horarios y tarifas con previo aviso.</p>
                  <p>7. El usuario se compromete a respetar las normas de convivencia y a hacer uso adecuado de los equipos.</p>
                </div>
              </div>
              <label style={{ display:'flex', alignItems:'flex-start', gap:'12px', cursor:'pointer' }}>
                <input type="checkbox" checked={form.aceptaTerminos} onChange={e => update('aceptaTerminos', e.target.checked)}
                  style={{ accentColor:'#d41920', width:'18px', height:'18px', marginTop:'2px', flexShrink:0 }} />
                <span style={{ fontFamily:"'Barlow', sans-serif", fontSize:'0.85rem', color:'#aaa', lineHeight:1.5 }}>
                  Acepto los <strong style={{color:'#f0f0f0'}}>términos y condiciones</strong> de Voltag Gym.
                </span>
              </label>
              {errors.aceptaTerminos && <div style={{...errStyle, marginTop:'-16px'}}>{errors.aceptaTerminos}</div>}

              {/* Data treatment */}
              <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.06)', padding:'20px', maxHeight:'180px', overflowY:'auto' }}>
                <h4 style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:'0.85rem', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'#d41920', marginBottom:'12px' }}>Tratamiento de Datos Personales</h4>
                <div style={{ fontFamily:"'Barlow', sans-serif", fontSize:'0.82rem', color:'#999', lineHeight:1.7 }}>
                  <p>En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013, Voltag Gym informa:</p>
                  <p style={{marginTop:'8px'}}>1. Los datos personales recopilados serán utilizados exclusivamente para la gestión de la inscripción, comunicaciones relacionadas con el servicio y mejora de la experiencia del usuario.</p>
                  <p>2. Voltag Gym garantiza la confidencialidad, seguridad y protección de los datos personales.</p>
                  <p>3. El titular de los datos tiene derecho a conocer, actualizar, rectificar y solicitar la supresión de sus datos personales.</p>
                  <p>4. Los datos no serán compartidos con terceros sin autorización previa del titular, salvo obligación legal.</p>
                  <p>5. Para ejercer sus derechos, puede comunicarse al WhatsApp de Voltag Gym.</p>
                </div>
              </div>
              <label style={{ display:'flex', alignItems:'flex-start', gap:'12px', cursor:'pointer' }}>
                <input type="checkbox" checked={form.aceptaDatos} onChange={e => update('aceptaDatos', e.target.checked)}
                  style={{ accentColor:'#d41920', width:'18px', height:'18px', marginTop:'2px', flexShrink:0 }} />
                <span style={{ fontFamily:"'Barlow', sans-serif", fontSize:'0.85rem', color:'#aaa', lineHeight:1.5 }}>
                  Autorizo el <strong style={{color:'#f0f0f0'}}>tratamiento de mis datos personales</strong> según la política descrita.
                </span>
              </label>
              {errors.aceptaDatos && <div style={{...errStyle, marginTop:'-16px'}}>{errors.aceptaDatos}</div>}
            </div>
          )}

          {/* Buttons */}
          <div style={{ display:'flex', gap:'12px', marginTop:'32px', justifyContent:'space-between' }}>
            {step > 1 ? (
              <button onClick={prev} style={{ padding:'14px 28px', background:'transparent', border:'1px solid rgba(255,255,255,0.15)', color:'#f0f0f0', fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:'0.85rem', letterSpacing:'2px', textTransform:'uppercase', cursor:'pointer', transition:'all 0.3s' }}>
                ← Atrás
              </button>
            ) : <div />}
            {step < 3 ? (
              <button onClick={next} style={{ padding:'14px 32px', background:'#d41920', border:'none', color:'#fff', fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:'0.85rem', letterSpacing:'2px', textTransform:'uppercase', cursor:'pointer', transition:'all 0.3s', clipPath:'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}>
                Siguiente →
              </button>
            ) : (
              <button onClick={submit} style={{ padding:'14px 32px', background:'#25d366', border:'none', color:'#fff', fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:'0.85rem', letterSpacing:'2px', textTransform:'uppercase', cursor:'pointer', transition:'all 0.3s', display:'flex', alignItems:'center', gap:'10px', clipPath:'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Enviar por WhatsApp
              </button>
            )}
          </div>
        </div>

        <style>{`
          @keyframes wizardIn {
            from { opacity: 0; transform: translateY(30px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}
