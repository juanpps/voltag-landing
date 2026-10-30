import React, { useState, useEffect } from 'react';
import { getPromotions } from '../utils/content';

export default function PromoTopBanner() {
  const [promo, setPromo] = useState(null);

  useEffect(() => {
    // 1. Silence in admin
    if (window.location.pathname.startsWith('/admin')) {
      return;
    }

    // 2. Load from local CMS
    const currentPromos = getPromotions();
    if (currentPromos && currentPromos.bannerActive) {
      setPromo(currentPromos);
    }

    // 3. Listen to local CMS updates
    const handleUpdate = (e) => {
      if (e.detail?.type === 'promotions') {
        if (e.detail.data?.bannerActive) {
          setPromo(e.detail.data);
        } else {
          setPromo(null);
        }
      }
    };

    window.addEventListener('voltag-cms-update', handleUpdate);
    return () => window.removeEventListener('voltag-cms-update', handleUpdate);
  }, []);

  if (!promo || !promo.bannerActive) return null;

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
          font-family: var(--font-heading, 'Outfit', sans-serif);
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
