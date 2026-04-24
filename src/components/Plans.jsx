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

      <style>{`
        .plans {
          background: var(--dark);
          padding: 80px 0;
        }

        .plans__header {
          margin-bottom: 48px;
          text-align: center;
        }

        .plans__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: start;
        }

        .plans__card {
          background: var(--dark-card);
          border: 1px solid rgba(255, 255, 255, 0.04);
          padding: 40px 32px;
          position: relative;
          transition: all 0.4s var(--transition);
        }

        .plans__card:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .plans__card--featured {
          background: linear-gradient(to bottom, rgba(230, 57, 70, 0.08), var(--dark-card));
          border-color: var(--red);
          transform: scale(1.05);
          z-index: 2;
        }

        .plans__card--featured:hover {
          transform: scale(1.05) translateY(-6px);
          border-color: var(--red);
          box-shadow: var(--glow-shadow);
        }

        .plans__card-badge {
          position: absolute;
          top: -1px;
          right: 24px;
          background: var(--red);
          padding: 6px 16px;
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--white-pure);
        }

        .plans__card-header {
          margin-bottom: 32px;
        }

        .plans__card-name {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gray);
          margin-bottom: 12px;
        }

        .plans__card-price {
          display: flex;
          align-items: baseline;
          gap: 2px;
        }

        .plans__card-currency {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          color: var(--red);
          font-weight: 700;
        }

        .plans__card-amount {
          font-family: var(--font-display);
          font-size: 3.2rem;
          color: var(--white);
          line-height: 1;
        }

        .plans__card-period {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          color: var(--gray);
          margin-left: 4px;
        }

        .plans__card-math {
          background: rgba(212,25,32,0.05); 
          border-left: 2px solid var(--red); 
          padding: 10px 14px; 
          margin-top: 16px;
          margin-bottom: -10px;
          text-align: left;
        }
        
        .plans__card-math strong { 
          font-size: 0.95rem; 
          color: var(--red); 
          display: block; 
          margin-bottom: 2px; 
        }
        
        .plans__card-math span { 
          font-size: 0.75rem; 
          color: var(--gray-light); 
          display: block; 
          font-style: italic; 
        }

        .plans__card-features {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 36px;
          padding: 0;
          list-style: none;
        }

        .plans__card-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.875rem;
          color: var(--gray-light);
          text-align: left;
        }

        .plans__card-feature-icon {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .plans__card-cta {
          text-decoration: none;
          width: 100%;
          justify-content: center;
        }

        @media (max-width: 900px) {
          .plans__grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .plans__card--featured {
            transform: none;
            order: -1;
          }

          .plans__card--featured:hover {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </section>
  );
}
