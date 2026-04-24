import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase.client';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [whatsapp, setWhatsapp] = useState('573180046952');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Listen to Global Config for WhatsApp
    const unsubGlobal = onSnapshot(doc(db, 'configuracion', 'global'), (doc) => {
      if (doc.exists() && doc.data().whatsapp) {
        setWhatsapp(doc.data().whatsapp);
      }
    });

    // 2. Listen to Plans collection
    const unsubPlans = onSnapshot(collection(db, "planes"), (snapshot) => {
      let plansArr = [];
      snapshot.forEach((doc) => {
        plansArr.push({ id: doc.id, ...doc.data() });
      });
      
      if (plansArr.length > 0) {
        plansArr.sort((a,b) => a.id.localeCompare(b.id));
        setPlans(plansArr);
      }
      setLoading(false);
    });

    return () => {
      unsubGlobal();
      unsubPlans();
    };
  }, []);

  if (loading) return (
    <section className="plans" id="planes">
      <div className="container">
        <p style={{ textAlign: 'center', color: '#888' }}>Cargando planes...</p>
      </div>
    </section>
  );

  const checkIcon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;

  return (
    <section className="plans" id="planes">
      <div className="container">
        <div className="plans__header reveal visible">
          <div className="section-badge">Planes</div>
          <h2 className="section-title">Elige Tu <span>Plan</span></h2>
          <p className="section-subtitle">
            Planes diseñados para que empieces sin excusas. Elige el que más 
            se adapte a tu compromiso y lleva tu entrenamiento al siguiente nivel.
          </p>
        </div>

        <div className="plans__grid">
          {plans.map((plan, i) => (
            <div key={plan.id} className={`plans__card ${plan.featured ? 'plans__card--featured' : ''} reveal visible`} style={{ transitionDelay: `${i * 0.12}s` }}>
              {plan.badge && (
                <div className="plans__card-badge">{plan.badge}</div>
              )}
              <div className="plans__card-header">
                <h3 className="plans__card-name">{plan.name}</h3>
                <div className="plans__card-price">
                  <span className="plans__card-currency">$</span>
                  <span className="plans__card-amount">{plan.price}</span>
                  <span className="plans__card-period">{plan.period}</span>
                </div>
                
                {plan.id === '04_mes' && (
                  <div className="plans__card-math">
                    <strong>(Equivale a $2.300 x día)</strong>
                    <span>¡Menos de lo que vale una botella de agua! 💧</span>
                  </div>
                )}
                {plan.id === '06_semestre' && (
                  <div className="plans__card-math">
                    <strong>(Ahorras $64.000)</strong>
                    <span>El mes te sale a $58.300 🔥</span>
                  </div>
                )}
              </div>

              <ul className="plans__card-features">
                {plan.features?.map((feature, idx) => (
                  <li key={idx} className="plans__card-feature">
                    <span className="plans__card-feature-icon">{checkIcon}</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(plan.whatsappMsg || 'Hola Voltag! Quiero información sobre el plan ' + plan.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${plan.featured ? 'btn-primary' : 'btn-secondary'} plans__card-cta`}
              >
                {plan.ctaText || 'Consultar'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
