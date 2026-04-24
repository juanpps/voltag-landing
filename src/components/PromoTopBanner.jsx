import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase.client';

export default function PromoTopBanner() {
  const [promo, setPromo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. SILENCE IN ADMIN
    if (window.location.pathname.startsWith('/admin')) {
      setLoading(false);
      return;
    }

    const unsub = onSnapshot(doc(db, 'configuracion', 'promociones'), (doc) => {
      if (doc.exists() && doc.data().bannerActive) {
        setPromo(doc.data());
      } else {
        setPromo(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading || !promo) return null;

  return (
    <div className="promo-pill-container">
      <div className="promo-pill reveal visible">
        <span className="promo-pill__glow"></span>
        <span className="promo-pill__text">🔥 {promo.bannerText}</span>
      </div>
      <style>{`
        .promo-pill-container {
          display: inline-flex;
          margin-bottom: 24px;
        }
        .promo-pill {
          position: relative;
          padding: 8px 24px;
          background: rgba(15, 15, 15, 0.7);
          border: 1px solid rgba(212, 25, 32, 0.4);
          border-radius: 100px;
          backdrop-filter: blur(8px);
          overflow: hidden;
          animation: float 4s ease-in-out infinite;
        }
        .promo-pill__glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(212, 25, 32, 0.3) 0%, transparent 60%);
          opacity: 1;
          animation: pulse 2s infinite alternate;
        }
        .promo-pill__text {
          position: relative;
          z-index: 1;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #d41920;
          text-shadow: 0 0 10px rgba(212, 25, 32, 0.5);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse {
          from { opacity: 0.3; }
          to { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
