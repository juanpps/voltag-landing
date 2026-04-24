import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase.client';

export default function PromoModal() {
  const [promo, setPromo] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. SILENCE IN ADMIN
    if (window.location.pathname.startsWith('/admin')) {
      setLoading(false);
      return;
    }

    // 2. Real-time listener
    const unsub = onSnapshot(doc(db, 'configuracion', 'promociones'), (doc) => {
      if (doc.exists() && doc.data().modalActive) {
        setPromo(doc.data());
        // Show after a small delay for better UX
        setTimeout(() => setVisible(true), 1500);
      } else {
        setPromo(null);
        setVisible(false);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading || !promo || !visible) return null;

  return (
    <div id="promo-modal-overlay" className="modal-overlay" onClick={(e) => {
      if (e.target.id === 'promo-modal-overlay') setVisible(false);
    }}>
      <div className="modal-content">
        <button className="modal-close" onClick={() => setVisible(false)}>&times;</button>
        
        {promo.modalImage && (
          <img src={promo.modalImage} alt={promo.modalTitle} className="modal-img" />
        )}
        
        <div className="modal-body">
          <h2>{promo.modalTitle}</h2>
          <p>{promo.modalText}</p>
          <a href={promo.modalLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary cta-btn">
            {promo.modalCta}
          </a>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(12px);
          z-index: 10000;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .modal-content {
          background: #0f0f0f;
          border: 1px solid rgba(212,25,32,0.3);
          max-width: 420px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 12px;
          position: relative;
          box-shadow: 0 24px 64px rgba(212,25,32,0.15);
          animation: popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }
        .modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #d41920;
          border: 2px solid #000;
          color: #fff;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          line-height: 1;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          transition: transform 0.2s;
        }
        .modal-img {
          width: 100%;
          height: 55vh;
          object-fit: contain;
          display: block;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          background: #000;
        }
        .modal-body {
          padding: 32px 24px;
          text-align: center;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        .modal-body h2 {
          font-family: 'Barlow Condensed', sans-serif;
          color: #fff;
          margin-top: 0;
          font-size: 2.2rem;
          text-transform: uppercase;
          text-shadow: 0 0 20px rgba(212, 25, 32, 0.4);
          line-height: 1.1;
        }
        .modal-body p {
          color: #ccc;
          line-height: 1.6;
          margin-bottom: 24px;
          font-size: 1.05rem;
        }
        @keyframes popIn {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
